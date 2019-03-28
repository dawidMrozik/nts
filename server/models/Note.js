const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    note: {
      type: String,
      required: true
    },
    pass: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = Note = mongoose.model('Note', NoteSchema);
