#  URL Shortener Backend (Node.js + Express + NanoID)

This project is a simple URL shortening backend API built using **Node.js**, **Express**, and **NanoID**. It allows users to submit long URLs and receive a shortened version, which expires after a specified number of minutes.

---

##  Features

- Accepts long URLs and returns shortened versions.
- Each short URL has an expiry time in minutes.
- Redirects users from short URLs to original URLs.
- Shows proper error messages for expired or invalid links.
- Simple in-memory storage using JavaScript `Map`.

---

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [NanoID](https://github.com/ai/nanoid) – for generating unique short codes

---

## 📁 Project Setup Instructions

Follow the steps below to run this project on your local machine:

### Step 1: Initialize Project
```bash
mkdir url-shortener-nodb
cd url-shortener
npm init -y

### Step 2: Install Dependencies
npm install express nanoid

### Step 3: Create Files
Create a file named server.js in the project root:


### Step 3: Run the Project
Use the following command to start your server:
node server.js


Output:
URL Shortener service is running at http://localhost:8000


In PostMan : POST 

Request :
{
  "url": "https://www.linkedin.com/in/vasanth-kumar-reddy-1988b5249/",
  "validity": 30,
  "shortCode": "Vasanth-kumar-reddy"
}

Response:
{
    "shortLink": "http://localhost:8000/5zCNh2",
    "expiry": "2025-06-23T08:36:50.046Z"
}

Step 5 : 
npx create-react-app url-shortener-frontend
cd url-shortener-frontend

Step 6: Install Axios
npm install axios
### Step 7: Create the React App
Replace the contents of `src/App.js` with the following code:
```javascript 




