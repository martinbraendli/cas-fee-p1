/**
 * Data Access Layer - Interface to server storage
 */
var NoteProDAL = {
    saveNote: function (note) {
        var validate = CommonsDAL.validateRequiredFields(note);
        if (!(validate === 0)) {
            return validate;
        }

        // server side storage
        AjaxHelper.ajax("POST", "/api", note);
        return 0;
    },

    /**
     * Read all available notes
     */
    readNotes: function (viewConfig, callback) {
        AjaxHelper.ajax("GET", "/api")
            .done(function (msg) {
                var notes = msg;
                var finalNotes = [];
                for (var i = 0; i < notes.length; i++) {
                    // create objects of type Note
                    finalNotes[i] = NoteFactory.createNote(notes[i]);
                }

                // all / only pendings
                finalNotes = finalNotes.filter(function (item) {
                    return (!(viewConfig.showAllEntries && item.finished));
                });

                // client side sort for faster response time
                finalNotes = CommonsDAL.sort(finalNotes, viewConfig.orderBy, viewConfig.orderASC);
                callback(finalNotes);
            });
    },

    /**
     * Find note by id
     */
    getNote: function (noteId, callback) {
        AjaxHelper.ajax("GET", "/api/" + noteId)
            .done(function (msg) {
                // create object of type Note
                var finalNote = NoteFactory.createNote(msg);
                callback(finalNote);
            });
    }
};

var AjaxHelper = {
    ajax: function (metod, url, data) {
        return $.ajax({
            dataType: "json",
            method: metod,
            url: url,
            data: data
        });
    }
};
