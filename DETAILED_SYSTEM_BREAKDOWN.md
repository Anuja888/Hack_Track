# HackTrack: Detailed System Breakdown

Welcome to the complete code architecture of HackTrack! This document explains the **MERN Stack** (MongoDB, Express, React, Node.js) implementation file by file so you can understand where everything lives, how it talks to each other, and what each line of code is trying to achieve.

---

## 1. Project Structure

HackTrack is split into two major halves: the Backend (the engine & brain) and the Frontend (the visual interface).

```
HackTrack/
│
├── backend/                   # Node.js + Express Engine
│   ├── .env                   # Secret keys and database link
│   ├── server.js              # The main backend entry point
│   ├── middleware/            # Security gates
│   │   └── auth.js            # JWT Token verifier function
│   ├── models/                # Database Schemas (Blueprints)
│   │   ├── User.js            # Login accounts mapping
│   │   ├── Hackathon.js       # Hackathon posts mapping
│   │   ├── Request.js         # Student applications mapping
│   │   ├── Feedback.js        # HOD instructions mapping
│   │   └── TeamPost.js        # Team formation board mapping
│   └── routes/                # API Endpoints (The Doors)
│       ├── auth.js            # Handles /api/auth (Login & Registration)
│       ├── hackathons.js      # Handles /api/hackathons (Fetching events)
│       ├── requests.js        # Handles /api/requests (Applications)
│       ├── students.js        # Handles /api/students (Registry)
│       ├── feedbacks.js       # Handles /api/feedbacks (Directives)
│       └── teamPosts.js       # Handles /api/team-posts
│
└── frontend/                  # React Visual UI
    ├── index.html             # The empty web page React renders into
    ├── package.json           # Frontend dependencies
    └── src/                   # Source folder for React code
        ├── main.jsx           # Mounts React to index.html
        ├── App.jsx            # The Main Router (Connects all URLs)
        ├── index.css          # Global styling (Glassmorphism, animations)
        ├── context/           # Global State Management
        │   └── AuthContext.jsx# Remembers the logged-in user everywhere
        ├── components/        # Reusable UI Blocks
        │   ├── FlashNews.jsx         # Scrolling top bar
        │   ├── LetterPreviewModal.jsx# The popup formal HOD letter box
        │   ├── StudentDashboard.jsx  # Isolated student view logic
        │   ├── CoordinatorDashboard.jsx# Isolated coord view logic
        │   ├── AttendanceDashboard.jsx # Isolated attendance view logic
        │   └── HODDashboard.jsx      # Isolated HOD view logic
        └── pages/             # Major Web Pages
            ├── Home.jsx       # The / URL (Public landing page)
            ├── Login.jsx      # The /login URL (Role-based login system)
            └── Dashboard.jsx  # The /dashboard URL (Wraps the components)
```

---

## 2. Backend (Node.js + Express)

Where Node.js code is written: Everything inside `/backend`.
The backend provides **APIs (Application Programming Interfaces)**. React calls these APIs to get or save data.

### `server.js`
*   **What it does:** It is the heart of the backend. You run `node server.js` to turn it on.
*   **Why it exists:** It listens on Port `5000` for internet traffic coming from React.
*   **Code inside:** It imports `express` to build the server, `mongoose` to connect to MongoDB, and then it mounts all the files from the `/routes` folder using `app.use('/api/...', ...)`.

### `models/` (e.g., `User.js`, `Request.js`)
*   **What it does:** Defines what data is allowed to be saved in MongoDB.
*   **Why it exists:** MongoDB accepts anything. Mongoose Models act like strict border patrol. If `User.js` says a user must have a `role`, MongoDB will reject any user trying to save without a role.
*   **Code inside:** `const mongoose = require('mongoose'); const UserSchema = new mongoose.Schema({ username: String, ... }); module.exports = mongoose.model('User', UserSchema);`

### `routes/` (e.g., `hackathons.js`, `auth.js`)
*   **What it does:** The specific logic for a URL path.
*   **Why it exists:** Keeps `server.js` from becoming 5,000 lines long.
*   **Code inside:** 
    *   `router.get('/', async (req, res) => ...)`: Code here runs when React asks to view data.
    *   `router.post('/', async (req, res) => ...)`: Code here runs when React submits new data.
    *   It uses Mongoose Models. E.g., `const events = await Hackathon.find(); res.json(events);` fetches database events and sends them as JSON to React.

### `middleware/auth.js`
*   **What it does:** Checks if a user is legally logged in before letting them use a private route.
*   **How it connects:** Private routes in `/routes` import this file and slap it on the door like a lock. E.g., `router.post('/', auth, async (req, res) => ...)` means "Run `auth` first, then run the route code."

### `.env`
*   **What it does:** Stores secret configuration.
*   **Code inside:** `MONGO_URI=mongodb+srv://...` and `JWT_SECRET=mysecretkey`. It should never be uploaded to GitHub.

---

## 3. MongoDB (Database Layer)

**Where MongoDB is connected:** 
Inside `backend/server.js`, you'll see:
```javascript
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
```

**How Mongoose is used & Data flow:**
1. Mongoose connects Node.js to your cloud MongoDB server.
2. In MongoDB, data is stored as a "Collection" of "Documents". A Document looks exactly like Javascript Object Notation (JSON), e.g., `{ "title": "Hackathon 1", "prize": "1000" }`.
3. When Node.js wants data, it says `Hackathon.find()`. Mongoose travels to the MongoDB cloud, pulls the JSON documents, and hands them back to Node.js.

---

## 4. Frontend (React)

Where React code is written: Everything inside `/frontend`.
React runs entirely inside the user's Google Chrome / Browser. 

### `App.jsx`
*   **What it controls:** The "Router" or the map of the website.
*   **How UI is structured:** It uses `<Routes>` to map URLs to Pages. For example, if the URL is literally just `/`, it draws `<Home />`.

### `context/AuthContext.jsx`
*   **What it controls:** The user's memory.
*   **Why it exists:** If a student logs in on `/login` and navigates to `/dashboard`, React normally forgets everything between pages. Context stores the User's `token` in the browser's `localStorage` so they stay logged in permanently until they hit logout.

### `pages/Login.jsx` & `pages/Home.jsx`
*   **What they control:** Massive full-page chunks of visuals.
*   **How they talk to backend:** They import `axios`. In `Login.jsx`, when the user hits "Login", it triggers:
    `axios.post('http://localhost:5000/api/auth/login', { username, password })`
    This sends the typed credentials to the Node.js Waiter.

### `components/` (e.g., `StudentDashboard.jsx`)
*   **What they control:** Specific features to prevent `Dashboard.jsx` from becoming massive. `StudentDashboard` exclusively draws the buttons and UI unique to a student.

### `index.css`
*   **What it does:** It makes things pretty. All the "Glassmorphism" transparent blurred backgrounds, the floating gradients, and the scrolling text logic is defined here using pure CSS.

---

## 5. Full Stack Flow (VERY IMPORTANT)

### Flow 1: A user tries to Login
1. **React:** The user is on `/login`, enters their roll number and clicks submit.
2. **React:** `axios.post('http://localhost:5000/api/auth/login', { username: '1602-24-733-100', password: 'vce' })` wraps this data into JSON and sends it over the internet.
3. **Node.js:** `routes/auth.js` intercepts the request. It extracts `username` and `password`.
4. **Node.js → MongoDB:** Uses Mongoose -> `User.findOne({ username: '1602-24-733-100' })`. 
5. **MongoDB:** Checks its vault and returns the matching user document to Node.js.
6. **Node.js:** Node uses `bcrypt` to compare the typed 'vce' with the database's hashed password. It matches!
7. **Node.js:** Generates a secure JSON Web Token (JWT) using `jsonwebtoken` and sends `res.json({ token, user })` back over the internet.
8. **React:** React receives the token, calls `AuthContext` to save it, and automatically navigates the user's browser away from `/login` directly to `/dashboard`.

### Flow 2: Fetching Hackathons (on Landing Page)
1. **React:** A user visits the main URL (`/`). `Home.jsx` is rendered.
2. **React:** `Home.jsx` has a `useEffect` hook. This acts as an auto-trigger. As soon as the page loads, it silently fires `axios.get('http://localhost:5000/api/hackathons')`.
3. **Node.js:** `server.js` routes the request to `routes/hackathons.js`.
4. **Node.js → MongoDB:** Inside `hackathons.js`, it triggers `Hackathon.find()`.
5. **MongoDB:** Grabs the array of published hackathon documents and returns them.
6. **Node.js:** Sends `res.json(events)` straight to the frontend.
7. **React:** `Home.jsx` receives the array (e.g. 4 hackathons). It runs `setHackathons(data)` which magically redraws the HTML on the screen instantly, generating boxes for all 4 hackathons.

---

## 6. Where Everything is Used & Why JSON?

*   **Node.js**: Written in `backend/`. This executes mathematically on your computer's terminal (or a cloud server like AWS/Heroku).
*   **React**: Written in `frontend/src/`. This compiles down to simple HTML/JavaScript and physically downloads to and runs inside the user's web browser.
*   **MongoDB**: An independent cloud database hosted by a company called Atlas.
*   **Why JSON?**: JSON (JavaScript Object Notation) is the universal translator. React speaks JavaScript. Node.js speaks Javascript. MongoDB speaks JSON. Because they all share this format, passing data between a React dropdown menu, a Node server, and a MongoDB cloud vault is flawless and Native.

---

## 7. Simple Architecture Diagram

```ascii
                      +-------------------+
                      |   REACT FRONTEND  |
                      |   (Browser / UI)  |
                      +---------+---------+
                                |
                   (Axios HTTP API Calls / JSON)
                                |
                      +---------v---------+
                      | NODE.JS & EXPRESS |
                      |  (Security/Logic) |
                      +---------+---------+
                                |
                    (Mongoose Queries / JSON)
                                |
                      +---------v---------+
                      |   MONGODB ATLAS   |
                      |   (Cloud Memory)  |
                      +-------------------+
```
