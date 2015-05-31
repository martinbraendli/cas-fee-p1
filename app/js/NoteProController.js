/**
 * Controller for page view
 */
var NoteProController = {
    viewConfig: {
        showAllEntries: true,
        orderBy: NoteProDAL.ORDERBY_FINISHDATE
    },

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
            note.dateFinishUntil = NoteProDAL.DATE_UNDEFINED;
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

    finishNote: function (id) {
        var r = confirm("Really finished?");
        if (r == true) {
            var note = NoteProDAL.getNote(id);
            note.finished = !note.finished;
            note.dateFinished = new Date();
            NoteProDAL.saveNote(note);
        }

        NoteProController.showAllEntries();
    },

    toggleShowAllEntries: function () {
        NoteProController.viewConfig.showAllEntries = !NoteProController.viewConfig.showAllEntries;
        NoteProController.renderListControlls();
        NoteProController.showAllEntries();
        return false; // todo prevent default
    },

    /**
     * Change sort order
     */
    switchOrderBy: function (clickedElement) {
        switch (clickedElement.id) {
            case "byFinishDate":
                NoteProController.viewConfig.orderBy = NoteProDAL.ORDERBY_FINISHDATE;
                break;
            case "byCreateDate":
                NoteProController.viewConfig.orderBy = NoteProDAL.ORDERBY_CREATEDATE;
                break;
            case "byImportance":
                NoteProController.viewConfig.orderBy = NoteProDAL.ORDERBY_IMOPRTANCE;
                break;
            default:
                // noop
                break;
        }
        NoteProController.renderListControlls();
        NoteProController.showAllEntries();
        return false; // todo prevent default
    },

    /**
     * Sort buttons and toggler for all entries/only pending entries
     */
    renderListControlls: function () {
        if (NoteProController.viewConfig.orderBy === NoteProDAL.ORDERBY_FINISHDATE) {
            $("#byFinishDate").attr('style', 'font-size: 20px'); // TODO als class anpassen
            $("#byCreateDate").attr('style', '');
            $("#byImportance").attr('style', '');
        } else if (NoteProController.viewConfig.orderBy === NoteProDAL.ORDERBY_CREATEDATE) {
            $("#byFinishDate").attr('style', '');
            $("#byCreateDate").attr('style', 'font-size: 20px');
            $("#byImportance").attr('style', '');
        } else if (NoteProController.viewConfig.orderBy === NoteProDAL.ORDERBY_IMOPRTANCE) {
            $("#byFinishDate").attr('style', '');
            $("#byCreateDate").attr('style', '');
            $("#byImportance").attr('style', 'font-size: 20px');
        }

        if (NoteProController.viewConfig.showAllEntries) {
            $("#showAllCompleted").html("Show only pendings");
        } else {
            $("#showAllCompleted").html("Show all");
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
                    || date === NoteProDAL.DATE_UNDEFINED) {
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

        var notes = NoteProDAL.readNotes(NoteProController.viewConfig, NoteProController.sort);
        document.getElementById("noteoutput").innerHTML = NoteProController.noteListRowTemplate(notes);
    }
};