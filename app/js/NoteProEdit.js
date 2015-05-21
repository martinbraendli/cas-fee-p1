var NoteProEdit = {
    /**
     * Undefined-value for dateFinishUntil
     * @type {string}
     */
    DATE_FINISH_UNTIL_UNDEFINED: 'DATE_FINISH_UNTIL_UNDEFINED',

    /**
     * write given note into local storage
     */
    saveNote: function () {
        var noteFactory = new NoteFactory();

        var note = noteFactory.createNote();
        note.text = document.getElementById("text").value;

        NoteProController.saveNote(note);

        window.location.href = "index.html";
    }
};