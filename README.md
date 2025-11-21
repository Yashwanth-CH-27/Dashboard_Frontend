# Dashboard Frontend

Live Demo: **https://dashboard-frontend-w29h.vercel.app/**  


This is the frontend application for a scalable web dashboard built using **React**, **Vite**, **Redux Toolkit**, **TailwindCSS**, and **DaisyUI**.  
It includes user authentication, a protected dashboard, profile view, and a complete Task Manager module with full CRUD operations.

---

## 🚀 Features

### 🔐 Authentication
- Sign Up / Sign In with backend validation  
- JWT stored inside **secure cookies** (HTTP-only on backend)  
- Logout via backend  
- Persistence of user through Redux  
- Protected routes using a custom `ProtectedRoute` component  

### 👤 User Profile
- Fetch user profile through `/profile/view`  
- Update profile using `/profile/edit`  
- Fully integrated with authentication cookie  

### 📋 Task Manager (CRUD)
- Create tasks (title, description, status, priority)  
- Edit tasks  
- Delete tasks  
- Search tasks by title/description  
- Filter tasks by status  
- Fully responsive UI  
- Global state stored in **Redux Toolkit** (`taskSlice`)  

### 🎨 UI & Design
- TailwindCSS + DaisyUI  
- Fully responsive  
- Dark theme (Black background + White text)  
- Clean dashboard layout  

---

## ⚙️ Backend Integration

All API requests use:

```js
withCredentials: true
