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

    it('should save note', function () {
        var note = NoteFactory.createNote();
        note.titel = "titelShouldSaveNote";
        note.text = "textShouldSaveNote";

        // save
        var noteId = NoteProDAL.saveNote(note);
        expect(noteId).toBeTruthy();
        expect(typeof noteId).toBe('number');

        // read note
        var readedNotes = NoteProDAL.readNotes();
        expect(readedNotes).toBeTruthy();
        var readedNote = readedNotes[noteId];
        expect(readedNote).toBeTruthy();
        expect(typeof readedNote).toBe('object');
        expect(readedNote.titel).toBe("titelShouldSaveNote");
        expect(readedNote.text).toBe("textShouldSaveNote");
    });

    it('should get next note id', function () {
        var note = NoteFactory.createNote();

        var id = NoteProDAL.getNextNoteId();
        expect(id).toBe(1);
        NoteProDAL.saveNote(note); // bekommt id = 0
        id = NoteProDAL.getNextNoteId();
        expect(id).toBe(2);
        NoteProDAL.saveNote(note); // darf next id nicht verändern
        expect(id).toBe(2);
    });

    it('should convert note into json', function () {
        var note = NoteFactory.createNote();

        note.titel = "Titel 42";
        note.text = "Text 42";
        var noteDateCreated = note.dateCreated.toString();

        var noteString = NoteProDAL.toJSON(note);
        expect(noteString).toBeDefined();
        expect(noteString.indexOf('"titel":"Titel 42"')).toBeTruthy();
        expect(noteString.indexOf('"text":"Text 42"')).toBeTruthy();
        expect(noteString.indexOf('"dateCreated":"' + noteDateCreated + '"')).toBeTruthy();
    });

});