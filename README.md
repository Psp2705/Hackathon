
# 🛡️ InsureGuide  
> **A Multilingual Insurance Coach & Policy Comparison Agent powered by Gemini AI**

![banner](https://via.placeholder.com/1000x250.png?text=InsureGuide+-+Insurance+AI+Assistant)

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)


---

## 📖 About the Project

**InsureGuide** is a GenAI-powered web app that solves two real-world problems in the insurance domain:

### 🧠 1. Insurance Literacy Coach (Multilingual)
Helps users understand complex insurance terms in **simple language** and in their **native language (Hindi, Marathi, etc.)**.

### 📊 2. Policy Comparison & Customization Tool
Suggests and compares insurance policies based on:
- Age, income, needs, riders
- Visual suitability scores
- Trust level indicators

✅ Built with **Gemini 1.5 Flash**, **Flask**, and **React + Bootstrap**.

---

## 🚀 Demo

### 🔗 Live Frontend:  
👉 [https://insuraguide.netlify.app/](https://insuraguide.netlify.app/)

### 🔗 Live Backend (API):  
👉 [https://insureguide.onrender.com](https://insureguide.onrender.com)

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🗣️ Multilingual Input | Users can ask insurance questions in Hindi, Marathi, etc. |
| 🤖 Gemini LLM | Uses Gemini 1.5 Flash for responses |
| 👶 "Explain Like I'm 15" | Simplified mode for beginners |
| 💯 Relevance Scoring | Based on budget, age, needs, riders |
| 📈 Visual Comparison | Policy cards + table + progress bars |
| 🇮🇳 Govt Schemes | Educates about PMJJBY, Ayushman Bharat, etc. |
| 🌙 Dark Mode UI | Modern responsive design with theme toggle |

---

## 🧰 Tech Stack

| Layer      | Tech Used |
|------------|-----------|
| 💡 LLM      | Gemini 1.5 Flash (via Google GenerativeAI) |
| 🧠 Backend | Flask + CORS + PyMuPDF + GoogleTrans |
| ⚛️ Frontend | React + React Router + Bootstrap 5 |
| ☁️ Hosting | Netlify (frontend), Render (backend) |

---

## 🛠️ Setup Instructions

### 🔁 Clone the Repository

```bash
git clone https://github.com/Psp2705/Hackathon.git
cd Hackathon
```

---

### 📦 Backend Setup (Flask + Gemini)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate (Windows)

pip install -r requirements.txt
```

#### 🔑 Create `.env` in `/backend/`

```
GEMINI_API_KEY=your_gemini_api_key_here
```

#### ▶️ Run Flask API

```bash
python app.py
```

---

### 💻 Frontend Setup (React)

```bash
cd frontend
npm install
```

#### 🔧 Create `.env` in `/frontend/`

```
REACT_APP_BACKEND_URL=hhttps://insureguide.onrender.com
```

#### ▶️ Start Dev Server

```bash
npm start
```

---

## 🖼️ Screenshots

### ✅ Insurance Q&A Interface  
![qna](https://github.com/Psp2705/Hackathon/blob/main/screenshots/qna.png?raw=true)

### 📊 Policy Comparison with Visual Scores  
![compare](https://github.com/Psp2705/Hackathon/blob/main/screenshots/comparison.png?raw=true)

### 📈 Visual Comparison Table  
![table](https://github.com/Psp2705/Hackathon/blob/main/screenshots/table.png?raw=true)



---

## 🗂️ Project Structure

```
/frontend          # React + Bootstrap frontend
│
├── /build # Production build folder (for Netlify)
│
├── /public
│ └── index.html # HTML entry point for React app
├── /src
│   ├── /pages
│   │   ├── InsuranceQA.jsx
│   │   └── PolicyComparison.jsx
│   └── App.jsx
│   └── index.js # React entry point
│
/backend           # Flask backend with Gemini integration
│
├── app.py
├── agent.py
├── policy_compare.py
├── policy_data.json
```

---

## 🔮 Future Enhancements

- ✅ WhatsApp/Telegram Bot integration
- 🧾 Auto-read real insurance PDFs and fill forms
- 🧠 Use LangChain + vector search for better policy matching
- 🔐 User login + personalized history

