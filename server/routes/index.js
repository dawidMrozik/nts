const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.post('/', (req, res) => {
  const pass = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5)
    .toUpperCase();

  const newNote = new Note({
    note: req.body.note,
    pass
  });

  newNote.save().then(newNote => res.json(newNote));
});

router.post('/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(foundNote => {
      if (foundNote.pass === req.body.pass) {
        res.json(foundNote);
      } else {
        res.json({ message: 'Password not correct' });
      }
    })
    .catch(err =>
      res.status(404).json({ message: 'Note with given id not found :(' })
    );
});

router.patch('/:id', (req, res) => {
  Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, note) => {
      if (err) return res.status(500).json(err);
      return res.json(note);
    }
  );
});

module.exports = router;
