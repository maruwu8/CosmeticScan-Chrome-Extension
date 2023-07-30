# 💄 CosmeticScan Chrome Extension 💄

CosmeticScan is a powerful assistant that provides information about skincare ingredients. It empowers users to analyze beauty product ingredients and learn their benefits with the help of OpenAI's GPT-3.5 Turbo API. Simply click on the extension icon while visiting a Notino beauty product page to get a detailed analysis of the product's ingredients. 🧴

## 🚀 Objective 🚀

The main **objective** of the CosmeticScan Chrome Extension is to **empower users with knowledge** about the ingredients present in beauty products. By integrating the OpenAI GPT-3.5 Turbo API, the extension provides **concise descriptions for each ingredient**, giving users **valuable insights into the potential effects on their skin**. 🌟

![Extension-Usage-Eg1](https://github.com/maruwu8/CosmeticScan-Chrome-Extension/assets/130385138/341e72b3-5a6c-4295-b73b-2b80866b0156)

![Extension-Usage-Eg2](https://github.com/maruwu8/CosmeticScan-Chrome-Extension/assets/130385138/bfdb2536-b76a-4ed5-97a7-da1d2a69c98c)

## 💡 Features 💡

- Scrapes ingredients from product pages on Notino websites.
- Utilizes OpenAI's GPT-3.5 Turbo API to fetch detailed descriptions for each ingredient.
- Displays a user-friendly interface that presents ingredient information in an easily consumable manner.

### 🛠️ Technologies Used 🛠️

The CosmeticScan Chrome Extension is built using the following cutting-edge technologies:

- **React**: A modern JavaScript library for building user interfaces, creating an intuitive and responsive frontend. The extension is developed using React with TypeScript for enhanced type safety and productivity.

- **Express**: A fast and minimalist backend web application framework for building the server. The Express server handles communication between the frontend and the external APIs.

- **Python**: Utilized with BeautifulSoup for web scraping, enabling the extraction of ingredient data from Notino product pages. The Python script efficiently parses the HTML and extracts relevant information.

- **OpenAI GPT-3.5 Turbo API**: An advanced natural language processing API used to generate ingredient descriptions. The extension sends requests to the API, which returns detailed information about each skincare ingredient.

- **Axios**: A popular HTTP client for JavaScript and Node.js. It is used to make API requests from both the frontend and the backend, allowing seamless communication with external services.

## Server Usage (Important)

The extension uses a local backend server to handle CORS (Cross-Origin Resource Sharing) policy restrictions. Since web browsers enforce the same-origin policy, the extension cannot directly access data from Notino websites due to CORS limitations. To run the extension locally, you must set up your own server on localhost. The server provided in the repository (`server.json`) is a basic Express server that scrapes data from Notino websites and communicates with the OpenAI API. Follow the steps in the "Getting Started" section to run the server.

## Getting Started

### Installation

1. Clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Turn on Developer Mode in the top-right corner of the Extensions page.
4. Click "Load Unpacked" and select the folder where you cloned the repository.

### Usage

1. Start the backend server by running the provided `server.json` on your localhost.
2. Navigate to a product page on any Notino website.
3. Click on the CosmeticScan extension icon in your Chrome toolbar.
4. The extension will communicate with the local backend server to scrape the ingredients and display information about each ingredient using the GPT-3.5 Turbo API.

### 🤖 How It Works 🤖

The extension's frontend is built using React with TypeScript, and it makes use of React hooks such as `{ useState, useEffect }` to manage state and handle side effects. The state enables the dynamic display of ingredient descriptions fetched from the backend.

The frontend interacts with the backend server implemented in Express. The backend, written in Node.js with Axios, leverages Python and BeautifulSoup to scrape ingredient data from Notino product pages. Axios is used to make API calls from both the frontend and the backend, ensuring smooth communication between different parts of the application.

The Python script scrapes ingredient data from Notino product pages, and the backend serves as an intermediary, processing the scraped data and communicating with the OpenAI GPT-3.5 Turbo API to fetch ingredient descriptions. The processed data is then sent back to the frontend, where it is displayed to the user in an easy-to-read format.

## ⏳ Rate Limiting ⏳

To comply with OpenAI API rate limits (as I was using the free 5$ grant of the OpenAI API), the extension is configured to make a maximum of 3 requests per minute to the GPT-3.5 Turbo API. If the rate limit is reached, the extension waits for 1 minute before continuing to fetch more ingredient descriptions.

## 🚀 Limitations and Future Enhancements 🚀

- The extension currently focuses on scraping data from Notino websites only. Expanding its support to other beauty product websites would be a valuable addition.
- Enhancing the user interface with more visual elements and additional information could improve the overall user experience.
- Implementing caching mechanisms for frequently accessed ingredients can reduce API calls and improve response times.

## 🎉 Conclusion 🎉

CosmeticScan is an innovative Chrome extension that empowers users with valuable insights into beauty product ingredients. By leveraging the OpenAI GPT-3.5 Turbo API, the extension provides concise descriptions for each ingredient, assisting users in making informed decisions about their skincare routine. Its integration of scraping, backend, and frontend technologies showcases a well-rounded project that can be a valuable addition to any skincare enthusiast's arsenal.

## 📜 License 📜

This project is licensed under the [MIT License](LICENSE).
