var objects;
(function (objects) {
    var Control = (function () {
        function Control(rotationSpeedx, rotationSpeedy, rotationSpeedz, shirtColor, pantsColor) {
            this.rotationSpeedx = rotationSpeedx;
            this.rotationSpeedy = rotationSpeedy;
            this.rotationSpeedz = rotationSpeedz;
            this.shirtColor = shirtColor;
            this.pantsColor = pantsColor;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map