const FAQ = require("../models/faqModel");
const redisClient = require("../config/redis");
const translateText = require("../services/translateService");
const { getTranslations } = require("../services/translateService");


// Create FAQ
const getAllFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json({ faqs });
  } catch (err) {
    next(err); // pass errors to the error handler middleware
  }
};


//Create a new FAQ (with translation)
async function createFAQ(req, res) {
  try {
    const { question, answer } = req.body;

    // Get translations for the question and answer
    const translations = await getTranslations(question, answer);

    // Create the FAQ object
    const newFAQ = new FAQ({
      question,
      answer,
      translations,
    });

    // Save the FAQ to the database
    await newFAQ.save();

    // Send the response
    res.status(201).json({
      message: "FAQ created successfully",
      faq: newFAQ,
    });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ message: "Error creating FAQ", error });
  }
}

// Update FAQ
const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, languages = ["en"] } = req.body;

    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // Update the FAQ in the primary language (English)
    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;

    // Update translations for the other languages
    const translations = await getTranslations(question, answer); // Use the translation function here
    faq.translations = translations;

    await faq.save();
    res.status(200).json({ message: "FAQ updated successfully", faq });
  } catch (err) {
    console.error("Error updating FAQ:", err);
    res.status(500).json({ message: "Error updating FAQ", err });
  }
};


// Delete FAQ
const deleteFAQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (err) {
    next(err); // pass errors to the error handler middleware
  }
};

module.exports = {
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ
};
