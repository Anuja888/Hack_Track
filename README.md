# HackTrack 🚀
### Centralized College Hackathon Event & Attendance Management Portal

HackTrack is a production-ready, full-stack MERN application built for college engineering departments (like Vasavi College of Engineering) to streamline student registrations, verify team permissions, enforce a multi-stage event attendance lifecycle, auto-generate official PDF certificates with Cloudinary & Puppeteer, and present visual institutional audit analytics via Chart.js.

---

## 🌟 Key Features

### 1. Role-Based Access Control (RBAC) System
- **Admin / Head of Department (HOD)**: Approves or rejects new hackathon proposals, broadcasts official policy directives, and monitors college-wide statistics via the Oversight Analytics Dashboard.
- **Organizer / Coordinator**: Creates new hackathon proposals, reviews student applications, manages the 4-stage attendance pipeline, and triggers certificate generation.
- **Participant / Student**: Browses active hackathons, dynamically forms teams, generates digital permission letters, uploads participation results, and downloads earned PDF certificates.

### 2. Event Proposals Approval Workflow
- When coordinators publish a hackathon, it defaults to a **Pending** state.
- HODs see a notification badge of pending requests and can **Approve** (making the event active for students) or **Reject** with a formal reason.
- Automated email alerts are delivered to coordinators when events are approved or rejected.

### 3. Sequential 4-Stage Attendance Lifecycle
Attendance progresses in a strict sequence:
`Registered ➔ Checked-In ➔ Present ➔ Certificate Issued`
- Coordinators advance student stages one-by-one; skipping states or reversing is blocked by backend validation rules.
- Visual stepper components are displayed on both Student and Coordinator dashboards.

### 4. Automated HTML-to-PDF Certificates
- When coordinators finalize an event, the system fetches all participants marked as **Present**.
- It dynamically compiles a premium landscape HTML certificate, converts it to a PDF using **headless Puppeteer**, uploads it to **Cloudinary**, and delivers it via **Gmail SMTP (Nodemailer)** with the PDF attached.

### 5. Institutional Oversight Analytics Dashboard
A real-time analytics panel displaying:
1. **Total Registered vs Attended Dispersion** (Bar Chart)
2. **Event Distribution by Status** (Pie Chart)
3. **Enrollment Volume Trend Over Last 7 Days** (Line Chart)
4. **Top 3 Most Attended Hackathons** (Horizontal Bar)
5. **Certificate Delivery Success Rate** (Donut Chart)
6. **Average Participants per Event** (Stat Card)

---

## 🛠️ API Documentation

All routes require JWT authorization unless stated otherwise. Include `x-auth-token: <JWT_TOKEN>` in the headers.

| Endpoint | Method | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `/api/auth/login` | `POST` | Public | Authenticates credentials and issues a JWT token. |
| `/api/students` | `GET` | Yes | Retrieves all students sorted by batch year. |
| `/api/students/:rollNo` | `GET` | Yes | Retrieves profile details of a student by Roll No. |
| `/api/hackathons` | `GET` | Yes | Returns all active/completed hackathons. |
| `/api/hackathons` | `POST` | Organizer | Submits a new hackathon request (defaults to pending). |
| `/api/hackathons/pending` | `GET` | Admin | Retrieves event proposals awaiting HOD approval. |
| `/api/hackathons/:id/approve` | `PATCH` | Admin | Approves a proposed event and sends an email alert. |
| `/api/hackathons/:id/reject` | `PATCH` | Admin | Rejects an event with a reason and sends an email alert. |
| `/api/requests` | `POST` | Student | Submits a team request for participation permission. |
| `/api/requests` | `GET` | Yes | Get requests history (filtered for students, full for coordinators). |
| `/api/requests/:id` | `PUT` | Yes | Approves requests, auto-creating student/team `Participant` records. |
| `/api/attendance/event/:eventId`| `GET` | Organizer | Gets all participants and their stage state for an event. |
| `/api/attendance/my` | `GET` | Student | Gets participant attendance records for the student. |
| `/api/attendance/:participantId/advance` | `PATCH` | Organizer | Advances participant attendance status sequentially. |
| `/api/certificates/generate/:eventId` | `POST` | Organizer | Finalizes an event, generates, uploads, and emails PDFs. |
| `/api/analytics/dashboard` | `GET` | Admin | Computes and returns the 6 institutional analytics metrics. |

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (Atlas or Local)
- Cloudinary credentials
- Gmail account with App Passwords enabled

### 1. Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hacktrack
JWT_SECRET=your_jwt_signing_secret_key

# Cloudinary Storage Configurations
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# NodeMailer Mailer Configurations
EMAIL_USER=your_gmail_account@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
```

### 2. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Run Seed Script
```bash
# Seed default hackathons & users
cd backend
node seed_students.js
node seed.js
```

### 4. Run Development Servers
```bash
# Run backend server
cd backend
npm run dev

# Run frontend client (Vite)
cd ../frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🔗 Live Demo
- **Frontend Client**: [https://hacktrack-frontend.vercel.app](https://hacktrack-frontend.vercel.app)
- **Backend Server**: [https://hacktrack-backend.onrender.com](https://hacktrack-backend.onrender.com)
