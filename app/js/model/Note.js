/**
 *
 * @constructor
 */
function Note() {
    var self = this;

    var id = -1;
    var finished = false;
    var dateCreated = new Date(); // current date by default
    var dateFinishUntil = NoteConstants.date_finished_until_default(); // one week in future by default
    var dateFinished = NoteConstants.DATE_UNDEFINED;
    var title = '';
    var text = '';
    var importance = NoteConstants.IMPORTANCE_DEFAULT; // 0 bis 5

    /**
     * id - convert value into Number
     */
    Object.defineProperty(self, 'id', {
        enumerable: true,
        get: function () {
            return id;
        },
        set: function (value) {
            if (typeof value == 'undefined') {
                console.log("Canceled setting id = undefined");
                return;
            }
            id = value;
        }
    });

    /**
     * finished - convert value into boolean
     */
    Object.defineProperty(self, 'finished', {
        enumerable: true,
        get: function () {
            return finished;
        },
        set: function (value) {
            if (value === "false") {
                finished = false;
            } else {
                finished = Boolean(value);
            }
        }
    });

    /**
     * dateCreated - parseDate if value of type string
     */
    Object.defineProperty(self, 'dateCreated', {
        enumerable: true,
        get: function () {
            return dateCreated;
        },
        set: function (value) {
            if (value === NoteConstants.DATE_UNDEFINED) {
                dateCreated = value;
            } else if (typeof value == 'string') {
                dateCreated = parseDate(value);
            } else if (typeof value == 'object') {
                dateCreated = value;
            }
        }
    });

    /**
     * dateFinishUntil - parseDate if value of type string
     */
    Object.defineProperty(self, 'dateFinishUntil', {
        enumerable: true,
        get: function () {
            return dateFinishUntil;
        },
        set: function (value) {
            if (value === NoteConstants.DATE_UNDEFINED) {
                dateFinishUntil = value;
            } else if (typeof value == 'string') {
                dateFinishUntil = parseDate(value);
            } else if (typeof value == 'object') {
                dateFinishUntil = value;
            }
        }
    });

    /**
     * dateFinished - parseDate if value of type string
     */
    Object.defineProperty(self, 'dateFinished', {
        enumerable: true,
        get: function () {
            return dateFinished;
        },
        set: function (value) {
            if (value === NoteConstants.DATE_UNDEFINED) {
                dateFinished = value;
            } else if (typeof value == 'string') {
                dateFinished = parseDate(value);
            } else if (typeof value == 'object') {
                dateFinished = value;
            }
        }
    });

    /**
     * title - any value accepted
     */
    Object.defineProperty(self, 'title', {
        enumerable: true,
        get: function () {
            return title;
        },
        set: function (value) {
            title = value;
        }
    });

    /**
     * text - any value accepted
     */
    Object.defineProperty(self, 'text', {
        enumerable: true,
        get: function () {
            return text;
        },
        set: function (value) {
            text = value;
        }
    });

    /**
     * importance - check if value is between 0..5
     */
    Object.defineProperty(self, 'importance', {
        enumerable: true,
        get: function () {
            return importance;
        },
        set: function (value) {
            var value2set = Number(value);
            if (value2set >= 0 && value2set < 6) {
                importance = value2set;
            } else {
                console.log("invalid value for importance: " + value2set);
            }
        }
    });

    /**
     *
     * @param dateString date as string in two possible formats:
     * <ul>
     *     <li>2015-06-09T19:22:43.629Z - can be converted by default Date()</li>
     *     <li>16.06.2015 21:27 - output from datepicker, manual splitting</li>
     * </ul>
     * @returns {*}
     */
    var parseDate = function (dateString) {
        if (dateString === NoteConstants.DATE_UNDEFINED) {
            return dateString;
        }

        // parseable formats..
        // 2015-06-09T19:22:43.629Z
        // Sat Jun 20 2015 15:19:28 GMT+0200 (Mitteleuropäische Sommerzeit)
        if (dateString.indexOf("-") > -1
            || dateString.indexOf("GMT") > -1) {
            return new Date(dateString);
        }

        // 16.06.2015 21:27
        var d = dateString.substring(0, 2);
        var m = dateString.substring(3, 5);
        var y = dateString.substring(6, 10);
        var h = dateString.substring(11, 13);
        var min = dateString.substring(14, 16);

        var preparedDateString = "" + y + "-" + m + "-" + d + "T" + h + ":" + min;
        return new Date(preparedDateString);
    }
}
