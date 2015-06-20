/**
 * Data Access Layer - Interface to the local storage
 */
var NoteProDAL = {
    /**
     * write given note into local storage
     * @returns the id of the note, a text if an error occured
     */
    saveNote: function (note) {
        var validate = CommonsDAL.validateRequiredFields(note);
        if (!(validate === 0)) {
            return validate;
        }

        // get next id if not set
        if (note.id < 0) {
            note.id = NoteProDAL.getNextNoteId();
        }

        // to JSON
        var jsonNote = CommonsDAL.toJSON(note);

        // save to localStorage
        localStorage.setItem("note" + note.id, jsonNote);
        localStorage.setItem("lastNoteId", note.id);

        return note.id; // OK
    },

    /**
     * Read all available notes
     */
    readNotes: function (viewConfig, callback) {
        var notes = [];
        var i = 1;
        while (true) {
            var noteString = localStorage.getItem("note" + i);

            if (noteString == null) {
                var finalNotes;

                // if no viewConfig return all unsorted without undefined entries
                if (typeof viewConfig == 'undefined') {
                    finalNotes = notes.filter(function (item) {
                        return !(typeof item == 'undefined');
                    });
                    if (callback) {
                        callback(finalNotes)
                    }
                    return;
                }

                // remove gaps
                notes = notes.filter(function (item) {
                    if (typeof item == 'undefined') {
                        return false;
                    }

                    // all / only pendings
                    return (!(viewConfig.showAllEntries && item.finished));
                });

                finalNotes = CommonsDAL.sort(notes, viewConfig.orderBy, viewConfig.orderASC);
                if (callback) {
                    callback(finalNotes);
                }
                return;
            }
            var note = CommonsDAL.parseJSON(noteString);
            notes[i] = NoteFactory.createNote(note);
            i = i + 1;
        }
    },

    /**
     * Find note by id
     */
    getNote: function (noteId, callback) {
        var readAllCallback = function (notes) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id == noteId) {
                    callback(notes[i]);
                }
            }
        };
        var notes = this.readNotes(undefined, readAllCallback);
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
    }
};
