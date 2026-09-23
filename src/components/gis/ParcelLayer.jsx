import React, { useRef } from 'react';
import { GeoJSON } from 'react-leaflet';
import parcelsGeoJson from '../../data/parcels.geojson';

export function getParcelStyle(feature, isSelected) {
  if (isSelected) {
    return {
      color: '#0f172a',
      weight: 4,
      fillColor: '#0284c7',
      fillOpacity: 0.65,
      dashArray: '',
    };
  }

  const status = (feature?.properties?.verificationStatus || '').toLowerCase();

  if (status.includes('verif') || status === 'passed' || status === 'success') {
    return {
      color: '#059669',
      weight: 2.5,
      fillColor: '#10b981',
      fillOpacity: 0.35,
      dashArray: '',
    };
  }

  if (status.includes('warn') || status.includes('mismatch') || status.includes('flag')) {
    return {
      color: '#d97706',
      weight: 2.5,
      fillColor: '#f59e0b',
      fillOpacity: 0.38,
      dashArray: '6, 5',
    };
  }

  if (status.includes('issue') || status.includes('prohibit') || status.includes('encroach')) {
    return {
      color: '#dc2626',
      weight: 3,
      fillColor: '#ef4444',
      fillOpacity: 0.45,
      dashArray: '',
    };
  }

  // Default: Pending / Unverified
  return {
    color: '#2563eb',
    weight: 2,
    fillColor: '#60a5fa',
    fillOpacity: 0.30,
    dashArray: '4, 4',
  };
}

export default function ParcelLayer({ selectedParcel, onSelectParcel }) {
  const geoJsonRef = useRef(null);

  const onEachParcel = (feature, layer) => {
    // Tooltip showing Survey No and Area
    const { surveyNumber, area, landType, verificationStatus } = feature.properties;
    layer.bindTooltip(
      `<div class="font-sans text-xs">
        <strong class="font-bold">Survey No: ${surveyNumber}</strong>
        <span class="block text-[10px] text-slate-500">${area} • ${landType}</span>
        <span class="block text-[10px] font-semibold text-emerald-700">${verificationStatus}</span>
      </div>`,
      {
        sticky: true,
        direction: 'top',
        className: 'cadastral-parcel-tooltip',
      }
    );

    // Hover effect
    layer.on({
      mouseover: (e) => {
        const isCurrentSelected = selectedParcel?.propertyId === feature.properties.propertyId;
        if (!isCurrentSelected) {
          e.target.setStyle({
            weight: 3.5,
            fillOpacity: 0.58,
          });
        }
      },
      mouseout: (e) => {
        const isCurrentSelected = selectedParcel?.propertyId === feature.properties.propertyId;
        if (!isCurrentSelected) {
          e.target.setStyle(getParcelStyle(feature, false));
        }
      },
      click: (e) => {
        const bounds = layer.getBounds();
        const center = bounds.getCenter();
        onSelectParcel(feature.properties, center, bounds);
      },
    });
  };

  return (
    <GeoJSON
      key={`parcels-layer-${selectedParcel?.propertyId || 'none'}`}
      ref={geoJsonRef}
      data={parcelsGeoJson}
      style={(feature) =>
        getParcelStyle(feature, selectedParcel?.propertyId === feature.properties.propertyId)
      }
      onEachFeature={onEachParcel}
    />
  );
}
