var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

// get / --> send all notes from database
router.get("/", notes.readNotes);
// get /<id> --> get note by given id
router.get("/:id", notes.getNote);
// POST / --> save note
router.post("/", notes.saveNote);

module.exports = router;