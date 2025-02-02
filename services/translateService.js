const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

const translateText = async (text, targetLang) => {
  try {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error(`Translation Error (${targetLang}):`, error);
    return text; // return original text
  }
};

module.exports = translateText;
