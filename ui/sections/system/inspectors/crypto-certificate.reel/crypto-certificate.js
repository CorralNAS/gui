var AbstractInspector = require("ui/abstract/abstract-inspector").AbstractInspector,
    _ = require("lodash");

exports.CryptoCertificate = AbstractInspector.specialize({
    enterDocument: {
        value: function () {
            this.super();
            if (!this.object._action && !this.object._isNew) {
                this.object._action = this._sectionService.CREATION;
            }
        }
    },

    save: {
        value: function () {
            if (_.isFunction(this.certificateComponent.save)) {
                this.certificateComponent.save();
            }
            return this._sectionService.saveCertificate(this.object);
        }
    },

    handleExportAction: {
        value: function () {
            console.log("do something");
            var self = this;
            this.application.systemService.getCertificateFileAddress(this.object.id, this.object.name + ".crt", this.object.name + ".key").then(function (certificateObject) {
                var downloadLink = document.createElement("a");
                    downloadLink.href = certificateObject.link;
                    console.log(downloadLink.href);
                    downloadLink.download = "FreeNAS10" + "-" + "debug.tar.gz";
                    downloadLink.click();
            })
        }
    }
});
