const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      type: Map,
      of: String, // Stores translations as { "hi": "हिंदी में प्रश्न", "fr": "Question en français" }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FAQ", faqSchema);
