var store = require("../services/noteStore.js");

function publicSaveNote(req, res) {
    var note = req.body;    //get note from request

    var callback = function (err, note) {
        res.format({
            'application/json': function () {
                res.send(note._id)
            }
        })
    };
    store.saveNote(note, callback)
}

/**
 * read notes from store and send it to the response
 */
function publicReadAllNotes(req, res) {
    var callback = function (err, notes) {
        res.format({
            'application/json': function () {
                // use id instead of _id in client
                for (var i = 0; i < notes.length; i++) {
                    notes[i].id = notes[i]._id;
                }

                res.json(notes)
            }
        })
    };
    store.readNotes(callback);
}

function publicGetNote(req, res) {
    var callback = function (err, note) {
        res.format({
            'application/json': function () {
                // use id instead of _id in client
                note.id = note._id;
                res.json(note)
            }
        })
    };
    store.getNote(req.params.id, callback);
}

module.exports = {
    saveNote: publicSaveNote,
    readNotes: publicReadAllNotes,
    getNote: publicGetNote
};