/**
 * Data Access Layer - Interface to server storage
 */
var NoteProDAL = {
    saveNote: function (note) {
        var validate = CommonsDAL.validateRequiredFields(note);
        if (!(validate === 0)) {
            return validate;
        }

        // to JSON
        var jsonNote = CommonsDAL.toJSON(note);

        // server side storage
        // todo implement call server (incl. setting new id)

        return note.id; // OK
    },

    /**
     * Read all available notes
     */
    readNotes: function (viewConfig) {
        var notes = [];

        // todo implement call server

        return notes;
    },

    /**
     * Find note by id
     * @param noteId
     */
    getNote: function (noteId) {
        // todo implement call server

    }
};
