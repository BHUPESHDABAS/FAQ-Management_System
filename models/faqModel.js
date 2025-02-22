const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      type: Map,
      of: new mongoose.Schema({
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }, { _id: false }) // Disable _id for translation subdocuments
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FAQ", faqSchema);
