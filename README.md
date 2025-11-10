# React + Vite

🧑‍💼 Jobby App

A responsive job search platform built using React.js, where users can log in, browse job listings, view job details, and apply filters such as employment type and salary range.

🔗 Live Demo: Jobby App on Vercel

👤 Test Credentials:

Username: rahul
Password: rahul@2021

🚀 Features

✅ Secure Login & Logout using JWT authentication
✅ Protected Routes (only accessible when logged in)
✅ Fetches real-time job data from APIs (https://apis.ccbp.in/)
✅ Filter jobs by employment type, salary range, and search keyword
✅ Responsive design for all devices
✅ Job details page with similar job suggestions
✅ Loader and failure views for better user experience

🧰 Tech Stack
Category	Technology
Frontend	React.js, JSX, CSS3
Routing	React Router DOM (v6)
Icons	React Icons
State Management	Component State (Class Components)
Authentication	js-cookie
Deployment	Vercel
📦 Installation and Setup

Follow these steps to run the project locally:

Clone the repository

git clone https://github.com/your-username/jobby-app.git


Navigate into the project folder

cd jobby-app


Install dependencies

npm install


Start the development server

npm start


Open your browser

http://localhost:3000

📁 Folder Structure
jobby-app/
│
├── src/
│   ├── components/
│   │   ├── Login/
│   │   ├── Home/
│   │   ├── Jobs/
│   │   ├── JobDetails/
│   │   ├── Header/
│   │   ├── ProfileDetails/
│   │   └── NotFound/
│   │
│   ├── App.js
│   ├── index.js
│   └── App.css
│
├── package.json
└── README.md

🔐 Environment Variables (if any)

If your app uses environment variables, create a .env file in the root:

REACT_APP_API_BASE_URL=https://apis.ccbp.in

🧪 Test Credentials

Use these credentials to explore the app:

Username	Password
rahul	rahul@2021
🧑‍💻 Developer

Arjun
Frontend Developer | React Enthusiast
💼 LinkedIn
 • 🐙 GitHub

📸 Screenshots (Optional)

Add screenshots or a GIF of your app UI here.

📝 License

This project is licensed under the MIT License.
