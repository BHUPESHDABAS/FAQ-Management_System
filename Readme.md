# Multilingual FAQ Management

This project provides a simple API for managing FAQs with multilingual support, allowing users to store questions and answers in multiple languages. The project is built using Node.js, Express, MongoDB, Redis, and integrates with the Google Translate API** for translations.

Features
- Store FAQs with questions and answers in multiple languages.
- APIs for CRUD operations on FAQs.
- Support for translating FAQs into different languages.
- Redis caching for better performance.

echnologies Used
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Cache: Redis
- Translation: Google Translate API
- Testing: Postman
- Environment Management: dotenv

# Project Structure

/multilingual-faq-manager
│── /config
│   ├── db.js                 
│   ├── redis.js             
│── /controllers
│   ├── faqController.js      
│── /models
│   ├── faqModel.js           
│── /routes
│   ├── faqRoutes.js          
│── /middlewares
│   ├── errorHandler.js       
│── /services
│   ├── translateService.js   
│── /tests
│   ├── faq.test.js
│── /admin-panel             
│── .env                
│── .gitignore                              
│── package.json         
│── server.js      
│── README.md   
