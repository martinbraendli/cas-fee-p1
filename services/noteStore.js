var Datastore = require('nedb');
var db = new Datastore({filename: './data/order.db', autoload: true});

function publicSaveNote(note, callback) {
    // check if note exists

    var callbackUpdate = function (err, existingNote) {
        if (existingNote) {
            db.update({_id: existingNote._id}, note, function (err, newNote) {
                if (callback) {
                    callback(err, newNote);
                }
            });
        } else {
            db.insert(note, function (err, newNote) {
                if (callback) {
                    callback(err, newNote);
                }
            });
        }
    };
    publicGetNote(note.id, callbackUpdate);

}

/**
 * read all notes from database
 */
function publicReadAllNotes(callback) {
    db.find({}, function (err, notes) {
        if (callback) {
            callback(err, notes);
        }
    })
}

function publicGetNote(id, callback) {
    db.find({_id: id}, function (err, notes) {
        if (callback) {
            var note = notes[0];
            callback(err, note);
        }
    })
}

module.exports = {
    saveNote: publicSaveNote,
    readNotes: publicReadAllNotes,
    getNote: publicGetNote
};