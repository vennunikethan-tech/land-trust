/**
 * Auxiliary GIS Layers for Land Trust (SIH26014)
 * OGC Compliant mock GeoJSON data for Roads, Water Bodies, Land Use, and Building Footprints
 */

export const roadsGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "ROAD-01",
        name: "Outer Ring Road (ORR) Arterial Express Corridor",
        type: "Expressway / 30m Arterial",
        width: "30m",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [78.3790, 17.4410],
          [78.3840, 17.4425],
          [78.3905, 17.4435],
          [78.3945, 17.4425],
          [78.3980, 17.4415]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "ROAD-02",
        name: "Madhapur - Hitec City Sector Road",
        type: "Municipal Sector Road",
        width: "18m",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [78.3850, 17.4540],
          [78.3880, 17.4485],
          [78.3875, 17.4455],
          [78.3870, 17.4430]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "ROAD-03",
        name: "Gachibowli Link Boulevard",
        type: "Zonal Collector Road",
        width: "12m",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [78.3810, 17.4490],
          [78.3880, 17.4485],
          [78.3955, 17.4495],
          [78.3990, 17.4500]
        ]
      }
    }
  ]
};

export const waterBodiesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "WATER-01",
        name: "Himayat Sagar Lake Catchment & Durgam Cheruvu Buffer",
        type: "Protected Water Body / FTL Zone",
        status: "GO 111 Statutory Restriction",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.3940, 17.4480],
            [78.3975, 17.4510],
            [78.4000, 17.4485],
            [78.3985, 17.4445],
            [78.3950, 17.4460],
            [78.3940, 17.4480]
          ]
        ]
      }
    }
  ]
};

export const landUseGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "ZONE-COM",
        zone: "Commercial Zone C-3",
        fsi: "2.50 Max",
        color: "#3b82f6",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.3880, 17.4485],
            [78.3960, 17.4530],
            [78.3960, 17.4460],
            [78.3880, 17.4485]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "ZONE-RES",
        zone: "Residential Urban R-2",
        fsi: "1.75 Max",
        color: "#8b5cf6",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.3845, 17.4450],
            [78.3910, 17.4460],
            [78.3905, 17.4435],
            [78.3840, 17.4425],
            [78.3845, 17.4450]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "ZONE-AGR",
        zone: "Peri-Urban Agricultural Reserve",
        fsi: "0.50 Max",
        color: "#10b981",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.3810, 17.4420],
            [78.3855, 17.4515],
            [78.3885, 17.4520],
            [78.3845, 17.4450],
            [78.3810, 17.4420]
          ]
        ]
      }
    }
  ]
};

export const buildingsGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "BLD-01",
        name: "Cyber Park IT Towers Footprint",
        floors: "G+12 Commercial",
        height: "45m",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.3855, 17.4442],
            [78.3865, 17.4444],
            [78.3863, 17.4435],
            [78.3853, 17.4433],
            [78.3855, 17.4442]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "BLD-02",
        name: "Residential Enclave Villas",
        floors: "G+2 Residential",
        height: "10m",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.3885, 17.4452],
            [78.3898, 17.4454],
            [78.3896, 17.4442],
            [78.3883, 17.4440],
            [78.3885, 17.4452]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "BLD-03",
        name: "State Infrastructure Substation & Admin Block",
        floors: "G+3 Institutional",
        height: "14m",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.3920, 17.4450],
            [78.3935, 17.4452],
            [78.3933, 17.4438],
            [78.3918, 17.4436],
            [78.3920, 17.4450]
          ]
        ]
      }
    }
  ]
};
