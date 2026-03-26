// --- STATE & MOCK DATA ---
const STUDENT_DB = {
    // 1st Year (2025 Batch)
    "1602-25-737-001": "AARAV REDDY KOTHAPALLI", "1602-25-737-002": "ANANYA SREE GUDIPATI", "1602-25-737-003": "ABHINAV KUMAR REDDY",
    "1602-25-737-004": "AMRUTHA LAKSHMI PONNALA", "1602-25-737-005": "ARJUN VARMA THOTA",
    "1602-25-737-006": "BHAVYA SRI MANDADI", "1602-25-737-007": "CHANDANA REDDY KASIREDDY", "1602-25-737-008": "DARSHAN KUMAR YADAV",
    "1602-25-737-009": "DIVYA SAI NALLAGATLA", "1602-25-737-010": "DHEERAJ REDDY BANDI",
    "1602-25-737-011": "ESHWAR SAI GADDAM", "1602-25-737-012": "FARHAN AHMED SHAIK", "1602-25-737-013": "GAYATHRI DEVI KALYAN",
    "1602-25-737-014": "HARSHITH KUMAR JONNALAGADDA", "1602-25-737-015": "HIMA BINDU VEMULA",
    
    // 2nd Year (2024 Batch)
    "1602-24-737-001": "AKSHAYA BHOOMIREDDY", "1602-24-737-002": "AKSHITH RAJ JAGGAIAH GARI", "1602-24-737-003": "AKULA SATHWIK",
    "1602-24-737-004": "ANUJA KUCHIPUDI", "1602-24-737-005": "ANUSH KOMURAVELLI", "1602-24-737-006": "ASHRITA MANDADI",
    "1602-24-737-007": "ASHRITH KAVETI", "1602-24-737-008": "AVANEESH NAGLOORI", "1602-24-737-009": "BALU NAYAK ESLAVATH",
    "1602-24-737-010": "BLESSY EPPA", "1602-24-737-011": "CHARAN PUTTI", "1602-24-737-012": "DESHINA SHREERAMULU",
    "1602-24-737-013": "DHRITI LAKSHMI BONTALA", "1602-24-737-014": "GANESH SANDYAPAGA", "1602-24-737-015": "HASINI GANDI",
    "1602-24-737-016": "HRITHIK TADEPALLI", "1602-24-737-017": "JAYARAM GOURISHETTI", "1602-24-737-018": "JAYAVENKAT ARYAN GURJALA",
    "1602-24-737-019": "JOSHITA BONDA", "1602-24-737-020": "JOSHINAVI KANNEBOINA", "1602-24-737-021": "KARTHIK DHOUNABOINA",
    "1602-24-737-022": "KARUNA SREE GUMMADI", "1602-24-737-023": "LOHITH SORAPALLI", "1602-24-737-024": "MANASWITI SOMANGARI",
    "1602-24-737-025": "MANGI BAI", "1602-24-737-026": "MD ASAF IBRAHIM", "1602-24-737-027": "MOHAMMED ABDUL SAMEE",
    "1602-24-737-028": "MOHAMMED KASHIF", "1602-24-737-029": "MOHAN AKHIL BHEEMAVARAPU", "1602-24-737-030": "NISHANTH NAIDU POLA",
    "1602-24-737-031": "PABBARAJA SRIRAGHAVA", "1602-24-737-032": "PRANUTHI MEDE", "1602-24-737-033": "PURVI REDDY CHINAGANTA",
    "1602-24-737-034": "RAHUL RAMAVATH", "1602-24-737-035": "RAHUL SRIGIRI", "1602-24-737-036": "RAHUL VADTHYAVATH",
    "1602-24-737-037": "RAKESH GOUD EDIGI", "1602-24-737-038": "RAM CHARAN R RAMISETTY", "1602-24-737-039": "RAMCHARAN GUGULOTH",
    "1602-24-737-040": "REVANTH LINGAMPALLY", "1602-24-737-041": "RISHANTH ROUTHU", "1602-24-737-042": "SAI KISHOR PATHLAVATH",
    "1602-24-737-043": "SAI KUMAR VADTHYA", "1602-24-737-044": "SAI SRI MADHURIMA DAYAKA", "1602-24-737-045": "SAI THEJA REDDY PATLOLLA",
    "1602-24-737-046": "SANDHYA LUNAVATH", "1602-24-737-047": "SATHWIK BHUSHAN A", "1602-24-737-048": "SHAIK SHARF UDDIN",
    "1602-24-737-049": "SHARANYA MOGULLA", "1602-24-737-050": "SHASHIDHAR REDDY B", "1602-24-737-051": "SHIVA SAI KOLLA",
    "1602-24-737-052": "SHOAIB ARSLAN SYED", "1602-24-737-053": "SHREYA VEERAGANDHAM", "1602-24-737-054": "SHRUTHIKA VORUGANTI",
    "1602-24-737-055": "SIDDARTHA GOUD E", "1602-24-737-056": "SREERAM VARUN SHARMA A S", "1602-24-737-057": "SRICHARAN KYASA",
    "1602-24-737-058": "SRISHANTH NARWADE", "1602-24-737-059": "SURYA CHANDAN LANDE", "1602-24-737-060": "TEJESHVAR KONKA",
    "1602-24-737-061": "VAISHNAV TADAKAM ADLA", "1602-24-737-062": "VARSHINI CHILUKURU", "1602-24-737-063": "VENKATA NESHYA SRI MEKALA",
    "1602-24-737-064": "YAMINI BANGI"
};

const STORES = {
    hackathons: [
        { id: 1, title: 'Global AI Hackathon', domain: 'AI/ML', prize: '$10,000', deadline: '2026-04-10', desc: 'Build the next generation of AI agents to solve real-world problems.' },
        { id: 2, title: 'Web3 Innovators', domain: 'Blockchain', prize: '$5,000', deadline: '2026-04-15', desc: 'Create decentralized applications for the modern web.' },
        { id: 3, title: 'CyberDefend 2026', domain: 'Cybersecurity', prize: '$8,000', deadline: '2026-04-20', desc: 'Find vulnerabilities and patch them in this 48hr CTF.' },
        { id: 4, title: 'AppBrew 2026', domain: 'Mobile Dev', prize: '$15,000', deadline: '2026-05-01', desc: 'Develop impactful mobile software.' }
    ],
    requests: [
        { id: 101, studentName: 'ANUJA KUCHIPUDI', rollNo: '1602-24-737-004', year: '1st Year', dept: 'IT', event: 'Global AI Hackathon', status: 'Pending', date: '2026-03-20', team: [], attendance: 'Queued' },
        { id: 102, studentName: 'BLESSY EPPA', rollNo: '1602-24-737-010', year: '1st Year', dept: 'IT', event: 'Web3 Innovators', status: 'Approved', date: '2026-03-18', team: [], attendance: 'Queued' },
        { id: 103, studentName: 'HRITHIK TADEPALLI', rollNo: '1602-24-737-016', year: '1st Year', dept: 'IT', event: 'CyberDefend 2026', status: 'Approved', date: '2026-03-15', team: ['1602-24-737-018'], attendance: 'Resolved' },
        { id: 104, studentName: 'MOHAMMED KASHIF', rollNo: '1602-24-737-028', year: '1st Year', dept: 'IT', event: 'Global AI Hackathon', status: 'Rejected', date: '2026-03-10', team: [], attendance: 'Queued' }
    ],
    feedbacks: [],
    teamPosts: [
        { id: 10, author: '1602-24-737-021', name: 'KARTHIK DHOUNABOINA', event: 'Global AI Hackathon', needed: 'React, Node.js', date: '2026-03-25', msg: 'Looking for a reliable frontend dev to join my team.' },
        { id: 11, author: '1602-24-737-046', name: 'SANDHYA LUNAVATH', event: 'CyberDefend 2026', needed: 'Python Scripting, Web Security', date: '2026-03-26', msg: 'We have 2 spots left for the CTF. DM if interested.' }
    ]
};

let currentUser = null;
let activeRoleTab = 'student';
let currentView = 'login'; 
let studentActiveTab = 'dashboard';
let coordActiveTab = 'inbox';
let attendanceActiveTab = 'overview';

// User credentials store (default password: vce for all)
const USER_CREDENTIALS = {
    // HOD - Only Ram Mohan Rao can access
    hod: {
        username: 'Ram Mohan Rao',
        password: 'vce'
    },
    // Coordinator credentials
    coordinator: {
        password: 'vce'
    },
    // Attendance Manager credentials
    attendance: {
        password: 'vce'
    }
};

// --- UTILS ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class='bx ${type === 'success' ? 'bx-check-circle' : type === 'warning' ? 'bx-error' : 'bx-error-circle'}'></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function validateRollNumber(roll) {
    const regex = /^1602-(24|25|26|27|28)-(732|733|734|735|737)-\d{3}$/;
    return regex.test(roll);
}

function getStudentName(roll) {
    return STUDENT_DB[roll] || "Student User";
}

function getYearFromRoll(roll) {
    // Extract the batch year from roll number (e.g., 1602-24-737-001 -> 24)
    const parts = roll.split('-');
    if (parts.length >= 2) {
        const batchYear = parseInt(parts[1]);
        
        // Year mapping based on batch:
        // 25 -> 1st Year
        // 24 -> 2nd Year
        // 23 -> 3rd Year
        // 22 -> 4th Year
        const yearMap = {
            25: '1st Year',
            24: '2nd Year',
            23: '3rd Year',
            22: '4th Year'
        };
        
        return yearMap[batchYear] || 'Unknown';
    }
    return 'Unknown';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Student Points System Calculator
function calculatePoints(rollNo) {
    const myReqs = STORES.requests.filter(r => r.rollNo === rollNo || r.team.includes(rollNo));
    let points = 0;
    let badges = [];
    myReqs.forEach(r => {
        points += 10; // For applying
        if (r.status === 'Approved') points += 20;
        if (r.attendance === 'Resolved') points += 100;
    });
    
    if (points >= 100) badges.push({ icon: 'bx-medal', name: 'Hackathon Finisher', color: 'var(--success)' });
    if (points >= 250) badges.push({ icon: 'bx-trophy', name: 'Elite Achiever', color: 'var(--warning)' });
    if (myReqs.length >= 3) badges.push({ icon: 'bx-rocket', name: 'Enthusiast', color: 'var(--primary)' });
    
    return { points, badges };
}

function getLeaderboard() {
    // Collect all unique students who applied or were in teams
    const participantSet = new Set();
    STORES.requests.forEach(r => {
        participantSet.add(r.rollNo);
        r.team.forEach(t => participantSet.add(t));
    });
    
    const board = Array.from(participantSet).map(roll => {
        const stats = calculatePoints(roll);
        return { roll, name: getStudentName(roll), points: stats.points, badges: stats.badges };
    });
    
    return board.sort((a,b) => b.points - a.points);
}


// --- ROUTER ---
function render() {
    const app = document.getElementById('app');
    
    if (currentView === 'login') {
        app.innerHTML = LoginView();
        attachLoginListeners();
    } else {
        const NavbarHTML = `
            <nav class="navbar">
                <div class="nav-brand">
                    <i class='bx bx-code-block text-gradient'></i>
                    <span>HackTrack <span style="font-size: 0.8rem; font-weight: 400; color: var(--text-muted); letter-spacing: 1px;">| VCE</span></span>
                </div>
                <div class="nav-profile">
                    <div class="nav-user-info">
                        <span class="nav-user-name">${currentUser.name}</span>
                        <span class="nav-user-role">${currentUser.role.toUpperCase()}</span>
                    </div>
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div>
            </nav>
            <div class="main-content" id="main-container"></div>
        `;
        app.innerHTML = NavbarHTML;
        
        const mainContainer = document.getElementById('main-container');
        if (currentUser.role === 'student') mainContainer.innerHTML = StudentDashboardView();
        else if (currentUser.role === 'coordinator') mainContainer.innerHTML = CoordinatorDashboardView();
        else if (currentUser.role === 'hod') mainContainer.innerHTML = HODDashboardView();
        else if (currentUser.role === 'attendance') mainContainer.innerHTML = AttendanceManagerDashboardView();
    }
}

function login(role, username, password) {
    if (role === 'student') {
        if (!validateRollNumber(username)) {
            showToast('Invalid Hall Ticket. Format: 1602-XX-XXX-XXX', 'error');
            return;
        }
        // Students don't need password validation
        currentUser = { role: 'student', name: getStudentName(username), roll: username };
    } else {
        // Validate username
        if (!username.trim()) {
            showToast('Username cannot be empty', 'error');
            return;
        }
        
        // HOD - Only Ram Mohan Rao can access with password 'vce'
        if (role === 'hod') {
            if (username !== 'Ram Mohan Rao' || password !== 'vce') {
                showToast('Invalid HOD credentials. Only Ram Mohan Rao has HOD access.', 'error');
                return;
            }
            currentUser = { role: 'hod', name: 'Ram Mohan Rao' };
        }
        // Coordinator - Default password 'vce'
        else if (role === 'coordinator') {
            if (password !== 'vce') {
                showToast('Invalid password. Default password is: vce', 'error');
                return;
            }
            currentUser = { role: 'coordinator', name: username };
        }
        // Attendance Manager - Default password 'vce'
        else if (role === 'attendance') {
            if (password !== 'vce') {
                showToast('Invalid password. Default password is: vce', 'error');
                return;
            }
            currentUser = { role: 'attendance', name: username };
        }
    }
    
    currentView = 'dashboard';
    render();
    showToast(`Welcome back, ${currentUser.name}!`);
}

function logout() {
    currentUser = null;
    currentView = 'login';
    render();
}

// --- VIEWS ---

function LoginView() {
    return `
        <div class="login-container">
            <div class="bg-shape shape-1"></div>
            <div class="bg-shape shape-2"></div>
            <div class="login-card">
                <div class="login-header">
                    <i class='bx bx-code-block text-gradient' style="font-size: 3rem; margin-bottom: 0.5rem;"></i>
                    <h1 style="font-size:1.5rem;">Vasavi College of Engineering</h1>
                    <p style="font-weight:bold; color:var(--text-light); margin-top:5px; margin-bottom:5px;">HackTrack Platform</p>
                    <p style="font-size:0.85rem">Centralized Hackathon Participation Portal</p>
                </div>
                <div class="role-selector">
                    <button class="role-btn ${activeRoleTab === 'student' ? 'active' : ''}" data-role="student">Student</button>
                    <button class="role-btn ${activeRoleTab === 'coordinator' ? 'active' : ''}" data-role="coordinator">Coordinator</button>
                    <button class="role-btn ${activeRoleTab === 'hod' ? 'active' : ''}" data-role="hod">HOD</button>
                    <button class="role-btn ${activeRoleTab === 'attendance' ? 'active' : ''}" data-role="attendance">Attendance Manager</button>
                </div>
                <form id="login-form">
                    <div class="form-group">
                        <label>${activeRoleTab === 'student' ? 'Hall Ticket Number' : 'Username'}</label>
                        <input type="text" id="username" class="form-control" placeholder="${activeRoleTab === 'student' ? '1602-XX-XXX-XXX' : 'Enter your official username'}" required>
                         ${activeRoleTab === 'student' ? `<small style="color:var(--text-muted); font-size: 0.75rem; margin-top: 5px; display: block;">Format: 1602-XX-XXX-XXX</small>` : ''}
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="password" class="form-control" placeholder="Enter password" required>
                    </div>
                    <button type="submit" class="btn-primary mt-4">
                        Login <i class='bx bx-right-arrow-alt'></i>
                    </button>
                </form>
            </div>
        </div>
    `;
}

function attachLoginListeners() {
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            activeRoleTab = e.target.dataset.role;
            render();
        });
    });

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value;
        login(activeRoleTab, user, pass);
    });
}

// --- STUDENT PORTAL ---
let currentTeamMembers = []; // State array to hold team roll numbers

function setStudentTab(tab) {
    studentActiveTab = tab;
    render();
}

function StudentDashboardView() {
    let contentHtml = '';

    if (studentActiveTab === 'dashboard') {
        const hackCards = STORES.hackathons.map(h => `
            <div class="hackathon-card">
                <div class="hack-header">
                    <span class="hack-domain">${h.domain}</span>
                    <span class="hack-prize"><i class='bx bx-trophy'></i> ${h.prize}</span>
                </div>
                <h3 class="hack-title">${h.title}</h3>
                <p class="hack-desc">${h.desc}</p>
                <div class="hack-footer">
                    <span class="hack-deadline"><i class='bx bx-time-five'></i> ${formatDate(h.deadline)}</span>
                    <button class="btn-primary btn-sm" onclick="initApplication(${h.id})">Apply Now</button>
                </div>
            </div>
        `).join('');

        const myReqs = STORES.requests.filter(r => r.rollNo === currentUser.roll || r.team.includes(currentUser.roll));
        const reqRows = myReqs.map(r => `
            <tr>
                <td><strong>${r.event}</strong><br><small class="text-muted">Lead: ${r.rollNo === currentUser.roll ? 'You' : r.studentName}</small></td>
                <td>${formatDate(r.date)}</td>
                <td><span class="badge ${r.status === 'Approved' ? 'badge-success' : r.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}">${r.status}</span></td>
                <td><span class="badge ${r.attendance === 'Resolved' ? 'badge-success' : 'badge-primary'}">${r.attendance}</span></td>
                <td>
                    ${(r.status === 'Approved' && r.attendance === 'Queued' && r.rollNo === currentUser.roll) ? `<button class="btn-primary btn-sm w-100" onclick="openResultModal(${r.id})">Upload Result</button>` : '-'}
                </td>
            </tr>
        `).join('') || `<tr><td colspan="5" class="text-center" style="padding: 2rem;">No applications. Start building!</td></tr>`;

        contentHtml = `
            <h3 class="mb-3">Live Hackathons</h3>
            <div class="hackathon-grid mb-4">${hackCards}</div>
            <h3 class="mb-3 mt-4">My Dashboard History</h3>
            <div class="card table-responsive">
                <table class="table">
                    <thead><tr><th>Event</th><th>Date</th><th>Status</th><th>Results Status</th><th>Action</th></tr></thead>
                    <tbody>${reqRows}</tbody>
                </table>
            </div>
        `;
    } else if (studentActiveTab === 'teamboard') {
        const postsHTML = STORES.teamPosts.map(p => `
            <div class="team-post">
                <div class="team-post-header">
                    <div>
                        <h4 style="margin-bottom:0.2rem">${p.name} <span style="font-size:0.8rem; color:var(--text-muted); font-weight:normal;">(${p.author})</span></h4>
                        <span style="font-size:0.8rem; color:var(--text-muted);"><i class='bx bx-time'></i> ${formatDate(p.date)}</span>
                    </div>
                    <span class="badge badge-primary" style="height: fit-content;">${p.event}</span>
                </div>
                <div class="mb-3">
                    <span style="font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:5px;">Skills Needed:</span>
                    ${p.needed.split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}
                </div>
                <p style="color:var(--text-light); line-height: 1.5; margin-bottom:1rem;">"${p.msg}"</p>
                <button class="btn-primary btn-sm" style="background:transparent; border:1px solid var(--primary); color:var(--primary)" onclick="showToast('Connecting with ${p.name}... Check your messages!', 'success')"><i class='bx bx-envelope'></i> Connect</button>
            </div>
        `).join('');

        contentHtml = `
            <div class="d-flex justify-between align-center mb-4">
                <h3><i class='bx bx-group'></i> Team Formation Board</h3>
                <button class="btn-primary btn-sm" onclick="openModal('team-post-modal')"><i class='bx bx-plus'></i> New Request</button>
            </div>
            <div class="two-col-grid" style="grid-template-columns: 1fr;">
                 ${postsHTML || '<p class="text-muted">No one is currently looking for teammates.</p>'}
            </div>
        `;
    } else if (studentActiveTab === 'profile') {
        const stats = calculatePoints(currentUser.roll);
        contentHtml = `
            <div class="card">
                <div class="profile-header">
                    <div class="profile-avatar">${currentUser.name.charAt(0)}</div>
                    <div>
                        <h2>${currentUser.name}</h2>
                        <p class="text-primary mb-2" style="font-family: monospace; font-size:1.1rem">${currentUser.roll}</p>
                        <p class="text-muted">Vasavi College of Engineering &bull; Department of IT</p>
                    </div>
                </div>
                <div class="stats-grid mb-4">
                    <div class="stat-card">
                        <span class="stat-title">Total Points</span>
                        <div class="d-flex align-center gap-2">
                           <i class='bx bx-coin-stack text-warning' style="font-size: 2rem;"></i>
                           <span class="stat-value text-warning">${stats.points}</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <span class="stat-title">Hackathons Attended</span>
                        <span class="stat-value text-primary">${STORES.requests.filter(r => (r.rollNo === currentUser.roll || r.team.includes(currentUser.roll)) && r.attendance === 'Resolved').length}</span>
                    </div>
                </div>
                <h3 class="mb-3">Earned Badges</h3>
                <div class="d-flex gap-3 flex-wrap">
                    ${stats.badges.map(b => `
                        <div style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; text-align: center; width: 150px;">
                            <i class='bx ${b.icon}' style="font-size: 3rem; color: ${b.color}; margin-bottom: 0.5rem;"></i>
                            <p style="font-size: 0.9rem; font-weight: 500;">${b.name}</p>
                        </div>
                    `).join('')}
                    ${stats.badges.length === 0 ? '<p class="text-muted">Participate in hackathons to earn achievement badges!</p>' : ''}
                </div>
            </div>
        `;
    }

    return `
        <div class="dashboard-header mb-0">
            <div>
                <h2>Hello, ${currentUser.name} 👋</h2>
                <p class="text-muted">Your centralized hub for Hackathon activities.</p>
            </div>
        </div>

        <div class="tabs-container mt-4">
            <button class="tab-btn ${studentActiveTab === 'dashboard' ? 'active' : ''}" onclick="setStudentTab('dashboard')">Hackathons</button>
            <button class="tab-btn ${studentActiveTab === 'teamboard' ? 'active' : ''}" onclick="setStudentTab('teamboard')">Team Board</button>
            <button class="tab-btn ${studentActiveTab === 'profile' ? 'active' : ''}" onclick="setStudentTab('profile')">My Profile & Badges</button>
        </div>

        ${contentHtml}

        <!-- Application Modal -->
        <div class="modal-overlay" id="application-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Submit Application</h3>
                    <button class="modal-close" onclick="closeModal('application-modal')"><i class='bx bx-x'></i></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="apply-event">
                    <div class="form-row mb-3">
                        <div class="form-group">
                            <label>Primary Participant Name</label>
                            <input type="text" class="form-control" value="${currentUser.name}" disabled>
                        </div>
                        <div class="form-group">
                            <label>Leader Roll No.</label>
                            <input type="text" class="form-control" value="${currentUser.roll}" disabled>
                        </div>
                    </div>
                    <div class="form-row mb-3">
                        <div class="form-group">
                            <label>Year of Study</label>
                            <select class="form-control" id="apply-year" required>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Department</label>
                            <select class="form-control" id="apply-dept" required>
                                <option value="IT">IT (737)</option>
                                <option value="CSE">CSE (733)</option>
                                <option value="ECE">ECE (735)</option>
                                <option value="EEE">EEE (734)</option>
                                <option value="Civil">Civil (732)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group mb-4" style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px;">
                        <label>Dynamic Team Members (Add by Roll Number)</label>
                        <div id="dynamic-team-list" class="mb-3">
                            <!-- JS Injected -->
                        </div>
                        <div class="d-flex gap-2">
                            <input type="text" id="new-member-roll" class="form-control" placeholder="1602-24-737-XXX">
                            <button type="button" class="btn-primary" style="width: auto;" onclick="addTeamMember()"><i class='bx bx-plus'></i> Add</button>
                        </div>
                    </div>

                    <button type="button" class="btn-primary w-100 mb-3" onclick="generatePreview()">Generate Letter Preview</button>
                    
                    <div id="letter-preview-container" style="display:none;">
                        <label class="mb-2 d-block text-warning"><i class='bx bx-file'></i> Verification Letter Preview</label>
                        <div class="letter-preview" id="letter-content"></div>
                        <button type="button" class="btn-primary w-100" style="background: var(--success);" onclick="submitApplication()"><i class='bx bx-check-double'></i> Submit Request To Coordinator</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Result Modal -->
        <div class="modal-overlay" id="result-modal">
            <div class="modal-content">
                ... (Result modal identical functionality) ...
                <div class="modal-header">
                    <h3>Upload Certificates & Result</h3>
                    <button class="modal-close" onclick="closeModal('result-modal')"><i class='bx bx-x'></i></button>
                </div>
                <div class="modal-body">
                    <div class="form-group mb-4">
                        <label>Provide Drive Link to Certificates/Proof</label>
                        <input type="url" class="form-control" id="proof-link" placeholder="https://drive.google.com/..." required>
                    </div>
                    <button class="btn-primary w-100" onclick="submitResult()"><i class='bx bx-badge-check'></i> Mark Attendance as Resolved</button>
                </div>
            </div>
        </div>
        
        <!-- Post Team Modal -->
        <div class="modal-overlay" id="team-post-modal">
            <div class="modal-content">
                 <div class="modal-header">
                    <h3>Find Teammates</h3>
                    <button class="modal-close" onclick="closeModal('team-post-modal')"><i class='bx bx-x'></i></button>
                </div>
                <div class="modal-body">
                    <div class="form-group mb-3">
                        <label>Target Hackathon</label>
                        <input type="text" id="post-event" class="form-control" placeholder="e.g. Global AI Hackathon">
                    </div>
                    <div class="form-group mb-3">
                        <label>Required Skills (Comma separated)</label>
                        <input type="text" id="post-skills" class="form-control" placeholder="e.g. React, UI/UX, GenAI">
                    </div>
                    <div class="form-group mb-4">
                        <label>Message</label>
                        <textarea id="post-msg" class="form-control" rows="3" placeholder="Explain your idea or what you're looking for..."></textarea>
                    </div>
                    <button class="btn-primary w-100" onclick="submitTeamPost()">Post to Board</button>
                </div>
            </div>
        </div>
    `;
}

// Modal handling
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function openModal(id) { document.getElementById(id).classList.add('active'); }

function setCoordTab(tab) {
    coordActiveTab = tab;
    render();
}

function renderTeamList() {
    const div = document.getElementById('dynamic-team-list');
    if (currentTeamMembers.length === 0) {
        div.innerHTML = `<span class="text-muted" style="font-size:0.85rem">No additional members added. (You are submitting as Solo/Leader)</span>`;
        return;
    }
    div.innerHTML = currentTeamMembers.map((roll, idx) => `
        <div class="team-member-item">
            <div class="team-member-info">
                 <span class="team-member-name">${getStudentName(roll)}</span>
                 <span class="team-member-roll">${roll}</span>
            </div>
            <button class="btn-primary btn-sm" style="background:var(--danger); padding: 0.3rem 0.6rem; width: auto;" onclick="removeTeamMember('${roll}')"><i class='bx bx-trash'></i></button>
        </div>
    `).join('');
}

function addTeamMember() {
    const roll = document.getElementById('new-member-roll').value.trim();
    if (!validateRollNumber(roll)) {
        showToast('Invalid Roll Number Format', 'error');
        return;
    }
    if (roll === currentUser.roll) {
        showToast('You are already the primary applicant', 'warning');
        return;
    }
    if (currentTeamMembers.includes(roll)) {
        showToast('Member already added', 'warning');
        return;
    }
    currentTeamMembers.push(roll);
    document.getElementById('new-member-roll').value = '';
    showToast(`Added ${getStudentName(roll)} to team`, 'success');
    renderTeamList();
    document.getElementById('letter-preview-container').style.display = 'none'; // reset preview
}

function removeTeamMember(roll) {
    currentTeamMembers = currentTeamMembers.filter(r => r !== roll);
    renderTeamList();
    document.getElementById('letter-preview-container').style.display = 'none'; // reset preview
}

function initApplication(hackathonId) {
    const h = STORES.hackathons.find(x => x.id == hackathonId);
    document.getElementById('apply-event').value = h.title;
    currentTeamMembers = [];
    document.getElementById('letter-preview-container').style.display = 'none';
    openModal('application-modal');
    renderTeamList();
}

function generatePreview() {
    document.getElementById('letter-preview-container').style.display = 'block';
    const year = document.getElementById('apply-year').value;
    const dept = document.getElementById('apply-dept').value;
    const event = document.getElementById('apply-event').value;
    const date = new Date().toLocaleDateString();

    const teammatesHtml = currentTeamMembers.length === 0 
        ? 'None (Solo Submission)'
        : currentTeamMembers.map(r => `${getStudentName(r)} (${r})`).join('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

    const letterHtml = `
        <div class="letter-date">Date: ${date}</div>
        <p>To,<br>The Head of Department,<br>Department of ${dept},<br>Vasavi College of Engineering (VCE).</p>
        <p>Respected Sir/Madam,</p>
        <div class="letter-subject">Subject: Request for permission to participate in ${event}</div>
        <p>We, the students from ${year}, Department of ${dept}, humbly request your permission to officially participate in the technical event, <strong>${event}</strong>.</p>
        <p><strong>Primary Participant:</strong> ${currentUser.name} (${currentUser.roll})<br>
        <strong>Team Members:</strong> <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${teammatesHtml}</p>
        <p>This event will greatly enhance our technical skills and provide practical industry exposure. We assure you that we will cover up any missed academic work during the duration of the event.</p>
        <p>Thanking you,</p>
        <p>Yours sincerely,<br><strong>${currentUser.name}</strong><br>${currentUser.roll}</p>
    `;
    document.getElementById('letter-content').innerHTML = letterHtml;
}

function submitApplication() {
    const newReq = {
        id: Date.now(),
        studentName: currentUser.name,
        rollNo: currentUser.roll,
        year: document.getElementById('apply-year').value,
        dept: document.getElementById('apply-dept').value,
        event: document.getElementById('apply-event').value,
        team: [...currentTeamMembers],
        status: 'Pending',
        date: new Date().toISOString(),
        attendance: 'Queued'
    };
    STORES.requests.unshift(newReq);
    showToast('Application formally submitted to Coordinator!', 'success');
    closeModal('application-modal');
    render();
}

let activeRequestId = null;
function openResultModal(id) {
    activeRequestId = id;
    openModal('result-modal');
}
function submitResult() {
    const link = document.getElementById('proof-link').value;
    if(!link) { showToast('Provide a link to verify', 'error'); return; }
    const r = STORES.requests.find(x => x.id == activeRequestId);
    r.attendance = 'Resolved';
    showToast('Certificates uploaded, attendance & results marked as Resolved! Points awarded.', 'success');
    closeModal('result-modal');
    render();
}

function submitTeamPost() {
    const event = document.getElementById('post-event').value;
    const skills = document.getElementById('post-skills').value;
    const msg = document.getElementById('post-msg').value;
    if(!event || !skills || !msg) { showToast('Fill all fields', 'error'); return; }
    
    STORES.teamPosts.unshift({
        id: Date.now(),
        author: currentUser.roll,
        name: currentUser.name,
        event, needed: skills, msg, date: new Date().toISOString()
    });
    showToast('Recruitment posted successfully!', 'success');
    closeModal('team-post-modal');
    render();
}


// --- COORDINATOR PORTAL ---
let currentFilterYear = 'All';
let currentFilterType = 'All';

function CoordinatorDashboardView() {
    let contentHtml = '';

    if (coordActiveTab === 'inbox') {
        const pendingRows = STORES.requests.filter(r => r.status === 'Pending').map(r => `
            <tr>
                <td><strong>${r.studentName}</strong><br><small class="text-primary">${r.rollNo}</small></td>
                <td>${r.event} <br><small class="text-muted">Team Size: ${r.team.length + 1}</small></td>
                <td>${formatDate(r.date)}</td>
                <td>
                    <div class="d-flex flex-column gap-2">
                        <button class="btn-secondary w-100 py-2" style="border-radius: 4px;" onclick="viewRequestLetter(${r.id})"><i class='bx bx-file'></i> View Letter</button>
                        <button class="btn-primary w-100 py-2" style="background:var(--success); border-radius: 4px;" onclick="updateStatus(${r.id}, 'Approved')"><i class='bx bx-check'></i> Approve</button>
                        <button class="w-100 py-2" style="background:transparent; border: 1px solid var(--danger); color: var(--danger); border-radius: 4px; cursor: pointer;" onclick="updateStatus(${r.id}, 'Rejected')"><i class='bx bx-x'></i> Reject</button>
                    </div>
                </td>
            </tr>
        `).join('') || `<tr><td colspan="4" class="text-center text-muted" style="padding: 2rem;">Inbox zero! No pending requests.</td></tr>`;

        contentHtml = `
            <div class="two-col-grid" style="grid-template-columns: 2fr 1fr;">
                <div class="card" style="box-shadow: 0 10px 30px rgba(0,0,0,0.2); border-color: var(--primary);">
                    <h3 class="mb-3 d-flex align-center justify-between">
                        <span>Inbox: Pending Requests</span>
                        <span class="badge badge-warning">${STORES.requests.filter(r => r.status==='Pending').length} Action(s) Required</span>
                    </h3>
                    <div class="table-responsive">
                        <table class="table">
                            <tbody>${pendingRows}</tbody>
                        </table>
                    </div>
                </div>
                
                ${STORES.feedbacks.length > 0 ? `
                <div class="card" style="border-left: 4px solid var(--warning)">
                    <h3 class="mb-3"><i class='bx bx-message-dots text-warning'></i> Directives from HOD</h3>
                    ${STORES.feedbacks.map(f => `
                        <div class="mb-3" style="background: rgba(255,255,255,0.02); padding: 1rem; border-radius: 8px;">
                            <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.5rem;"><i class='bx bx-time'></i> ${formatDate(f.date)}</span>
                            <p style="margin: 0; color: var(--text-light);">${f.msg}</p>
                        </div>
                    `).join('')}
                </div>
                ` : '<div class="card"><p class="text-muted text-center pt-3">No directives from HOD.</p></div>'}
            </div>
        `;
    } else if (coordActiveTab === 'analytics') {
        const totalReqs = STORES.requests.length;
        const approved = STORES.requests.filter(r => r.status === 'Approved').length;
        const resolved = STORES.requests.filter(r => r.attendance === 'Resolved').length;

        let filteredList = STORES.requests;
        if (currentFilterYear !== 'All') filteredList = filteredList.filter(r => r.year.includes(currentFilterYear));
        if (currentFilterType === 'Winners/Resolved') filteredList = filteredList.filter(r => r.attendance === 'Resolved');
        else if (currentFilterType === 'Achievements (Approved)') filteredList = filteredList.filter(r => r.status === 'Approved');

        const reportRows = filteredList.map(r => `
            <tr>
                <td><strong>${r.studentName}</strong><br><small class="text-muted">${r.rollNo}</small></td>
                <td>${r.year}</td>
                <td>${r.event}</td>
                <td><span class="badge ${r.status === 'Approved' ? 'badge-success' : r.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}">${r.status}</span></td>
                <td><span class="badge ${r.attendance === 'Resolved' ? 'badge-success' : 'badge-primary'}">${r.attendance}</span></td>
            </tr>
        `).join('');

        contentHtml = `
            <div class="stats-grid mb-4">
                <div class="stat-card">
                    <span class="stat-title">Total Processed</span>
                    <span class="stat-value">${totalReqs}</span>
                </div>
                <div class="stat-card">
                    <span class="stat-title">Approved Participation</span>
                    <span class="stat-value" style="color: var(--success)">${approved}</span>
                </div>
                <div class="stat-card">
                    <span class="stat-title">Wins & Certificates Verified</span>
                    <span class="stat-value" style="color: var(--warning)">${resolved}</span>
                </div>
            </div>
            <div class="card mb-4">
                <div class="d-flex justify-between align-center mb-4">
                    <h3 class="m-0"><i class='bx bx-bar-chart-alt-2 text-primary'></i> Comprehensive Registry</h3>
                    <div class="d-flex gap-2">
                        <select id="filter-year" class="form-control" style="width:auto; padding:0.4rem; font-size: 0.9rem;" onchange="updateFilters()">
                            <option value="All" ${currentFilterYear === 'All' ? 'selected' : ''}>All Years</option>
                            <option value="1st" ${currentFilterYear === '1st' ? 'selected' : ''}>1st Year</option>
                            <option value="2nd" ${currentFilterYear === '2nd' ? 'selected' : ''}>2nd Year</option>
                            <option value="3rd" ${currentFilterYear === '3rd' ? 'selected' : ''}>3rd Year</option>
                            <option value="4th" ${currentFilterYear === '4th' ? 'selected' : ''}>4th Year</option>
                        </select>
                        <select id="filter-type" class="form-control" style="width:auto; padding:0.4rem; font-size: 0.9rem;" onchange="updateFilters()">
                            <option value="All" ${currentFilterType === 'All' ? 'selected' : ''}>All Types</option>
                            <option value="Achievements (Approved)" ${currentFilterType === 'Achievements (Approved)' ? 'selected' : ''}>Approved</option>
                            <option value="Winners/Resolved" ${currentFilterType === 'Winners/Resolved' ? 'selected' : ''}>Verified Results</option>
                        </select>
                        <button class="btn-primary" style="padding: 0.4rem 1rem" onclick="openModal('dispatch-modal')"><i class='bx bx-send'></i> Export to HOD</button>
                    </div>
                </div>
                <div class="table-responsive" style="max-height: 400px; overflow-y:auto">
                    <table class="table">
                        <thead style="position: sticky; top: 0; background: var(--surface); z-index: 1;">
                            <tr><th>Student</th><th>Year</th><th>Event</th><th>Status</th><th>Results</th></tr>
                        </thead>
                        <tbody>${reportRows}</tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (coordActiveTab === 'leaderboard') {
        const board = getLeaderboard();
        
        const rows = board.map((u, i) => `
            <tr>
                <td><strong>${i+1}</strong></td>
                <td><span class="text-primary" style="font-family: monospace; font-weight: bold;">${u.roll}</span><br><small class="text-muted">${u.name}</small></td>
                <td><span style="font-size:1.5rem; font-weight:bold; color:var(--primary)">${u.points}</span></td>
                <td>${u.badges.map(b => `<span class="badge" title="${b.name}" style="background:transparent; border:1px solid ${b.color}; color:${b.color}; margin-right:5px;"><i class='bx ${b.icon}'></i></span>`).join('')}</td>
            </tr>
        `).join('') || `<tr><td colspan="4" class="text-center">No participants yet.</td></tr>`;

        contentHtml = `
            <div class="card">
                <h3 class="mb-4"><i class='bx bx-trophy text-warning'></i> College Hackathon Leaderboard</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead><tr><th>Rank</th><th>Roll Number</th><th>Total Score</th><th>Badges</th></tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>
        `;
    }

    return `
        <div class="dashboard-header mb-0">
            <div>
                <h2>Resource Coordinator Portal</h2>
                <p class="text-muted">Manage hackathon pipelines, verify attendance, and rank students.</p>
            </div>
        </div>

        <div class="tabs-container mt-4">
            <button class="tab-btn ${coordActiveTab === 'inbox' ? 'active' : ''}" onclick="setCoordTab('inbox')">Pending Inbox</button>
            <button class="tab-btn ${coordActiveTab === 'analytics' ? 'active' : ''}" onclick="setCoordTab('analytics')">Master Registry & Dispatch</button>
            <button class="tab-btn ${coordActiveTab === 'leaderboard' ? 'active' : ''}" onclick="setCoordTab('leaderboard')">Global Leaderboard</button>
        </div>

        ${contentHtml}

        <!-- Dispatch Modal -->
        <div class="modal-overlay" id="dispatch-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Dispatch Report to HOD</h3>
                    <button class="modal-close" onclick="closeModal('dispatch-modal')"><i class='bx bx-x'></i></button>
                </div>
                <div class="modal-body">
                    <p class="mb-3 text-muted">A consolidated performance report will be forwarded to the Head of Department.</p>
                    <button class="btn-primary w-100" onclick="sendToHOD()"><i class='bx bxl-telegram'></i> Confirm Institutional Dispatch</button>
                </div>
            </div>
        </div>
        
        <!-- Coordinator Letter View Modal -->
        <div class="modal-overlay" id="coord-letter-modal">
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h3><i class='bx bx-file'></i> Student Request Letter</h3>
                    <button class="modal-close" onclick="closeModal('coord-letter-modal')"><i class='bx bx-x'></i></button>
                </div>
                <div class="modal-body">
                    <div class="letter-preview" id="coord-letter-content" style="max-height: 60vh; overflow-y: auto;"></div>
                </div>
            </div>
        </div>
    `;
}

function updateStatus(id, status) {
    const r = STORES.requests.find(x => x.id == id);
    if (r) { r.status = status; showToast(`Request ${status}`, status === 'Approved' ? 'success' : 'error'); render(); }
}
function updateFilters() {
    currentFilterYear = document.getElementById('filter-year').value;
    currentFilterType = document.getElementById('filter-type').value;
    render();
}
function sendToHOD() {
    showToast('Weekly Analytics Report dispatched to HOD dashboard!', 'success');
    closeModal('dispatch-modal');
}

// View Request Letter Modal
let currentViewRequestId = null;

function viewRequestLetter(id) {
    currentViewRequestId = id;
    const r = STORES.requests.find(x => x.id == id);
    if (!r) return;
    
    const hackathon = STORES.hackathons.find(h => h.title === r.event);
    const hackathonDate = hackathon ? hackathon.deadline : 'TBD';
    
    const teammatesHtml = r.team.length === 0 
        ? 'None (Solo Submission)'
        : r.team.map(tm => `${getStudentName(tm)} (${tm})`).join('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    
    const letterHtml = `
        <div class="letter-date">Date: ${formatDate(r.date)}</div>
        <p>To,<br>The Head of Department,<br>Department of ${r.dept},<br>Vasavi College of Engineering (VCE).</p>
        <p>Respected Sir/Madam,</p>
        <div class="letter-subject">Subject: Request for permission to participate in ${r.event}</div>
        <p>We, the students from ${r.year}, Department of ${r.dept}, humbly request your permission to officially participate in the technical event, <strong>${r.event}</strong>.</p>
        <p><strong>Primary Participant:</strong> ${r.studentName} (${r.rollNo})<br>
        <strong>Team Members:</strong> <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${teammatesHtml}</p>
        <p><strong>Hackathon Date:</strong> ${formatDate(hackathonDate)}</p>
        <p>This event will greatly enhance our technical skills and provide practical industry exposure. We assure you that we will cover up any missed academic work during the duration of the event.</p>
        <p>Thanking you,</p>
        <p>Yours sincerely,<br><strong>${r.studentName}</strong><br>${r.rollNo}</p>
    `;
    
    document.getElementById('coord-letter-content').innerHTML = letterHtml;
    openModal('coord-letter-modal');
}

// --- HOD PORTAL ---
function HODDashboardView() {
    const totalReqs = STORES.requests.length;
    const approved = STORES.requests.filter(r => r.status === 'Approved').length;
    const resolved = STORES.requests.filter(r => r.attendance === 'Resolved').length;
    const approvalRate = totalReqs ? Math.round((approved / totalReqs) * 100) : 0;
    
    // Unique participants calculation matching dynamic teams
    const participantSet = new Set();
    STORES.requests.forEach(r => { participantSet.add(r.rollNo); r.team.forEach(t => participantSet.add(t)); });
    const activeParticipants = participantSet.size;

    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    const yearBars = years.map(y => {
        const yReqs = STORES.requests.filter(r => r.year === y);
        const yTotal = yReqs.length;
        const yWon = yReqs.filter(r => r.attendance === 'Resolved').length;
        const partWidth = totalReqs ? (yTotal / totalReqs) * 100 : 0;
        const wonWidth = yTotal ? (yWon / yTotal) * 100 : 0;

        return `
            <div class="mb-4">
                <div class="progress-header">
                    <span class="text-light" style="font-weight: 500;">${y} - Submission Volume</span>
                    <span class="text-primary">${yTotal} requests</span>
                </div>
                <div class="progress-bar mb-3">
                    <div class="progress-fill" style="width: ${partWidth}%; background: var(--primary); box-shadow: 0 0 10px var(--primary)"></div>
                </div>
            </div>
        `;
    }).join('');

    const recentActivity = STORES.requests.slice(0, 5).map(r => `
        <div style="border-left: 2px solid ${r.status === 'Approved' ? 'var(--success)' : r.status === 'Rejected' ? 'var(--danger)' : 'var(--warning)'}; padding-left: 1rem; margin-bottom: 1.5rem; margin-left: 0.5rem; position: relative;">
            <div style="position: absolute; left: -6px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: ${r.status === 'Approved' ? 'var(--success)' : r.status === 'Rejected' ? 'var(--danger)' : 'var(--warning)'};"></div>
            <p style="margin-bottom: 0.3rem;"><strong class="text-light">${r.studentName}</strong> ${r.status === 'Pending' ? 'applied for' : r.status === 'Approved' ? 'agreed for' : 'was denied for'} <span class="text-primary">${r.event}</span></p>
            <span style="font-size: 0.8rem; color: var(--text-muted)"><i class='bx bx-time'></i> ${formatDate(r.date)} &bull; ${r.year}</span>
        </div>
    `).join('') || '<p class="text-muted text-center pt-3">No activity logs found.</p>';

    return `
        <div class="dashboard-header mb-4">
            <div>
                <h2>Institution Oversight Platform</h2>
                <p class="text-muted">High-level institutional metrics and departmental audit logs.</p>
            </div>
            <span class="badge" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.5rem 1rem;"><i class='bx bx-buildings'></i> VCE Authority Access</span>
        </div>

        <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-bottom: 3rem;">
            <div class="stat-card" style="border-bottom: 3px solid var(--primary)">
                <div class="d-flex align-center gap-2 mb-2"><i class='bx bx-file text-primary' style="font-size: 1.5rem"></i> <span class="stat-title">Gross Submissions</span></div>
                <span class="stat-value">${totalReqs}</span>
            </div>
            <div class="stat-card" style="border-bottom: 3px solid var(--success)">
                <div class="d-flex align-center gap-2 mb-2"><i class='bx bx-check-shield text-success' style="font-size: 1.5rem"></i> <span class="stat-title">Approved Outbounds</span></div>
                <span class="stat-value text-success">${approved}</span>
            </div>
            <div class="stat-card" style="border-bottom: 3px solid var(--text-light)">
                <div class="d-flex align-center gap-2 mb-2"><i class='bx bx-group text-light' style="font-size: 1.5rem"></i> <span class="stat-title">Unique Students Active</span></div>
                <span class="stat-value text-light">${activeParticipants}</span>
            </div>
            <div class="stat-card" style="border-bottom: 3px solid #bc8cff">
                <div class="d-flex align-center gap-2 mb-2"><i class='bx bx-pie-chart-alt-2' style="color: #bc8cff; font-size: 1.5rem"></i> <span class="stat-title">Acceptance Rate</span></div>
                <span class="stat-value" style="color: #bc8cff">${approvalRate}%</span>
            </div>
        </div>

        <div class="two-col-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="card" style="min-height: 400px;">
                <h3 class="mb-4"><i class='bx bx-trending-up text-primary'></i> Cohort Demographic Dispersion</h3>
                ${yearBars}
            </div>
            
            <div class="card" style="min-height: 400px; display: flex; flex-direction: column;">
                <h3 class="mb-3"><i class='bx bx-history text-muted'></i> Real-Time Audit Feed</h3>
                <div style="flex: 1; overflow-y: auto;">${recentActivity}</div>
            </div>
        </div>
        
        <div class="card mt-4" style="background: rgba(210, 153, 34, 0.05); border-color: rgba(210, 153, 34, 0.3);">
            <h3 class="mb-3"><i class='bx bx-message-square-edit text-warning'></i> Broadcast Directive to Coordinators</h3>
            <div class="form-group">
                <textarea id="hod-feedback" class="form-control" rows="3" placeholder="Enter formal instructions regarding policy changes..." style="background: rgba(0,0,0,0.3); border-color: rgba(210, 153, 34, 0.2);"></textarea>
            </div>
            <button class="btn-primary w-100" style="background: var(--warning); color: black;" onclick="sendFeedback()"><i class='bx bx-send'></i> Transmit Directive</button>
        </div>
    `;
}

function sendFeedback() {
    const msg = document.getElementById('hod-feedback').value;
    if (!msg) { showToast('Directive cannot be blank', 'error'); return; }
    STORES.feedbacks.unshift({ msg, date: new Date().toISOString() });
    showToast('Directive transmitted successfully over secure channel!', 'success');
    document.getElementById('hod-feedback').value = '';
}

// --- ATTENDANCE MANAGER PORTAL ---
let currentFilterYearAM = 'All';
let currentFilterDeptAM = 'All';

function setAttendanceTab(tab) {
    attendanceActiveTab = tab;
    render();
}

function AttendanceManagerDashboardView() {
    // Get all approved students (including team members) - ONLY APPROVED
    const approvedStudents = [];
    STORES.requests.forEach(r => {
        if (r.status === 'Approved') {
            // Calculate year from roll number
            const calculatedYear = getYearFromRoll(r.rollNo);
            // Get hackathon deadline date
            const hackathon = STORES.hackathons.find(h => h.title === r.event);
            const hackathonDate = hackathon ? hackathon.deadline : r.date;
            
            // Add primary student
            approvedStudents.push({
                name: r.studentName,
                rollNo: r.rollNo,
                year: calculatedYear,
                dept: r.dept,
                event: r.event,
                date: hackathonDate,
                isTeamMember: false
            });
            // Add team members with calculated year
            r.team.forEach(tmRoll => {
                approvedStudents.push({
                    name: getStudentName(tmRoll),
                    rollNo: tmRoll,
                    year: getYearFromRoll(tmRoll),
                    dept: r.dept,
                    event: r.event,
                    date: hackathonDate,
                    isTeamMember: true
                });
            });
        }
    });

    // Get unique years and departments
    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    const departments = [...new Set(approvedStudents.map(s => s.dept))].sort();

    // Filter students
    let filteredStudents = approvedStudents;
    if (currentFilterYearAM !== 'All') {
        filteredStudents = filteredStudents.filter(s => s.year === currentFilterYearAM);
    }
    if (currentFilterDeptAM !== 'All') {
        filteredStudents = filteredStudents.filter(s => s.dept === currentFilterDeptAM);
    }

    // Statistics
    const totalApproved = approvedStudents.length;
    const byYear = {};
    years.forEach(y => {
        byYear[y] = approvedStudents.filter(s => s.year === y).length;
    });
    const byDept = {};
    departments.forEach(d => {
        byDept[d] = approvedStudents.filter(s => s.dept === d).length;
    });

    let contentHtml = '';

    if (attendanceActiveTab === 'overview') {
        // Overview with statistics cards
        const yearStatsCards = years.map(y => `
            <div class="stat-card">
                <span class="stat-title">${y}</span>
                <span class="stat-value text-primary">${byYear[y] || 0}</span>
            </div>
        `).join('');

        const deptStatsCards = departments.map(d => `
            <div class="stat-card">
                <span class="stat-title">${d}</span>
                <span class="stat-value text-primary">${byDept[d] || 0}</span>
            </div>
        `).join('');

        // Group students by Year and Department
        let groupedHtml = '';
        years.forEach(year => {
            const studentsInYear = approvedStudents.filter(s => s.year === year);
            if (studentsInYear.length > 0) {
                groupedHtml += `<div class="mb-4">
                    <h4 class="text-primary mb-3"><i class='bx bx-calendar'></i> ${year} (${studentsInYear.length} students)</h4>`;
                
                departments.forEach(dept => {
                    const studentsInDept = studentsInYear.filter(s => s.dept === dept);
                    if (studentsInDept.length > 0) {
                        const studentRows = studentsInDept.map(s => `
                            <tr>
                                <td><strong>${s.name}</strong></td>
                                <td class="text-primary">${s.rollNo}</td>
                                <td>${s.event}</td>
                                <td><span class="badge badge-info">${s.dept}</span></td>
                                <td>${formatDate(s.date)}</td>
                            </tr>
                        `).join('');
                        
                        groupedHtml += `
                            <div class="card mb-3" style="margin-left: 1rem;">
                                <h5 class="mb-2" style="color: var(--text-light);">${dept} Department (${studentsInDept.length})</h5>
                                <table class="table table-sm">
                                    <thead><tr><th>Name</th><th>Roll No</th><th>Event</th><th>Dept</th><th>Hackathon Date</th></tr></thead>
                                    <tbody>${studentRows}</tbody>
                                </table>
                            </div>
                        `;
                    }
                });
                groupedHtml += `</div>`;
            }
        });

        contentHtml = `
            <div class="stats-grid mb-4">
                <div class="stat-card" style="border-bottom: 3px solid var(--primary)">
                    <span class="stat-title">Total Approved Students</span>
                    <span class="stat-value text-primary">${totalApproved}</span>
                </div>
                <div class="stat-card" style="border-bottom: 3px solid var(--success)">
                    <span class="stat-title">Departments</span>
                    <span class="stat-value text-success">${departments.length}</span>
                </div>
            </div>
            
            <h3 class="mb-3"><i class='bx bx-group'></i> Students by Year & Department</h3>
            <p class="text-muted mb-3" style="font-size: 0.9rem;"><i class='bx bx-info-circle'></i> Mark attendance on the hackathon dates shown below.</p>
            ${groupedHtml || '<p class="text-muted">No approved students found.</p>'}
        `;
    } else if (attendanceActiveTab === 'list') {
        // Detailed list view with filters and download
        const studentRows = filteredStudents.map(s => `
            <tr>
                <td><strong>${s.name}</strong></td>
                <td class="text-primary">${s.rollNo}</td>
                <td>${s.year}</td>
                <td><span class="badge badge-info">${s.dept}</span></td>
                <td>${s.event}</td>
                <td>${formatDate(s.date)}</td>
            </tr>
        `).join('') || `<tr><td colspan="6" class="text-center text-muted" style="padding: 2rem;">No students match the selected filters.</td></tr>`;

        contentHtml = `
            <div class="card mb-4">
                <div class="d-flex justify-between align-center mb-4">
                    <h3 class="m-0"><i class='bx bx-list-ul text-primary'></i> Approved Students List</h3>
                    <div class="d-flex gap-2 align-center">
                        <select id="filter-year-am" class="form-control" style="width:auto; padding:0.4rem; font-size: 0.9rem;" onchange="updateFiltersAM()">
                            <option value="All" ${currentFilterYearAM === 'All' ? 'selected' : ''}>All Years</option>
                            ${years.map(y => `<option value="${y}" ${currentFilterYearAM === y ? 'selected' : ''}>${y}</option>`).join('')}
                        </select>
                        <select id="filter-dept-am" class="form-control" style="width:auto; padding:0.4rem; font-size: 0.9rem;" onchange="updateFiltersAM()">
                            <option value="All" ${currentFilterDeptAM === 'All' ? 'selected' : ''}>All Departments</option>
                            ${departments.map(d => `<option value="${d}" ${currentFilterDeptAM === d ? 'selected' : ''}>${d}</option>`).join('')}
                        </select>
                        <button class="btn-primary" style="padding: 0.4rem 1rem;" onclick="downloadApprovedList()">
                            <i class='bx bx-download'></i> Download CSV
                        </button>
                    </div>
                </div>
                <p class="text-muted mb-3" style="font-size: 0.85rem;"><i class='bx bx-info-circle'></i> Mark attendance on the hackathon dates shown below.</p>
                <div class="table-responsive" style="max-height: 500px; overflow-y:auto">
                    <table class="table">
                        <thead style="position: sticky; top: 0; background: var(--surface); z-index: 1;">
                            <tr><th>Name</th><th>Roll No</th><th>Year</th><th>Department</th><th>Event</th><th>Hackathon Date</th></tr>
                        </thead>
                        <tbody>${studentRows}</tbody>
                    </table>
                </div>
                <div class="mt-3 text-muted" style="font-size: 0.85rem;">
                    Showing ${filteredStudents.length} of ${totalApproved} approved students
                </div>
            </div>
        `;
    }

    return `
        <div class="dashboard-header mb-0">
            <div>
                <h2>Attendance Manager Portal</h2>
                <p class="text-muted">Track and manage approved student attendance records.</p>
            </div>
        </div>

        <div class="tabs-container mt-4">
            <button class="tab-btn ${attendanceActiveTab === 'overview' ? 'active' : ''}" onclick="setAttendanceTab('overview')">
                <i class='bx bx-pie-chart-alt'></i> Overview (By Year/Dept)
            </button>
            <button class="tab-btn ${attendanceActiveTab === 'list' ? 'active' : ''}" onclick="setAttendanceTab('list')">
                <i class='bx bx-list-ul'></i> Full List & Download
            </button>
        </div>

        ${contentHtml}
    `;
}

function updateFiltersAM() {
    currentFilterYearAM = document.getElementById('filter-year-am').value;
    currentFilterDeptAM = document.getElementById('filter-dept-am').value;
    render();
}

function downloadApprovedList() {
    // Get all approved students (including team members)
    const approvedStudents = [];
    STORES.requests.forEach(r => {
        if (r.status === 'Approved') {
            approvedStudents.push({
                name: r.studentName,
                rollNo: r.rollNo,
                year: getYearFromRoll(r.rollNo),
                dept: r.dept,
                event: r.event,
                date: formatDate(r.date)
            });
            r.team.forEach(tmRoll => {
                approvedStudents.push({
                    name: getStudentName(tmRoll),
                    rollNo: tmRoll,
                    year: getYearFromRoll(tmRoll),
                    dept: r.dept,
                    event: r.event,
                    date: formatDate(r.date)
                });
            });
        }
    });

    // Apply filters
    let filteredStudents = approvedStudents;
    if (currentFilterYearAM !== 'All') {
        filteredStudents = filteredStudents.filter(s => s.year === currentFilterYearAM);
    }
    if (currentFilterDeptAM !== 'All') {
        filteredStudents = filteredStudents.filter(s => s.dept === currentFilterDeptAM);
    }

    // Create CSV content
    const headers = ['Name', 'Roll Number', 'Year', 'Department', 'Event', 'Hackathon Date'];
    const csvRows = [headers.join(',')];
    
    filteredStudents.forEach(s => {
        csvRows.push([
            `"${s.name}"`,
            s.rollNo,
            `"${s.year}"`,
            `"${s.dept}"`,
            `"${s.event}"`,
            s.date
        ].join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `approved_students_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`Downloaded ${filteredStudents.length} student records as CSV`, 'success');
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if initial load
    render();
});
