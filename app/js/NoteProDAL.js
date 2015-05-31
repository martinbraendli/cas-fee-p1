/**
 * Data Access Layer - Interface to the storage
 */
var NoteProDAL = {
    /**
     * Undefined-value for dateFinishUntil
     * @type {string}
     */
    DATE_FINISH_UNTIL_UNDEFINED: 'DATE_FINISH_UNTIL_UNDEFINED',

    /**
     * Undefined-value for importance
     */
    IMPORTANCE_UNDEFINED: 'IMPORTANCE_UNDEFINED',

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
    readNotes: function (filter) {
        var notes = [];
        var i = 1;
        while (true) {
            var noteString = localStorage.getItem("note" + i);

            if (noteString == null) {
                // remove gaps
                notes = notes.filter(function (item) {
                    if (typeof item == 'undefined') {
                        return false;
                    }

                    // all / only pendings
                    if (!filter.showAllEntries && item.finished) {
                        return false; // only pendings, this item is done
                    }

                    return true;
                });

                return NoteProDAL.sort(notes);
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
     * sort by dateFinishUntil
     */
    sort: function (notes) {
        function compareNote(n1, n2) {
            return n1.dateFinishUntil - n2.dateFinishUntil;
        }
        return notes.sort(compareNote);
    }
};
