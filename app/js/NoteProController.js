/**
 * Controller for page view
 */
var NoteProController = {
    // todo background task für alert + style setzn, in readme eintragen
    // todo events mit on anhängen
    /**
     * object with config for reading entries from storage
     */
    viewConfig: {
        showAllEntries: true, // all or only pending entries
        orderBy: NoteConstants.ORDERBY_FINISH_UNTIL_DATE, // sort field
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
            $("#taskimportance").val(NoteConstants.IMPORTANCE_DEFAULT);
            $("#dateFinishUntil").datetimepicker({value: NoteConstants.date_finished_until_default()});
        } else {
            var note = NoteProDAL.getNote(noteId);
            $("#currentId").val(note.id);
            $("#editTitle").val(note.title);
            $("#editText").val(note.text);
            $("#taskimportance").val(note.importance);
            $("#dateFinishUntil").datetimepicker({value: note.dateFinishUntil});
        }
        console.log("showEditScreen");
        $('.editwrapper').css({
            'display': 'block'
        }, 100);

        console.log("hideMainScreen");
        $('.mainwrapper').css({
            'display': 'none'
        });

        NoteProController.refreshEditView();
    },

    /**
     * toggle function edit > show
     */
    showMainScreen: function (showCancelMessage) {
        if (showCancelMessage) {
            var r = confirm("Cancel without saving? All data will be lost");
            if (r == false) {
                return;
            }
        }
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
     * Write given values from edit form into note and save it into
     * DataLayer.
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

    finishAcceptedSaveNoteCallback: function (event) {
        var note = event.data;
        note.finished = !note.finished;
        note.dateFinished = new Date();
        NoteProDAL.saveNote(note);
        NoteProController.showAllEntries();
    },

    /**
     * Show popup which asks if the user wants to finish the task. The callback will
     * be called if the ok button is pressed.
     * @param callback
     * @param note
     */
    showFinishPopup: function (callback, note) {
        // todo render popup mit template

        // callback für ok-button
        $("#TaskDoneButtonOk").on("click", note, callback);

        // callback für cancel-button
        $("#TaskDoneButtonCancel").on("click", NoteProController.showAllEntries);

        // show popup
        $("#TaskDone").show();
    },

    /**
     * Toggle function for checkbox which sets the finish state with a "are-you-sure"-popup.
     * @param id
     */
    finishNote: function (id) {

        var note = NoteProDAL.getNote(id);

        if (note.finished) {
            // already finished > unfinish without popup
            NoteProController.finishAcceptedSaveNoteCallback({data: note}); // same way as the callback event passes the data
        } else {
            // ask if really finished
            NoteProController.showFinishPopup(NoteProController.finishAcceptedSaveNoteCallback, note);
        }
    },

    /**
     * ToggleFunction for filter the finished notes.
     */
    toggleShowAllEntries: function () {
        NoteProController.viewConfig.showAllEntries = !NoteProController.viewConfig.showAllEntries;
        NoteProController.renderListControlls();
        NoteProController.showAllEntries();
    },

    /**
     * Change sort order
     */
    switchOrderBy: function (clickedElement) {
        var newOrder;
        switch (clickedElement.id) {
            case "byCreateDate":
                newOrder = NoteConstants.ORDERBY_CREATEDATE;
                break;
            case "byImportance":
                newOrder = NoteConstants.ORDERBY_IMPORTANCE;
                break;
            case "byFinishDate":
            default:
                newOrder = NoteConstants.ORDERBY_FINISH_UNTIL_DATE;
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
    },

    /**
     * Sort buttons and toggler for all entries/only pending entries
     */
    renderListControlls: function () {
        if (NoteProController.viewConfig.orderBy === NoteConstants.ORDERBY_FINISH_UNTIL_DATE) {
            $("#byFinishDate").attr('class', 'active');
            $("#byCreateDate").attr('class', '');
            $("#byImportance").attr('class', '');
        } else if (NoteProController.viewConfig.orderBy === NoteConstants.ORDERBY_CREATEDATE) {
            $("#byFinishDate").attr('class', '');
            $("#byCreateDate").attr('class', 'active');
            $("#byImportance").attr('class', '');
        } else if (NoteProController.viewConfig.orderBy === NoteConstants.ORDERBY_IMPORTANCE) {
            $("#byFinishDate").attr('class', '');
            $("#byCreateDate").attr('class', '');
            $("#byImportance").attr('class', 'active');
        }

        if (NoteProController.viewConfig.showAllEntries) {
            $("#showAllCompleted").html("Show finished")
                .attr('class', '');
        } else {
            $("#showAllCompleted").html("Show finished")
                .attr('class', 'active');
        }
    },

    /**
     * render templates
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
                if (date == null
                    || typeof date == 'undefined'
                    || date === NoteConstants.DATE_UNDEFINED) {
                    return '?';
                }
                return date.toLocaleString();
            });
        // compile template
        NoteProController.noteListRowTemplate = Handlebars.compile(document.getElementById("viewNoteEntry").textContent);
        NoteProController.importanceIcons = Handlebars.compile(document.getElementById("importanceIcons").textContent);
    },

    /**
     * print all entries from localStorage into console
     */
    showAllEntries: function () {
        console.log("render all entries");

        // hide popups
        $("#TaskDone").hide();
        $("#TaskFailed").hide();

        var notes = NoteProDAL.readNotes(NoteProController.viewConfig, NoteProController.sort);
        $("#noteoutput").html(NoteProController.noteListRowTemplate(notes));
    },

    /**
     * render importance icons, (e.g. after slider has been changed)
     */
    refreshEditView: function () {
        $("#importanceEdit").html(NoteProController.importanceIcons($("#taskimportance").val()));
    },

    // F- Timer function useless now
    timer: function(){
        // is noch im html

    }


};