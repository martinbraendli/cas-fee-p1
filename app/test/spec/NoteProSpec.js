/**
 * Jasmine spec's für NotePro
 */
describe("NotePro", function () {

    /**
     * clear storage to have the same conditions each time
     */
    beforeEach(function () {
        localStorage.clear();
    });

    describe("DAL", function () {
        it('should get next note id', function () {
            var note = NoteFactory.createNote();
            note.text = "def";
            note.title = "def";

            var id = NoteProDAL.getNextNoteId();
            expect(id).toBe(1);
            NoteProDAL.saveNote(note); // bekommt id = 1
            id = NoteProDAL.getNextNoteId();
            expect(id).toBe(2);
            NoteProDAL.saveNote(note); // darf next id nicht verändern
            id = NoteProDAL.getNextNoteId();
            expect(id).toBe(2);
        });

        it('should convert note into json', function () {
            var note = NoteFactory.createNote();
            note.id = 42;
            note.title = "Titel 42";
            note.text = "Text 42";
            var noteDateCreated = note.dateCreated.toString();
            note.importance = 5;

            var noteString = NoteProDAL.toJSON(note);
            expect(noteString).toBeDefined();
            expect(noteString.indexOf('"id":"42"')).toBeTruthy();
            expect(noteString.indexOf('"titel":"Titel 42"')).toBeTruthy();
            expect(noteString.indexOf('"text":"Text 42"')).toBeTruthy();
            expect(noteString.indexOf('"dateCreated":"' + noteDateCreated + '"')).toBeTruthy();
            expect(noteString.indexOf('"importance":"5"')).toBeTruthy();
        });

        it('should convert json into note', function () {
            var json = '{"id":43,' +
                '"finished":false,' +
                '"dateCreated":"2015-06-05T20:29:31.115Z",' +
                '"dateFinishUntil":"DATE_UNDEFINED",' +
                '"dateFinished":"DATE_UNDEFINED",' +
                '"title":"asdf",' +
                '"text":"jklö",' +
                '"importance":1}';

            var parsedNote = NoteFactory.createNote(NoteProDAL.parseJSON(json));
            expect(parsedNote.id).toBe(43);
            expect(parsedNote.finished).toBe(false);
            var dateCreatedDelta = new Date(Date.parse("2015-06-05T20:29:31.115Z")).getTime() + 1000; // one second tolerance
            expect(parsedNote.dateCreated.getTime() <= dateCreatedDelta).toBeTruthy();
            expect(parsedNote.dateFinishUntil).toBe(NoteConstants.DATE_UNDEFINED);
            expect(parsedNote.dateFinished).toBe(NoteConstants.DATE_UNDEFINED);
            expect(parsedNote.title).toBe("asdf");
            expect(parsedNote.text).toBe("jklö");
            expect(parsedNote.importance).toBe(1);
        });

        it('should save note', function () {
            var note = NoteFactory.createNote();
            note.title = "titelShouldSaveNote";
            note.text = "textShouldSaveNote";
            note.importance = 4;

            // save
            var noteId = NoteProDAL.saveNote(note);
            expect(noteId).toBeTruthy();
            expect(typeof noteId).toBe('number');

            // read note
            var readedNotes = NoteProDAL.readNotes();
            expect(readedNotes).toBeTruthy();
            var readedNote = readedNotes[0];
            expect(readedNote).toBeTruthy();
            expect(typeof readedNote).toBe('object');
            expect(readedNote.id).toBe(noteId);
            expect(readedNote.title).toBe("titelShouldSaveNote");
            expect(readedNote.text).toBe("textShouldSaveNote");
            expect(readedNote.importance).toBe(4);
        });

        it('should get note by id', function () {
            // TODO expect(true).toBeFalsy();
        });

        it('should sort notes by create date', function () {
            // TODO expect(true).toBeFalsy();
        });

        it('should sort notes by finish date', function () {
            // TODO expect(true).toBeFalsy();
        });

        it('should sort notes by importance', function () {
            // TODO expect(true).toBeFalsy();
        });
    });

    describe("Controller", function () {

    });

    describe("NoteFactory", function () {
        describe("createNote", function () {
            it('should recognize undefined note', function () {
                var note = NoteFactory.createNote();
                expect(note.id).toBe(-1);

                note = NoteFactory.createNote(null);
                expect(note.id).toBe(-1);
            });

            it('should fill default fields', function () {
                note = NoteFactory.createNote();
                expect(note.id).toBe(-1);
                expect(note.finished).toBe(false);
                expect(note.title).toBe("");
                expect(note.text).toBe("");
                expect(note.importance).toBe(NoteConstants.IMPORTANCE_DEFAULT);
                expect(note.dateFinished).toBe(NoteConstants.DATE_UNDEFINED);

                var dateInOneWeek = NoteConstants.DATE_FINISHED_UNTIL_DEFAULT();
                expect(note.dateFinishUntil.getTime()).toBe(dateInOneWeek.getTime());

                var dateCreatedDelta = new Date().getTime() + 1000; // one second tolerance
                expect(note.dateCreated.getTime() <= dateCreatedDelta).toBeTruthy();
            });

            it('should create note with given object', function () {
                var dateCreated = new Date(Date.parse("2/1/2015"));
                var dateFinishedUntil = new Date(Date.parse("5/1/2015"));
                var dateFinished = new Date(Date.parse("6/1/2015"));

                var customNote = {
                    id: 23885,
                    finished: true,
                    dateCreated: dateCreated,
                    dateFinishUntil: dateFinishedUntil,
                    dateFinished: dateFinished,
                    title: 'createNoteText',
                    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                    importance: 5
                };

                var createdNote = NoteFactory.createNote(customNote);

                expect(createdNote.id).toBe(customNote.id);

                expect(typeof createdNote.finished).toBe('boolean');
                expect(createdNote.finished).toBe(customNote.finished);

                expect(typeof createdNote.dateCreated).toBe('object');
                expect(createdNote.dateCreated).toBe(customNote.dateCreated);

                expect(typeof createdNote.dateFinishUntil).toBe('object');
                expect(createdNote.dateFinishUntil).toBe(customNote.dateFinishUntil);

                expect(typeof createdNote.dateFinished).toBe('object');
                expect(createdNote.dateFinished).toBe(customNote.dateFinished);

                expect(typeof createdNote.title).toBe('string');
                expect(createdNote.title).toBe(customNote.title);

                expect(typeof createdNote.text).toBe('string');
                expect(createdNote.text).toBe(customNote.text);

                expect(typeof createdNote.importance).toBe('number');
                expect(createdNote.importance).toBe(customNote.importance);
            });
        });
    });
});
