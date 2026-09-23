import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { roadsGeoJson, waterBodiesGeoJson, landUseGeoJson, buildingsGeoJson } from '../../data/auxiliaryLayers';

export default function AuxiliaryLayers({ layers = {} }) {
  // Road layer styling
  const roadStyle = (feature) => ({
    color: feature.properties.type.includes('Expressway') ? '#f59e0b' : '#64748b',
    weight: feature.properties.type.includes('Expressway') ? 4 : 3,
    opacity: 0.9,
    dashArray: feature.properties.type.includes('Expressway') ? '' : '6, 6',
  });

  const onEachRoad = (feature, layer) => {
    layer.bindTooltip(`🛣️ ${feature.properties.name} (${feature.properties.width})`, {
      sticky: true,
      className: 'gis-layer-tooltip',
    });
  };

  // Water body styling
  const waterStyle = () => ({
    color: '#0284c7',
    weight: 2,
    fillColor: '#38bdf8',
    fillOpacity: 0.45,
  });

  const onEachWater = (feature, layer) => {
    layer.bindTooltip(`🌊 ${feature.properties.name} [${feature.properties.status}]`, {
      sticky: true,
      className: 'gis-layer-tooltip',
    });
  };

  // Land use zoning styling
  const landUseStyle = (feature) => ({
    color: feature.properties.color || '#6366f1',
    weight: 1.5,
    dashArray: '4, 4',
    fillColor: feature.properties.color || '#6366f1',
    fillOpacity: 0.15,
  });

  const onEachLandUse = (feature, layer) => {
    layer.bindTooltip(`📐 Zone: ${feature.properties.zone} (FSI: ${feature.properties.fsi})`, {
      sticky: true,
      className: 'gis-layer-tooltip',
    });
  };

  // Buildings styling
  const buildingStyle = () => ({
    color: '#334155',
    weight: 1.5,
    fillColor: '#64748b',
    fillOpacity: 0.7,
  });

  const onEachBuilding = (feature, layer) => {
    layer.bindTooltip(`🏢 ${feature.properties.name} (${feature.properties.floors})`, {
      sticky: true,
      className: 'gis-layer-tooltip',
    });
  };

  return (
    <>
      {layers.landUse && (
        <GeoJSON
          key="layer-landuse"
          data={landUseGeoJson}
          style={landUseStyle}
          onEachFeature={onEachLandUse}
        />
      )}

      {layers.waterBodies && (
        <GeoJSON
          key="layer-water"
          data={waterBodiesGeoJson}
          style={waterStyle}
          onEachFeature={onEachWater}
        />
      )}

      {layers.roads && (
        <GeoJSON
          key="layer-roads"
          data={roadsGeoJson}
          style={roadStyle}
          onEachFeature={onEachRoad}
        />
      )}

      {layers.buildings && (
        <GeoJSON
          key="layer-buildings"
          data={buildingsGeoJson}
          style={buildingStyle}
          onEachFeature={onEachBuilding}
        />
      )}
    </>
  );
}
