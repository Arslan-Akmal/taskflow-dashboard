# 🚀 TaskFlow Dashboard

TaskFlow is a role-based task management dashboard built with **Vue 3 + Firebase**. It allows users to register/login (including Google OAuth), create, assign, and manage tasks. Admins have additional privileges like assigning tasks to others.

## 🌐 Live Demo

🔗 [View Live App](https://taskflow-83dd3.web.app)

---

## 🛠️ Tech Stack

- **Frontend**: Vite + Vue 3 + Composition API
- **Auth**: Firebase Authentication (Email/Password + Google)
- **Database**: Firebase Firestore
- **Hosting**: Firebase Hosting

---

## 📦 Features

- 🔐 User Authentication (Email & Google)
- 👥 Role-based Access: Admin / Member
- ✅ Create, Edit, Delete Tasks
- 👨‍💼 Admins can assign tasks to users
- 🖥 Responsive UI (Mobile + Desktop)
- 🌍 Hosted on Firebase

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Arslan-Akmal/taskflow-dashboard.git
cd taskflow-dashboard
npm install

```

### 2. Firebase Configuration

Create a .env file in the root folder and add your Firebase config:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

## 3. Start the project

npm start
or
npm run dev

## 4. 📁 Project Structure

pgsql
Copy code
src/
assets/
components/
views/
router/
stores/
firebase.js
App.vue
main.js

## 5. 🙌 Author

Developed by Arslan Akmal
Email: raja.arslanakmal786@gmail.com
