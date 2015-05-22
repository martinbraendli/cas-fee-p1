/**
 * Jasmine spec's für NotePro
 */
describe("NotePro", function () {

    var noteFactory = new NoteFactory();

    /**
     * clear storage to have the same conditions each time
     */
    beforeEach(function() {
        localStorage.clear();
    });

    it('should get next note id', function () {
        var note = noteFactory.createNote();

        var id = NoteProController.getNextNoteId();
        expect(id).toBe(1);
        NoteProController.saveNote(note); // bekommt id = 0
        id = NoteProController.getNextNoteId();
        expect(id).toBe(2);
        NoteProController.saveNote(note); // darf next id nicht verändern
        expect(id).toBe(2);
    });

    it('should save note', function () {
        var note = noteFactory.createNote();

        var result = NoteProController.saveNote(note);
        expect(result).toBeNull();
    });

    it('should convert note into json', function () {
        var note = noteFactory.createNote();

        note.titel = "Titel 42";
        note.text = "Text 42";
        var noteDateCreated = note.dateCreated.toString();

        var noteString = NoteProController.toJSON(note);
        expect(noteString).toBeDefined();
        expect(noteString.indexOf('"titel":"Titel 42"')).toBeTruthy();
        expect(noteString.indexOf('"text":"Text 42"')).toBeTruthy();
        expect(noteString.indexOf('"dateCreated":"' + noteDateCreated + '"')).toBeTruthy();
    });

});