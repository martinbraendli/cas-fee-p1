/**
 * Factory for note object
 */
var NoteFactory = {
    createNote: function (note) {
        var thisNote = note;
        if (typeof note == 'undefined') {
            thisNote = {
                id: -1,
                finished: false,
                dateCreated: new Date(),
                dateFinishUntil: NoteProDAL.DATE_FINISH_UNTIL_UNDEFINED, // optional
                title: '',
                text: '',
                importance: NoteProDAL.IMPORTANCE_UNDEFINED // 0 bis 5
            };
        } else {
            // create objects
            if (thisNote.dateFinishUntil !== NoteProDAL.DATE_FINISH_UNTIL_UNDEFINED
                && typeof thisNote.dateFinishUntil == 'string') {
                // Datum
                thisNote.dateFinishUntil = new Date(thisNote.dateFinishUntil);
            }
        }

        thisNote.toString = function () {
            return "id: " + thisNote.id + ", title: " + thisNote.title + ", text: " + thisNote.text;
        };

        return thisNote;
    }
};