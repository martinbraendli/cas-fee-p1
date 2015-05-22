/**
 * Created by martin on 20.05.2015.
 */
var NoteProController = {
    /**
     * Undefined-value for dateFinishUntil
     * @type {string}
     */
    DATE_FINISH_UNTIL_UNDEFINED: 'DATE_FINISH_UNTIL_UNDEFINED',

    /**
     * write given note into local storage
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

        return null; // OK
    },

    /**
     * Read all available notes
     */
    readNotes: function () {
        var notes = [];
        var i = 1;
        while (true) {
            var noteString = localStorage.getItem("note" + i);

            if (noteString == null) {
                return notes;
            }
            notes[i] = noteString; // todo parse JSON to object
            i = i + 1;
        }
    },

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
    }
};
