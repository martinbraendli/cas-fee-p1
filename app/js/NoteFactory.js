/**
 * Factory for note object
 */
var NoteFactory = {
    /**
     *
     * @param note
     * @returns {*}
     */
    createNote: function (note) {
        var thisNote;
        if (typeof note == 'undefined' || note == null) {
            thisNote = new Note();
        } else {
            thisNote = new Note();
            thisNote.id = note.id;
            thisNote.finished = note.finished;
            thisNote.dateCreated = note.dateCreated;
            thisNote.dateFinishUntil = note.dateFinishUntil;
            thisNote.dateFinished = note.dateFinished;
            thisNote.title = note.title;
            thisNote.text = note.text;
            thisNote.importance = note.importance;
        }

        return thisNote;
    }
};