# 🚦 Smart Traffic Management System

A **Smart Traffic Management System** built using the **MERN Stack with AI Microservices** to monitor, analyze, and manage urban traffic in real time.
The system provides **live traffic monitoring, congestion detection, analytics dashboards, and AI-powered traffic analysis**.

This project demonstrates a **modern full-stack architecture** combining:

* React Frontend
* Node.js + Express Backend
* Python AI Microservice
* MongoDB Database
* Real-time communication using WebSockets

vercel Live Link :- https://smart-traffic-management-system-o71.vercel.app/

# 📌 Project Architecture

```
Frontend (React + Leaflet)
        │
        │ REST APIs
        ▼
Backend (Node.js + Express)
        │
        │ MongoDB
        ▼
Database

Backend ↔ AI Microservice (Python / FastAPI)
        │
        ▼
Traffic Analysis & Vehicle Detection
```

---

# ✨ Key Features

## 🚦 Traffic Monitoring

* Real-time traffic map visualization
* Road congestion monitoring
* Traffic density indicators
* Traffic alerts

## 📊 Admin Dashboard

* Traffic analytics dashboard
* Manage traffic signals
* Monitor traffic congestion
* System notifications

## 🗺 Live Traffic Map

* Map visualization using **Leaflet**
* Real-time vehicle locations
* Traffic heatmap
* Road congestion indicators

## 👥 Citizen Portal

* Public traffic map
* Route suggestions
* Accident alerts
* Report traffic incidents

## 🤖 AI Traffic Analysis

* AI microservice for traffic analysis
* Vehicle detection support
* Traffic density estimation
* Integration with backend APIs

## 🔔 Real-Time Notifications

* Traffic congestion alerts
* Accident detection alerts
* Emergency vehicle priority

---

# 🛠 Tech Stack

## Frontend

* React.js (Vite)
* Tailwind CSS
* Leaflet Maps
* Axios
* React Router
* Chart.js

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.io

## AI Microservice

* Python
* FastAPI / Flask
* OpenCV
* NumPy
* AI / Computer Vision modules

## Database

* MongoDB

## Tools

* Git & GitHub
* VS Code
* Postman
* Nodemon

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/smart-traffic-management-system.git
cd smart-traffic-management-system
```

---

# 🔧 Backend Setup

```
cd backend
npm install
```

Create `.env` file

```
PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

Run backend server

```
npm run dev
```

Backend runs on

```
http://localhost:5001
```

---

# 💻 Frontend Setup

Open new terminal

```
cd frontend
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🤖 AI Microservice Setup

```
cd ai-microservice
pip install -r requirements.txt
```

Run AI service

```
python app.py
```

AI service runs on

```
http://localhost:8000
```

---


# 🚀 Deployment

Frontend

* Vercel
* Netlify

Backend

* Render
* Railway
* AWS

Database

* MongoDB Atlas

AI Service

* Docker / AWS / GCP

---

# 📊 Future Improvements

* AI traffic prediction
* Number plate recognition
* Smart traffic signals
* Accident detection using AI
* IoT sensor integration
* Mobile application

---

# 👨‍💻 Author

**Piyush Kumar**

Full Stack Developer
MERN Stack | JavaScript | React | Node.js

If you found this project useful, please consider **starring the repository**.
