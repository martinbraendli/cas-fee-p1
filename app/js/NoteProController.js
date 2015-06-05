/**
 * Controller for page view
 */
var NoteProController = {
    /**
     * object with config for reading entries from storage
     */
    viewConfig: {
        showAllEntries: true, // all or only pending entries
        orderBy: Note.ORDERBY_FINISHDATE, // sort field
        orderASC: true
    },

    /**
     * toggle function show > edit
     */
    showEditScreen: function (noteId) {
        // new note > reset fields
        if (noteId == undefined) {
            $("#currentId").val(-1);
            $("#editTitle").val("");
            $("#editText").val("");
            $("#taskimportance").val(2);
            $("#dateFinishUntil").val("");
        } else {
            var note = NoteProDAL.getNote(noteId);
            $("#currentId").val(note.id);
            $("#editTitle").val(note.title);
            $("#editText").val(note.text);
            $("#taskimportance").val(note.importance);
            $("#dateFinishUntil").val(note.dateFinishUntil);
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

        NoteProController.showAllEntries();
    },

    /**
     * write given note from page edit into local storage
     */
    saveNote: function () {
        var note = NoteFactory.createNote();
        note.id = Number($("#currentId").val());
        note.title = $("#editTitle").val();
        note.text = $("#editText").val();
        var dateFinishUntil = $("#dateFinishUntil").val();
        if (dateFinishUntil.length > 0) {
            note.dateFinishUntil = dateFinishUntil;
        } else {
            note.dateFinishUntil = Note.DATE_UNDEFINED;
        }
        note.importance = Number($('#taskimportance').val());

        var result = NoteProDAL.saveNote(note);
        if (typeof result === 'number') {
            // return to the main page
            NoteProController.showMainScreen();
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
        var newOrder;
        switch (clickedElement.id) {
            case "byCreateDate":
                newOrder = Note.ORDERBY_CREATEDATE;
                break;
            case "byImportance":
                newOrder = Note.ORDERBY_IMOPRTANCE;
                break;
            case "byFinishDate":
            default:
                newOrder = Note.ORDERBY_FINISHDATE;
                break;
        }

        // if same field, change ASC/DESC
        if (newOrder === NoteProController.viewConfig.orderBy) {
            NoteProController.viewConfig.orderASC = !NoteProController.viewConfig.orderASC;
        } else {
            NoteProController.viewConfig.orderBy = newOrder;
        }

        NoteProController.renderListControlls();
        NoteProController.showAllEntries();
        return false; // todo prevent default
    },

    /**
     * Sort buttons and toggler for all entries/only pending entries
     */
    renderListControlls: function () {
        if (NoteProController.viewConfig.orderBy === Note.ORDERBY_FINISHDATE) {
            $("#byFinishDate").attr('style', 'font-size: 20px'); // TODO als class anpassen
            $("#byCreateDate").attr('style', '');
            $("#byImportance").attr('style', '');
        } else if (NoteProController.viewConfig.orderBy === Note.ORDERBY_CREATEDATE) {
            $("#byFinishDate").attr('style', '');
            $("#byCreateDate").attr('style', 'font-size: 20px');
            $("#byImportance").attr('style', '');
        } else if (NoteProController.viewConfig.orderBy === Note.ORDERBY_IMOPRTANCE) {
            $("#byFinishDate").attr('style', '');
            $("#byCreateDate").attr('style', '');
            $("#byImportance").attr('style', 'font-size: 20px');
        }

        if (NoteProController.viewConfig.showAllEntries) {
            $("#showAllCompleted").html("Show only pendings");
        } else {
            $("#showAllCompleted").html("Show only pendings AKTIV");
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
                    || date === NoteConstants.DATE_UNDEFINED) {
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
        $("#noteoutput").html(NoteProController.noteListRowTemplate(notes));
    }
};