var NoteConstants = {
    /**
     * Undefined-value for dateFinishUntil
     * @type {string}
     */
    DATE_UNDEFINED: 'DATE_UNDEFINED',

    /**
     * Default value for importance
     */
    IMPORTANCE_DEFAULT: 2,

    /**
     * Order
     */
    ORDERBY_FINISH_UNTIL_DATE: 'finishDate',
    ORDERBY_CREATEDATE: 'createDate',
    ORDERBY_IMPORTANCE: 'importance',

    /**
     * One week in future
     */
    DATE_FINISHED_UNTIL_DEFAULT: function () {
        return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    }
};

/**
 *
 * @constructor
 */
function Note() {
    var self = this;

    var id = -1;
    var finished = false;
    var dateCreated = new Date();
    var dateFinishUntil = NoteConstants.DATE_FINISHED_UNTIL_DEFAULT();
    var dateFinished = NoteConstants.DATE_UNDEFINED;
    var title = '';
    var text = '';
    var importance = NoteConstants.IMPORTANCE_DEFAULT; // 0 bis 5

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
            id = Number(value);
        }
    });
    Object.defineProperty(self, 'finished', {
        enumerable: true,
        get: function () {
            return finished;
        },
        set: function (value) {
            finished = Boolean(value);
        }
    });
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
    Object.defineProperty(self, 'title', {
        enumerable: true,
        get: function () {
            return title;
        },
        set: function (value) {
            title = value;
        }
    });
    Object.defineProperty(self, 'text', {
        enumerable: true,
        get: function () {
            return text;
        },
        set: function (value) {
            text = value;
        }
    });
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

    var parseDate = function (dateString) {
        if (dateString === NoteConstants.DATE_UNDEFINED) {
            return dateString;
        }

        // 2015-06-09T19:22:43.629Z
        if (dateString.indexOf("-") > -1) {
            return new Date(dateString);
        }

        // 16.06.2015 21:27
        var d = dateString.substring(0, 2);
        var m = dateString.substring(3, 5);
        var y = dateString.substring(6, 10);
        var h = dateString.substring(11, 13);
        var min = dateString.substring(14, 16);

        return new Date(y + "-" + m + "-" + d + " " + h + ":" + min);
    }
}
