/**
 * Utils for data access layer
 */
var CommonsDAL = {
    /**
     * Convert note-object into JSON-String
     */
    toJSON: function (note) {
        return JSON.stringify(note);
    },

    /**
     * Parse JSON-String into note-object
     */
    parseJSON: function (noteString) {
        return JSON.parse(noteString);
    },

    /**
     * sort by given orderBy key
     */
    sort: function (notes, orderBy, asc) {
        var compareNote;
        switch (orderBy) {
            case NoteConstants.ORDERBY_CREATEDATE:
                compareNote = function (n1, n2) {
                    if (asc) {
                        return n1.dateCreated.getTime() - n2.dateCreated.getTime();
                    }
                    return n2.dateCreated.getTime() - n1.dateCreated.getTime();
                };
                break;
            case NoteConstants.ORDERBY_IMPORTANCE:
                compareNote = function (n1, n2) {
                    if (asc) {
                        return n1.importance - n2.importance;
                    }
                    return n2.importance - n1.importance;
                };
                break;
            case NoteConstants.ORDERBY_FINISH_UNTIL_DATE:
            default:
                compareNote = function (n1, n2) {
                    if (asc) {
                        return n1.dateFinishUntil.getTime() - n2.dateFinishUntil.getTime();
                    }
                    return n2.dateFinishUntil.getTime() - n1.dateFinishUntil.getTime();
                };
                break;
        }
        return notes.sort(compareNote);
    },

    /**
     * Check if all required fields are set
     * @param note
     * @returns {*} 0 if all is ok
     */
    validateRequiredFields: function (note) {
        // check fields
        if (typeof note.title == 'undefined'
            || String(note.title).length <= 0) {
            return "Missing title";
        } else if (typeof note.text == 'undefined'
            || String(note.text).length <= 0) {
            return "Missing text";
        }
        return 0;
    }
};
