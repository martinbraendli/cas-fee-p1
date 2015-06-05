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
    ORDERBY_FINISHDATE: 'finishDate',
    ORDERBY_CREATEDATE: 'createDate',
    ORDERBY_IMOPRTANCE: 'importance'
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
    var dateFinishUntil = NoteConstants.DATE_UNDEFINED;
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
            if (value !== NoteConstants.DATE_UNDEFINED
                && typeof value == 'string') {
                // Datum
                dateCreated = new Date(Date.parse(value));
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
            if (value !== NoteConstants.DATE_UNDEFINED
                && typeof value == 'string') {
                // Datum
                dateFinishUntil = new Date(Date.parse(value));
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
            if (value !== NoteConstants.DATE_UNDEFINED
                && typeof value == 'string') {
                // Datum
                dateFinished = new Date(Date.parse(value));
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
}
