/**
 * Controller for page view
 */
var NoteProController = {
    /**
     * Undefined-value for dateFinishUntil
     * @type {string}
     */
    DATE_FINISH_UNTIL_UNDEFINED: 'DATE_FINISH_UNTIL_UNDEFINED',

    /**
     * toggle function show > edit
     */
    showEditScreen: function (noteId) {
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
        note.title = document.getElementById("editTitle").value;
        note.text = document.getElementById("editText").value;

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

            var pText = document.createElement('p');
            pText.appendChild(document.createTextNode(notes[i].getDateFinishUntil()));
            divTaskDate.appendChild(pText);

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
            divTaskImportance.appendChild(span);

            divTasklistrow.appendChild(divTaskImportance);
            /* END */

            /* START <div class="list-elem task-edit-btn">*/
            var divTaskEdit = document.createElement('div');
            divTaskEdit.setAttribute('class', 'list-elem task-edit-btn');

            var aBtn = document.createElement('a');
            aBtn.setAttribute('href', '#');
            aBtn.appendChild(document.createTextNode('Edit Note'));
            divTaskEdit.appendChild(aBtn);

            divTasklistrow.appendChild(divTaskEdit);
            /* END */
        }
    }
};