/*
  Leaflet.AwesomeNumberMarkers, a plugin that adds number markers for Leaflet

  http://leafletjs.com
  https://github.com/zahidul-islam
*/

/*global L*/

(function () {
    "use strict";
    L.AwesomeNumberMarkers = L.Icon.extend({
        options: {
            iconSize: [35, 45],
            iconAnchor: [17, 42],
            popupAnchor: [1, -32],
            className: "awesome-number-marker",
            icon: "home",
            markerColor: "blue",
            numberColor: "white",
            number: "",
        },

        createIcon: function () {
            var div = document.createElement("div"),
                options = this.options;

            div.innerHTML = this._createInner();
            this._setIconStyles(div, "icon-" + options.markerColor);

            return div;
        },

        _createInner: function () {
            var iconColorStyle = "",
                options = this.options;

            if (options.numberColor) {
                iconColorStyle = "style='color: " + options.numberColor + "' ";
            }

            return (
                "<i " + iconColorStyle + "><b>" + options.number + "</b></i>"
            );
        },

        _setIconStyles: function (img, name) {
            var options = this.options,
                size = L.point(options["iconSize"]),
                anchor = L.point(options.iconAnchor);

            img.className =
                "awesome-number-marker-" + name + " " + options.className;

            if (anchor) {
                img.style.marginLeft = -anchor.x + "px";
                img.style.marginTop = -anchor.y + "px";
            }

            if (size) {
                img.style.width = size.x + "px";
                img.style.height = size.y + "px";
            }
        },
    });
})();
