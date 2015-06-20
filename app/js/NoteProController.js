/**
 * Controller for page view
 */
var NoteProController = {
    // todo events mit on anhängen

    /**
     * object with config for reading entries from storage
     */
    viewConfig: {
        showAllEntries: true, // all or only pending entries
        orderBy: NoteConstants.ORDERBY_FINISH_UNTIL_DATE, // sort field
        orderASC: true
    },// todo save to db

    timerConstants: {
        timeYellow: 24 * 60 * 60 * 1000,// 1 day
        timeRed: 60 * 60 * 1000,// 1 Hour
        timeMissed: 0,// 0,
        refreshTimer: 60 * 1000 // 1 Minute
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
            NoteProController.refreshEditView();
        } else {
            var callback = function (note) {
                $("#currentId").val(note.id);
                $("#editTitle").val(note.title);
                $("#editText").val(note.text);
                $("#taskimportance").val(note.importance);
                $("#dateFinishUntil").datetimepicker({value: note.dateFinishUntil});
                NoteProController.refreshEditView();
            };
            NoteProDAL.getNote(noteId, callback);
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
     * Show popup for cancel question, ok callback will return to the list view
     */
    showMainScreen: function (showCancelMessage) {
        var okCallback = function () {
            console.log("hideEditScreen");

            $('.editwrapper').css({
                'display': 'none'
            });

            console.log("showMainScreen");
            $('.mainwrapper').css({
                'display': 'block'
            });

            NoteProController.showAllEntries();
        };

        if (showCancelMessage) {
            // ask if really finished
            NoteProController.showPopup(okCallback, function () {/*noop*/
                }, null,
                {
                    title: 'Cancel',
                    text: "Cancel without saving? All data will be lost",
                    buttonOk: "Ok",
                    buttonCancel: "Cancel"
                });
        } else {
            okCallback();
        }
    },

    /**
     * Write given values from edit form into note and save it into
     * DataLayer.
     */
    saveNote: function () {
        var note = NoteFactory.createNote();
        note.id = $("#currentId").val();
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
            // an error occured, show popup
            NoteProController.showPopup(NoteProController.hidePopup, NoteProController.hidePopup, null,
                {
                    title: 'Problem occured',
                    text: "Problems during saving: " + result,
                    buttonOk: "Ok"
                });
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
     * @param callbackOk action if ok button is pressed
     * @param callbackCancel action if cancel button is pressed
     * @param note
     * @param popupValues values for popup template
     */
    showPopup: function (callbackOk, callbackCancel, note, popupValues) {
        var popup = $("#TaskDone");

        popup.html(NoteProController.popupTemplate(popupValues));

        // callback für ok-button
        $("#TaskDoneButtonOk").on("click", note, function (event) {
            callbackOk(event);
            NoteProController.hidePopup();
        });

        // callback für cancel-button
        $("#TaskDoneButtonCancel").on("click", function () {
            callbackCancel();
            NoteProController.hidePopup();
        });

        // show popup
        popup.show();
    },

    hidePopup: function () {
        $("#TaskDone").hide();
    },

    /**
     * Toggle function for checkbox which sets the finish state with a "are-you-sure"-popup.
     * @param id
     */
    finishNote: function (id) {
        var callback = function (note) {
            if (note.finished) {
                // already finished > unfinish without popup
                NoteProController.finishAcceptedSaveNoteCallback({data: note}); // same way as the callback event passes the data
            } else {
                // ask if really finished
                NoteProController.showPopup(NoteProController.finishAcceptedSaveNoteCallback,
                    NoteProController.showAllEntries,
                    note,
                    {
                        title: 'Well done!',
                        text: "You have Completed your Task '" + note.title + "' successfully.",
                        buttonOk: "Cool, next Task",
                        buttonCancel: "Oh no, not finished!"
                    });
            }
        };
        NoteProDAL.getNote(id, callback);
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
                for (j = importance; j < 5; j++) {
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

        // Helper for coloring the note row if the end is near or reached
        Handlebars.registerHelper("progressStyle",
            function (dateFinishUntil) {
                if (typeof dateFinishUntil == 'undefined'
                    || dateFinishUntil == null) {
                    return "";
                }
                var now = (new Date()).getTime();
                var until = dateFinishUntil.getTime();
                var diff = until - now;

                // missed
                if (diff < NoteProController.timerConstants.timeMissed) {
                    return "missed";
                }
                // redAlert
                if (diff < NoteProController.timerConstants.timeRed) {
                    return "red";
                }
                // yellowAlert
                if (diff < NoteProController.timerConstants.timeYellow) {
                    return "yellow";
                }

                return "";
            });

        // compile template
        NoteProController.noteListRowTemplate = Handlebars.compile(document.getElementById("viewNoteEntry").textContent);
        NoteProController.importanceIcons = Handlebars.compile(document.getElementById("importanceIcons").textContent);
        NoteProController.popupTemplate = Handlebars.compile(document.getElementById("popup").textContent);
    },

    /**
     * print all entries from localStorage into console
     */
    showAllEntries: function () {
        console.log("render all entries");

        var callback = function (notes) {
            $("#noteoutput").html(NoteProController.noteListRowTemplate(notes));
        };
        var notes = NoteProDAL.readNotes(NoteProController.viewConfig, callback);
    },

    /**
     * render importance icons, (e.g. after slider has been changed)
     */
    refreshEditView: function () {
        $("#importanceEdit").html(NoteProController.importanceIcons($("#taskimportance").val()));
    },

    /**
     * Timer runs each minute to display state of tasks and open reminder popups
     */
    timer: function () {
        var setTimerforTask = setInterval(function () {
            console.log("setTimerforTask");
            // render note list with styles to highlight late tasks
            NoteProController.showAllEntries();
        }, NoteProController.timerConstants.refreshTimer);
    },

    /**
     * Document ready, time to init the view
     */
    setup: function () {
        // configure date picker
        $('#dateFinishUntil').datetimepicker({
            format: 'd.m.Y H:i'
        }); // todo test in firefox

        NoteProController.renderListControlls();
        NoteProController.prepareTemplate();
        NoteProController.showAllEntries();


        // start timer task
        NoteProController.timer();
    }
};