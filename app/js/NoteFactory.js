/**
 * Factory for note object
 */
var NoteFactory = {
    /**
     * create new Note by given object with possible matching properties. The
     * properties will be set into the new created Note. Converting of the values
     * happens in the setter of Note.
     *
     * @param note any object with matching properties
     * @returns {*} the created Note
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