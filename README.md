# MERN Authentication App Using JWT

🎥 Demo Preview

🔗 [Live Demo](https://auth-mern-application-ui.vercel.app)
🔗 [Recording](https://github.com/sajjalf23/Auth-MERN-Application/blob/main/Video%20Recording%20.mp4)
🔗 [Backend](https://auth-mern-application-api.vercel.app)  

A full-stack **Authentication System** built with **MERN (MongoDB, Express, React, Node.js)**.  
Supports **user registration, login, email verification, and password reset** with JWT-based authentication.

---

## 🌟 Features

- User Registration & Login  
- Email Verification after registration  
- Password Reset via Email OTP  
- Secure authentication using **JWT tokens**  
- RESTful API built with **Express & Node.js**  
- Frontend with **React.js** and responsive UI  
- MongoDB Atlas for database  
- Fully deployable on **Vercel**  

---

## 🛠 Tech Stack

- **Frontend:** React, Axios, TailwindCSS / Bootstrap / CSS, React-Toastify, React-Router-Dom
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT, bcrypt  
- **Email Service:** Brevo 
- **Deployment:** Vercel  

---

## 🔧 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/auth-mern-app.git
cd auth-mern-app

## 🔑 .env files

**Frontend**
VITE_BACKEND_URL='http://localhost:*****'
**Backend**
MONGODB_URL="mongodb+srv://***:***@cluster0.sggdamr.mongodb.net"
JWT_SECRET="*****"
NODE_ENV='*****'
SMTP_USER=*****@smtp-brevo.com
SMTP_PASS=********
SENDER_EMAIL=*****@gmail.com

---

This project uses **HttpOnly** cookies to store JWT tokens.
Because the frontend and backend are deployed on different subdomains (Vercel).
**Opera** / Firefox / Edge: Allow these cookies in this setup → Work normally.
Google Chrome (Desktop & Mobile): Blocks third-party cookies by default → Login succeeds but /api/user/data fails with 401 Unauthorized.
so it is requested to **use opera** instead , avoid Google Chrome





