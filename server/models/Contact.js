const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    service: { type: String, required: true },
    budget: { type: String },
    projectDetails: { type: String, required: true },
    status: { type: String, enum: ['new', 'reviewed', 'contacted'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
