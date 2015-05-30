/**
 * Controller for page view
 */
var NoteProController = {

    /**
     * toggle function show > edit
     */
    showEditScreen: function (noteId) {
        // new note > reset fields
        if (noteId == undefined) {
            document.getElementById("currentId").value = -1;
            document.getElementById("editTitle").value = "";
            document.getElementById("editText").value = "";
            document.getElementById("taskimportance").value = 2;
            document.getElementById("dateFinishUntil").value = "";
        } else {
            var note = NoteProDAL.getNote(noteId);
            document.getElementById("currentId").value = note.id;
            document.getElementById("editTitle").value = note.title;
            document.getElementById("editText").value = note.text;
            document.getElementById("taskimportance").value = note.importance;
            document.getElementById("dateFinishUntil").value = note.dateFinishUntil;
        }
        console.log("showEditScreen");
        $('.editwrapper').css({
            'display': 'block'
        }, 100);

        console.log("hideMainScreen");
        $('.mainwrapper').css({
            'display': 'none'
        });
    },

    /**
     * toggle function edit > show
     */
    showMainScreen: function () {
        console.log("hideEditScreen");
        $('.editwrapper').css({
            'display': 'none'
        });

        console.log("showMainScreen");
        $('.mainwrapper').css({
            'display': 'block'
        });

        this.showAllEntries();
    },

    /**
     * write given note from page edit into local storage
     */
    saveNote: function () {
        var note = NoteFactory.createNote();
        note.id = Number(document.getElementById("currentId").value);
        note.title = document.getElementById("editTitle").value;
        note.text = document.getElementById("editText").value;
        var dateFinishUntil = document.getElementById("dateFinishUntil").value;
        if (dateFinishUntil.length > 0) {
            note.dateFinishUntil = dateFinishUntil;
        } else {
            note.dateFinishUntil = NoteProDAL.DATE_FINISH_UNTIL_UNDEFINED;
        }
        note.importance = Number(document.getElementById('taskimportance').value);

        var result = NoteProDAL.saveNote(note);
        if (typeof result === 'number') {
            // return to the main page
            this.showMainScreen();
        } else {
            // an error occured
            alert(result);
        }
    },

    /**
     * render template
     */
    prepareTemplate: function () {
        // Helper for importance icons
        Handlebars.registerHelper("formatImportance",
            function (importance) {
                var importanceHtml = "";

                for (var j = 0; j < importance; j++) {
                    importanceHtml += '<img src="pix/reh_small_red.png" alt="#"/>';
                }
                for (var j = importance; j < 5; j++) {
                    importanceHtml += '<img src="pix/reh_small_black.png" alt="#"/>';
                }

                return new Handlebars.SafeString(importanceHtml);
            });

        // Helper for dateFinishUntil
        Handlebars.registerHelper("formatDate",
            function (date) {
                if (typeof date == 'undefined'
                    || date === NoteProDAL.DATE_FINISH_UNTIL_UNDEFINED) {
                    return '?';
                }
                return date.getDate()
                    + "." + date.getMonth()
                    + "." + date.getFullYear();
            });
        // compile template
        NoteProController.noteListRowTemplate = Handlebars.compile(document.getElementById("viewNoteEntry").textContent);
    },

    /**
     * print all entries from localStorage into console
     */
    showAllEntries: function () {
        console.log("render all entries");

        var notes = NoteProDAL.readNotes();
        document.getElementById("noteoutput").innerHTML = NoteProController.noteListRowTemplate(notes);
    }
};