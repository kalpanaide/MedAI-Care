# MedAI Care

An AI-powered healthcare platform built to make basic medical guidance, appointment booking, and health record management more accessible — especially for users in areas with limited access to healthcare infrastructure.

**Live App:** https://med-ai-care-roan.vercel.app

## Features

- **Patient & Doctor Authentication** — Secure registration and login with bcrypt password hashing
- **Forgot/Reset Password** — Email-based password recovery
- **Appointment Booking** — Patients can book appointments with doctors; doctors can manage appointment status
- **AI Symptom Checker** — Get an instant, AI-generated assessment of symptoms with severity level and guidance
- **Medicine Reminders** — Set and track medication schedules, with offline access to saved reminders
- **Digital Health Records** — Upload and store medical reports and documents securely (Cloudinary)
- **Emergency SOS** — One-tap access to nearby hospitals using live location
- **Mental Health Check-in** — A supportive AI chat companion with voice responses
- **Prescription Verification** — Doctors generate QR-coded prescriptions that anyone can scan and verify instantly
- **Multilingual Support** — English and Hindi language toggle
- **Low-Connectivity Mode** — Network status detection and offline caching for key features

## Tech Stack

**Frontend:** React (Vite), CSS
**Backend:** Node.js, Express
**Database:** MongoDB Atlas
**AI:** Groq API (Llama models)
**File Storage:** Cloudinary
**Email:** Resend
**Deployment:** Vercel (frontend), Render (backend)

## Project Structure
MedAI-Care/
├── client/ React frontend
│ └── src/
│ ├── pages/ Individual feature pages
│ └── App.jsx Main app and routing
├── server/ Express backend
│ ├── models/ MongoDB schemas
│ └── routes/ API endpoints


## Running Locally

**Backend:**
cd server
npm install
npm run dev

**Frontend:**
cd client
npm install
npm run dev


You'll need a `.env` file in the `server` folder with your own MongoDB, Groq, Cloudinary, and Resend credentials.

## Author

Kalpana Ide