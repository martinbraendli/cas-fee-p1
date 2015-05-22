/**
 * Constructor for NoteFactory
 * @constructor
 */
function NoteFactory() {
    this.createNote = function () {
        var note = {
            id: -1,
            finished: false,
            dateCreated: new Date(),
            dateFinishUntil: NoteProController.DATE_FINISH_UNTIL_UNDEFINED, // optional
            title: '',
            text: '',
            importance: 0 // 0 bis 5
        };

        note.toString = function () {
            return "id: " + note.id + ", title: " + note.title + ", text: " + note.text;
        };

        return note;
    }
}