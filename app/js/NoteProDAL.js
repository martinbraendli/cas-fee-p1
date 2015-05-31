/**
 * Data Access Layer - Interface to the storage
 */
var NoteProDAL = {
    /**
     * Undefined-value for dateFinishUntil
     * @type {string}
     */
    DATE_UNDEFINED: 'DATE_UNDEFINED',

    /**
     * Undefined-value for importance
     */
    IMPORTANCE_UNDEFINED: 'IMPORTANCE_UNDEFINED',

    /**
     * Order
     */
    ORDERBY_FINISHDATE: 'finishDate',
    ORDERBY_CREATEDATE: 'createDate',
    ORDERBY_IMOPRTANCE: 'importance',

    /**
     * write given note into local storage
     * @returns the id of the note, a text if an error occured
     */
    saveNote: function (note) {
        if (note.id < 0) {
            note.id = this.getNextNoteId();
        }

        // to JSON
        var jsonNote = this.toJSON(note);

        // save to localStorage todo surround with try catch
        localStorage.setItem("note" + note.id, jsonNote);
        localStorage.setItem("lastNoteId", note.id);

        return note.id; // OK
    },

    /**
     * Read all available notes
     */
    readNotes: function (viewConfig) {
        var notes = [];
        var i = 1;
        while (true) {
            var noteString = localStorage.getItem("note" + i);

            if (noteString == null) {

                // if no viewConfig return all unsorted without undefined entries
                if (typeof viewConfig == 'undefined') {
                    return notes.filter(function (item) {
                        return !(typeof item == 'undefined');
                    });
                }

                // remove gaps
                notes = notes.filter(function (item) {
                    if (typeof item == 'undefined') {
                        return false;
                    }

                    // all / only pendings
                    if (!viewConfig.showAllEntries && item.finished) {
                        return false; // only pendings, this item is done
                    }

                    return true;
                });

                return NoteProDAL.sort(notes, viewConfig.orderBy, viewConfig.orderASC);
            }
            var note = this.parseJSON(noteString);
            notes[i] = NoteFactory.createNote(note);
            i = i + 1;
        }
    },

    /**
     * Find note by id
     */
    getNote: function (noteId) {
        var notes = this.readNotes();
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id === noteId) {
                return notes[i];
            }
        }
    },

    /**
     * read next id from localStorage
     */
    getNextNoteId: function () {
        var lastNoteId = Number(localStorage.getItem("lastNoteId"));

        // check initial state
        if (lastNoteId < 0) {
            return 0; // first entry
        }

        return lastNoteId + 1;
    },

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
            case NoteProDAL.ORDERBY_CREATEDATE:
                compareNote = function (n1, n2) {
                    if (asc) {
                        return n1.dateCreated - n2.dateCreated;
                    }
                    return n2.dateCreated - n1.dateCreated;
                };
                break;
            case NoteProDAL.ORDERBY_IMOPRTANCE:
                compareNote = function (n1, n2) {
                    if (asc) {
                        return n1.importance - n2.importance;
                    }
                    return n2.importance - n1.importance;
                };
                break;
            case NoteProDAL.ORDERBY_FINISHDATE:
            default:
                compareNote = function (n1, n2) {
                    if (asc) {
                        return n1.dateFinishUntil - n2.dateFinishUntil;
                    }
                    return n2.dateFinishUntil - n1.dateFinishUntil;
                };
                break;
        }
        return notes.sort(compareNote);
    }
};
