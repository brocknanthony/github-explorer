const Util = imports.misc.util;
const Mainloop = imports.mainloop;
const Lang = imports.lang;

const Logger = imports.Logger;

function Ticker() {
    global.log("Ticker 1");
    this._init.apply(this, arguments);
    global.log("Ticker 2");
}

Ticker.prototype = {

    /* Constructor */
    _init: function (settings, metadata) {
        this.settings = settings;
        this.metadata = metadata;

        global.log("Ticker A");

        this.logger = new Logger.Logger({
            name: "Ticker",
            uuid: this.metadata.uuid,
            verboseLogging: this.settings.getValue("enable-verbose-logging")
        });

        global.log("Ticker B");

        this.timerId = 0;
    },

    /**
     * Is the ticker running
     *
     * @return {boolean}
     */
    isRunning: function () {
        return this.timerId !== 0 && this.timerId !== null;
    },

    /**
     * Start and schedule a new tick with the provided timeout and callback
     *
     * @param timeInMinutes
     * @param callback
     */
    startTicker: function (timeInMinutes, callback) {

        let timeout_in_seconds = timeInMinutes * 60 * 1000;

        if (timeout_in_seconds > 0 && this.settings.getValue("enable-auto-refresh")) {
            this.timerId = Mainloop.timeout_add(timeout_in_seconds, callback);
        }
    },

    /**
     * If the timer is running attempt to stop it
     */
    stopTicker: function () {
        if (this.timerId) {
            Mainloop.source_remove(this.timerId);
            this.timerId = null;
        }
    }
};
