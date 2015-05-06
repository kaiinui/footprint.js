(function(window, undefined) {
    "use strict";

    var FOOTPRINT_ID_LENGTH = 8;
    var FOOTPRINT_ID_DELIMITER = "+";
    var SESSION_STORAGE_FOOTPRINT_KEY = "fp_currentFootprint";

    var FootPrint = {};

    // Public Methods
    // ===

    /**
     * Start footprint-ing.
     *
     * ```
     * FootPrint.start(function(footprint, referer) {
     *     track("footprint", footprint);
     *     track("referer", referer); // It indicates the social service for secondary footprint id. ("g4zawkjh" for "sd3jk23d+ex8ceta4+g4zawkjh+ppae6owm")
     * });
     * ```
     *
     * @param logFunc {function} footprint: String, referer: String
     */
    function start(logFunc) {
        var footprint = _makeCurrentFootprint();

        logFunc(footprint, window.document.referrer); // TODO: [CONCERN] How to track WebViews?
    }

    // Private Helpers
    // ===

    /**
     * Makes, sets to hash and returns current footprint.
     *
     * 1. If no hash present -> "ex8ceta4"
     * 2. If hash present
     *   * If already has the footprint for current session -> "ex8ceta4" (same as hash)
     *   * If no and has single footprint id like "ex8ceta4" -> "ex8ceta4+g4zawkjh" (appends new id)
     *   * If no and has linked footprint id like "ex8ceta4+g4zawkjh" -> "ex8ceta4+g4zawkjh+ppae6owm" (appends new id)
     *
     * @returns {string}
     * @private
     */
    function _makeCurrentFootprint() {
        var oldFootprint = _getHash();
        var footprint = _getStoredFootprint();
        if (footprint === oldFootprint) {
            return footprint;
        }

        var newFootprint = _createFootprint(oldFootprint);
        _setHash(newFootprint);
        _storeFootprint(newFootprint);

        return newFootprint;
    }

    /**
     * @param id {string}
     * @private
     */
    function _setHash(id) {
        window.location.hash = id;
    }

    /**
     * @returns {string}
     * @private
     */
    function _getHash() {
        return window.location.hash.replace("#", "");
    }

    /**
     * @returns {string}
     * @private
     */
    function _getStoredFootprint() {
        return window.sessionStorage.getItem(SESSION_STORAGE_FOOTPRINT_KEY);
    }

    /**
     * @param id {string}
     * @private
     */
    function _storeFootprint(id) {
        window.sessionStorage.setItem(SESSION_STORAGE_FOOTPRINT_KEY, id);
    }

    /**
     * 1. "" or `null` -> "ex8ceta4"
     * 2. "ex8ceta4" -> "ex8ceta4+g4zawkjh" (new id follows old id)
     * 3. "ex8ceta4+g4zawkjh" -> "ex8ceta4+g4zawkjh+ppae6owm" (appends new id)
     *
     * @param idOrNull {string}
     * @returns {string}
     * @private
     */
    function _createFootprint(idOrNull) {
        if (idOrNull === null || idOrNull === '') {
            return _createNewFootprintId();
        } else {
            return idOrNull + FOOTPRINT_ID_DELIMITER + _createNewFootprintId();
        }
    }

    /**
     * @returns {string}
     * @private
     */
    function _createNewFootprintId() {
        return _createRandomString(FOOTPRINT_ID_LENGTH);
    }

    /**
     * Perform a simple verification for a footprint to notice if something happens to it.
     *
     * @param footprint {string}
     * @returns {boolean}
     * @private
     */
    function _verifyFootprint(footprint) {
        var components = footprint.split(FOOTPRINT_ID_DELIMITER);
        for (var i = 0; i < components.length; i++) {
            if (components[i].length !== FOOTPRINT_ID_LENGTH) { return false; }
        }
        return true;
    }

    /**
     * @param length {number}
     * @returns {string}
     * @private
     */
    function _createRandomString(length) {
        return Math.random().toString(36).substr(2, length);
    }

    // Exports
    // ===

    FootPrint["start"] = start;

    if ("module" in window) {
        module.exports = FootPrint;
    } else {
        window["FootPrint"] = FootPrint;
    }

})(window);