const { TranslationServiceClient } = require('@google-cloud/translate');
const translateClient = new TranslationServiceClient();

// Define the supported languages
const supportedLanguages = ['en', 'es', 'fr']; 

/**
 * Translates text to the supported languages.
 * @param {string} text 
 * @param {string} targetLanguage 
 * @returns {Promise<string>} 
 */
async function translateText(text, targetLanguage) {
  try {
    // Configure the translation request
    const [response] = await translateClient.translateText({
      parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
      contents: [text],
      targetLanguageCode: targetLanguage,
    });
    return response.translations[0].translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error('Translation failed');
  }
}

/**
 * Translates both the question and answer to multiple languages.
 * 
 * @param {string} question 
 * @param {string} answer 
 * @returns {Promise<Object>}
 */
async function getTranslations(question, answer) {
  try {
    const translations = {};

    for (const lang of supportedLanguages) {
      // Translate the question and answer to each supported language
      const translatedQuestion = await translateText(question, lang);
      const translatedAnswer = await translateText(answer, lang);

      // Add the translations to the translations object
      translations[lang] = {
        question: translatedQuestion,
        answer: translatedAnswer,
      };
    }

    return translations;
  } catch (error) {
    console.error("Error in translation process:", error);
    throw new Error('Translation process failed');
  }
}

module.exports = { getTranslations };
