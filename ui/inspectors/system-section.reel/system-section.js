var Component = require("montage/ui/component").Component,
    Model = require("core/model/model").Model;

/**
 * @class SystemSection
 * @extends Component
 */
exports.SystemSection = Component.specialize({

    _object: {
        value: null
    },

    object: {
        set: function(object) {
            switch (object.identifier) {
                case "serialConsole":
                case "languageAndRegion":
                case "debug":
                case "hardware":
                case "WebUI":
                case "mail":
                case "system":
                    this.canSave = true;
                    this.canRevert = true;
                    this.hasTable = false;
                    break;
                case "updates":
                case "bootPool":
                    this.canSave = false;
                    this.canRevert = false;
                    this.hasTable = true;
                    break;
            }
            this._object = object;
        },
        get: function() {
            return this._object;
        }
    },

    canSave: {
        value: null
    },

    canRevert: {
        value: null
    },

    enterDocument: {
        value: function (isFirstTime) {
            this.classList.toggle(this.object.identifier);
        }
    },

    save: {
        value: function() {
            if (this.sectionComponent[this.object.identifier] && typeof this.sectionComponent[this.object.identifier].save === "function") {
                this.sectionComponent[this.object.identifier].save();
            }
        }
    },

    revert: {
        value: function() {
            if (this.sectionComponent[this.object.identifier] && typeof this.sectionComponent[this.object.identifier].revert === "function") {
                this.sectionComponent[this.object.identifier].revert();
            }
        }
    }
});
