// This is a shim to translate Google Maps JavaScript API calls to OpenLayers.
// I wrote this in 2021 and it works for the purposes of traceroute-mapper.
// However, instead of using this I decided to just rewrite the code (see commit d6f7b49d65d3c0fc70f6b950a908b607b8388606).
// Feel free to use this code in any manner you want. I hereby release, this file only, into the public domain.

if (window.google?.maps) {
  console.warn('[ol-gmaps-shim] You are still loading the Google Maps JavaScript API. Please remove the <script> tag for Google Maps.');
}

window.google = {
  maps: {
    Map: function(el, opts) {
      const map = this.map = new ol.Map({
        target: el,
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([
            opts.center.lng,
            opts.center.lng
          ]),
          zoom: opts.zoom,
        })
      });

      this.controls = {};
      for (const v of Object.values(google.maps.ControlPosition)) {
        let control = null;
        this.controls[v] = {
          push: function(el) {
            if (control === null) {
              control = document.createElement("div");
              control.className = "ol-unselectable ol-control";
              if (v === 1 || v === 2 || v === 3 || v === 5 || v === 7) {
                control.style.top = ".5em";
              }
              else if (v === 6 || v === 9 || v === 10 || v === 11 || v === 12) {
                control.style.bottom = ".5em";
              }
              if (v === 1 || v === 4 || v === 5 || v === 6 || v === 10) {
                control.style.left = ".5em";
              }
              else if (v === 3 || v === 7 || v === 8 || v === 9 || v === 12) {
                control.style.right = ".5em";
              }
              map.addControl(new ol.control.Control({
                element: control,
              }));
            }
            control.appendChild(el);
          }
        };
      }

      this.fitBounds = function(bounds) {
        const extent = ol.extent.boundingExtent(bounds.coordinates);
        map.getView().fit(extent, {
          padding: [15, 15, 15, 15],
          duration: 500,
        });
      };
    },

    LatLngBounds: function() {
      this.coordinates = [];
      this.extend = function(point) {
        this.coordinates.push(ol.proj.fromLonLat([point.lng, point.lat]));
      };
      this.isEmpty = function() {
        return (this.coordinates.length === 0);
      };
    },

    Marker: function(opts) {
      this.marker = new ol.layer.Vector({
        zIndex: opts.zIndex,
        source: new ol.source.Vector({
          features: [
            new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.fromLonLat([
                opts.position.lng,
                opts.position.lat
              ]))
            })
          ]
        }),
      });
      this.position = opts.position;
      this.map = opts.map;
      if (this.map) {
        this.map.map.addLayer(this.marker);
      }

      this.setMap = function(map) {
        if (map === null) {
          this.map.map.removeLayer(this.marker);
        }
        else {
          map.map.addLayer(this.marker);
        }
        this.map = map;
      };
    },

    Polyline: function(opts) {
      this.line = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [
            new ol.Feature({
              geometry: new ol.geom.LineString([
                ol.proj.fromLonLat([
                  opts.path[0].lng,
                  opts.path[0].lat
                ]),
                ol.proj.fromLonLat([
                  opts.path[1].lng,
                  opts.path[1].lat
                ]),
              ])
            })
          ]
        }),
      });
      this.map = opts.map;
      if (this.map) {
        this.map.map.addLayer(this.line);
      }

      this.setMap = function(map) {
        if (map === null) {
          this.map.map.removeLayer(this.line);
        }
        else {
          map.map.addLayer(this.line);
        }
        this.map = map;
      };
    },

    ControlPosition: {
      TOP_LEFT: 1,
      TOP_CENTER: 2,
      TOP: 2,
      TOP_RIGHT: 3,
      LEFT_CENTER: 4,
      LEFT_TOP: 5,
      LEFT: 5,
      LEFT_BOTTOM: 6,
      RIGHT_TOP: 7,
      RIGHT: 7,
      RIGHT_CENTER: 8,
      RIGHT_BOTTOM: 9,
      BOTTOM_LEFT: 10,
      BOTTOM_CENTER: 11,
      BOTTOM: 11,
      BOTTOM_RIGHT: 12,
      CENTER: 13,
    },
  },
};
