import React, { useRef } from 'react';
import L from 'leaflet';
import { GeoJSON, Marker } from 'react-leaflet';
import parcelsGeoJson from '../../data/parcels.geojson';

/**
 * Calculates the geometric centroid of a GeoJSON polygon ring.
 */
export function getPolygonCentroid(feature) {
  if (!feature?.geometry?.coordinates?.[0]) return [17.4475, 78.3885];
  const ring = feature.geometry.coordinates[0];
  const lats = ring.map((c) => c[1]);
  const lngs = ring.map((c) => c[0]);
  const avgLat = lats.reduce((sum, c) => sum + c, 0) / lats.length;
  const avgLng = lngs.reduce((sum, c) => sum + c, 0) / lngs.length;
  return [avgLat, avgLng];
}

/**
 * High-contrast parcel vector styling optimized for both Satellite terrain and Street Carto.
 */
export function getParcelStyle(feature, isSelected, baseMap = 'satellite') {
  const isSat = baseMap === 'satellite';

  if (isSelected) {
    return {
      color: isSat ? '#38bdf8' : '#0f172a',
      weight: isSat ? 4.5 : 4,
      fillColor: '#0284c7',
      fillOpacity: isSat ? 0.60 : 0.65,
      dashArray: '',
    };
  }

  const status = (feature?.properties?.verificationStatus || '').toLowerCase();

  // Verified / Title Reconciled
  if (status.includes('verif') || status === 'passed' || status === 'success') {
    return {
      color: isSat ? '#34d399' : '#059669',
      weight: isSat ? 3 : 2.5,
      fillColor: '#10b981',
      fillOpacity: isSat ? 0.38 : 0.35,
      dashArray: '',
    };
  }

  // Flagged / Warning / Discrepancy
  if (status.includes('warn') || status.includes('mismatch') || status.includes('flag')) {
    return {
      color: isSat ? '#fbbf24' : '#d97706',
      weight: isSat ? 3 : 2.5,
      fillColor: '#f59e0b',
      fillOpacity: isSat ? 0.42 : 0.38,
      dashArray: '6, 5',
    };
  }

  // Restricted / Prohibited / Issue / GO 111 Buffer Violation
  if (status.includes('issue') || status.includes('prohibit') || status.includes('encroach')) {
    return {
      color: isSat ? '#f87171' : '#dc2626',
      weight: isSat ? 3.5 : 3,
      fillColor: '#ef4444',
      fillOpacity: isSat ? 0.48 : 0.45,
      dashArray: '',
    };
  }

  // Default: Pending / Unverified Field Audit
  return {
    color: isSat ? '#38bdf8' : '#2563eb',
    weight: isSat ? 2.5 : 2,
    fillColor: '#60a5fa',
    fillOpacity: isSat ? 0.35 : 0.30,
    dashArray: '4, 4',
  };
}

export default function ParcelLayer({
  selectedParcel,
  onSelectParcel,
  baseMap = 'satellite',
  showSurveyNumbers = true,
}) {
  const geoJsonRef = useRef(null);

  const onEachParcel = (feature, layer) => {
    // Tooltip showing Survey No, Area, Land Type, and Verification Status
    const { surveyNumber, area, landType, verificationStatus } = feature.properties;
    layer.bindTooltip(
      `<div class="font-sans text-xs">
        <div class="flex items-center gap-1.5 pb-1 mb-1 border-b border-slate-700/60">
          <span class="w-2 h-2 rounded-full ${
            verificationStatus === 'Verified' ? 'bg-emerald-400' :
            verificationStatus === 'Warning' ? 'bg-amber-400' :
            verificationStatus === 'Issue' ? 'bg-rose-400' : 'bg-sky-400'
          }"></span>
          <strong class="font-bold text-white tracking-wide">Survey No: ${surveyNumber}</strong>
        </div>
        <div class="text-[10px] text-slate-300">${area} • ${landType}</div>
        <div class="text-[10px] font-semibold mt-0.5 ${
          verificationStatus === 'Verified' ? 'text-emerald-400' :
          verificationStatus === 'Warning' ? 'text-amber-400' :
          verificationStatus === 'Issue' ? 'text-rose-400' : 'text-sky-400'
        }">${verificationStatus}</div>
      </div>`,
      {
        sticky: true,
        direction: 'top',
        className: 'cadastral-parcel-tooltip',
      }
    );

    // Hover and Selection Events
    layer.on({
      mouseover: (e) => {
        const isCurrentSelected = selectedParcel?.propertyId === feature.properties.propertyId;
        if (!isCurrentSelected) {
          e.target.setStyle({
            weight: baseMap === 'satellite' ? 4.5 : 3.5,
            fillOpacity: 0.60,
          });
        }
      },
      mouseout: (e) => {
        const isCurrentSelected = selectedParcel?.propertyId === feature.properties.propertyId;
        if (!isCurrentSelected) {
          e.target.setStyle(getParcelStyle(feature, false, baseMap));
        }
      },
      click: () => {
        const bounds = layer.getBounds();
        const center = bounds.getCenter();
        onSelectParcel(feature.properties, center, bounds);
      },
    });
  };

  return (
    <>
      {/* Primary Cadastral Parcel GeoJSON Boundaries */}
      <GeoJSON
        key={`parcels-layer-${baseMap}-${selectedParcel?.propertyId || 'none'}`}
        ref={geoJsonRef}
        data={parcelsGeoJson}
        style={(feature) =>
          getParcelStyle(
            feature,
            selectedParcel?.propertyId === feature.properties.propertyId,
            baseMap
          )
        }
        onEachFeature={onEachParcel}
      />

      {/* Parcel Centroid Survey Number Badges */}
      {showSurveyNumbers &&
        parcelsGeoJson.features.map((feature) => {
          const centroid = getPolygonCentroid(feature);
          const isSelected = selectedParcel?.propertyId === feature.properties.propertyId;
          const markerIcon = L.divIcon({
            className: 'survey-number-marker',
            html: `<div class="survey-number-badge ${baseMap === 'satellite' ? 'satellite-mode' : 'street-mode'} ${
              isSelected ? 'ring-2 ring-cyan-400 scale-110 shadow-lg' : ''
            }">
              <span>${feature.properties.surveyNumber}</span>
            </div>`,
            iconSize: [64, 24],
            iconAnchor: [32, 12],
          });

          return (
            <Marker
              key={`survey-marker-${feature.properties.propertyId}-${baseMap}-${isSelected ? 'sel' : 'def'}`}
              position={centroid}
              icon={markerIcon}
              interactive={false}
            />
          );
        })}
    </>
  );
}
