const FAQ = require("../models/faqModel");
const redisClient = require("../config/redis");
const translateText = require("../services/translateService");

// Create FAQ
const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Translate the FAQ into multiple languages
    const languages = ["hi", "es", "fr"];
    const translations = {};
    for (const lang of languages) {
      translations[lang] = await translateText(question, lang);
    }

    const newFAQ = new FAQ({ question, answer, translations });
    await newFAQ.save();

    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get FAQs with language filter
const getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";

    // Check Redis cache
    const cachedFAQs = await redisClient.get(`faqs:${lang}`);
    if (cachedFAQs) return res.json(JSON.parse(cachedFAQs));

    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => ({
      question: faq.translations[lang] || faq.question,
      answer: faq.answer,
    }));

    // Cache the response
    await redisClient.set(`faqs:${lang}`, JSON.stringify(translatedFAQs), "EX", 3600);

    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFAQ, getFAQs };
