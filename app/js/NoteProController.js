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
     * print all entries from localStorage into console
     */
    showAllEntries: function () {
        console.log("print all entries");
        var notes = NoteProDAL.readNotes();

        var divListNotes = document.getElementById('listnotes');

        for (var i = 1; i < notes.length; i++) {
            console.log(notes[i].toString());

            var divTasklistrow = document.createElement('div');
            divTasklistrow.setAttribute('class', 'tasklistrow');
            divListNotes.appendChild(divTasklistrow);

            /* START <div class="list-elem task-date">*/
            var divTaskDate = document.createElement('div');
            divTaskDate.setAttribute('class', 'list-elem task-date');

            var pDate = document.createElement('p');
            pDate.appendChild(document.createTextNode(notes[i].getDateFinishUntilString()));
            divTaskDate.appendChild(pDate);

            divTasklistrow.appendChild(divTaskDate);
            /* END */

            /* START <div class="list-elem task-desc"> */
            var divTaskTitleText = document.createElement('div');
            divTaskTitleText.setAttribute('class', 'list-elem task-desc');

            var h4titel = document.createElement('h4');
            h4titel.appendChild(document.createTextNode(notes[i].title));
            divTaskTitleText.appendChild(h4titel);

            var pText = document.createElement('p');
            pText.appendChild(document.createTextNode(notes[i].text));
            divTaskTitleText.appendChild(pText);

            divTasklistrow.appendChild(divTaskTitleText);
            /* END */

            /* START <div class="list-elem task-importance">*/
            var divTaskImportance = document.createElement('div');
            divTaskImportance.setAttribute('class', 'list-elem task-importance');

            var span = document.createElement('span');
            for (var j = 0; j < notes[i].importance; j++) {
                var imgRed = document.createElement('img');
                imgRed.setAttribute('src', 'pix/reh_small_red.png');
                imgRed.setAttribute('alt', '#');
                span.appendChild(imgRed);
            }
            for (var j = notes[i].importance; j < 5; j++) {
                var imgBlack = document.createElement('img');
                imgBlack.setAttribute('src', 'pix/reh_small_black.png');
                imgBlack.setAttribute('alt', '#');
                span.appendChild(imgBlack);
            }
            divTaskImportance.appendChild(span);

            divTasklistrow.appendChild(divTaskImportance);
            /* END */

            /* START <div class="list-elem task-edit-btn">*/
            var divTaskEdit = document.createElement('div');
            divTaskEdit.setAttribute('class', 'list-elem task-edit-btn');

            var aBtn = document.createElement('a');
            aBtn.setAttribute('href', '#');
            aBtn.setAttribute('onclick', 'NoteProController.showEditScreen(' + notes[i].id + ')');
            aBtn.appendChild(document.createTextNode('Edit Note'));
            divTaskEdit.appendChild(aBtn);

            divTasklistrow.appendChild(divTaskEdit);
            /* END */
        }
    }
};