const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");

//et all FAQs
router.get("/", faqController.getAllFAQs);

//create a new FAQ
router.post("/", faqController.createFAQ);

//update an FAQ by ID
router.put("/:id", faqController.updateFAQ);

//delete an FAQ by ID
router.delete("/:id", faqController.deleteFAQ);

module.exports = router;
