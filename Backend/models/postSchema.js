const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  contentType: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
