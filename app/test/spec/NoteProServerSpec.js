/**
 * Jasmine spec's für NotePro with server side code
 */
describe("NotePro", function () {

    /**
     * clear storage to have the same conditions each time
     */
    beforeEach(function () {
        localStorage.clear();
    });

    describe("Server DAL", function () {
        it('should save note', function () {
            var note = NoteFactory.createNote();
            note.title = "titelShouldSaveNote";
            note.text = "textShouldSaveNote";
            note.importance = 4;

            // save
            var noteId = NoteProDAL.saveNote(note);
            expect(noteId).toBe(0);
            expect(typeof noteId).toBe('number');

            // read note
            var callback1 = function (readedNotes) {
                expect(readedNotes).toBeTruthy();
                var readedNote = readedNotes[0];
                expect(readedNote).toBeTruthy();
                expect(typeof readedNote).toBe('object');
                expect(readedNote.id).toBe(noteId);
                expect(readedNote.title).toBe("titelShouldSaveNote");
                expect(readedNote.text).toBe("textShouldSaveNote");
                expect(readedNote.importance).toBe(4);
            };
            var readedNotes = NoteProDAL.readNotes(undefined, callback1);
        });
    });
});
