const apiBase = '/api';

// state
let currentTab = 'login'; // login or signup

// Elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const authForm = document.getElementById('auth-form');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authMessage = document.getElementById('auth-message');
const welcomeMessage = document.getElementById('welcome-message');
const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const uploadMessage = document.getElementById('upload-message');
const filesList = document.getElementById('files-list');

// Init
function init() {
    const token = localStorage.getItem('token');
    if (token) {
        showDashboard();
        fetchFiles();
    } else {
        showAuth();
    }

    // Dynamic file input label
    fileInput.addEventListener('change', (e) => {
        const p = e.target.parentElement.querySelector('p');
        if (e.target.files.length > 0) {
            p.textContent = e.target.files[0].name;
            p.style.color = 'var(--text-main)';
        } else {
            p.textContent = 'Drag & Drop your file here or Browse';
            p.style.color = 'var(--text-muted)';
        }
    });
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    authSubmitBtn.textContent = tab === 'login' ? 'Login' : 'Sign Up';
    authMessage.className = 'message';
}

function showAuth() {
    authSection.classList.add('active');
    dashboardSection.classList.remove('active');
}

function showDashboard() {
    authSection.classList.remove('active');
    dashboardSection.classList.add('active');
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) welcomeMessage.textContent = `Hello, ${user.username}`;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showAuth();
    authForm.reset();
}

function showMsg(el, type, text) {
    el.textContent = text;
    el.className = `message ${type}`;
    setTimeout(() => { el.className = 'message'; }, 4000);
}

// Format bytes
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024, dm = decimals < 0 ? 0 : decimals, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// Generate icon based on mime
function getFileIcon(mimetype) {
    if (mimetype.startsWith('image/')) return 'fa-image';
    if (mimetype.includes('pdf')) return 'fa-file-pdf';
    if (mimetype.includes('video')) return 'fa-file-video';
    if (mimetype.includes('audio')) return 'fa-file-audio';
    return 'fa-file';
}

// Auth Submit
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const endpoint = currentTab === 'login' ? '/auth/login' : '/auth/signup';
    
    try {
        const res = await fetch(`${apiBase}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        
        if (res.ok) {
            if (currentTab === 'login') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                showDashboard();
                fetchFiles();
            } else {
                showMsg(authMessage, 'success', 'Signup successful! Please login.');
                switchTab('login');
                document.querySelector('.tab-btn[onclick="switchTab(\'login\')"]').classList.add('active');
                document.querySelector('.tab-btn[onclick="switchTab(\'signup\')"]').classList.remove('active');
            }
        } else {
            showMsg(authMessage, 'error', data.message || 'Authentication failed');
        }
    } catch (err) {
        showMsg(authMessage, 'error', 'Server error. Try again later.');
    }
});

// Upload File
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const btn = document.getElementById('upload-btn');
    const ogHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';
    btn.disabled = true;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiBase}/files/upload`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        const data = await res.json();
        
        if (res.ok) {
            showMsg(uploadMessage, 'success', 'File uploaded successfully!');
            uploadForm.reset();
            fileInput.parentElement.querySelector('p').textContent = 'Drag & Drop your file here or Browse';
            fileInput.parentElement.querySelector('p').style.color = 'var(--text-muted)';
            fetchFiles();
        } else {
            showMsg(uploadMessage, 'error', data.message || 'Upload failed');
            if (res.status === 401) logout();
        }
    } catch (err) {
        showMsg(uploadMessage, 'error', 'Upload error. File might be too large.');
    } finally {
        btn.innerHTML = ogHtml;
        btn.disabled = false;
    }
});

// Fetch Files
async function fetchFiles() {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiBase}/files`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        
        if (res.ok) {
            const files = await res.json();
            renderFiles(files);
        } else if (res.status === 401) {
            logout();
        }
    } catch (err) {
        console.error('Error fetching files', err);
    }
}

// Render Files
function renderFiles(files) {
    if (files.length === 0) {
        filesList.innerHTML = '<div class="file-card"><p style="color: var(--text-muted); text-align: center; width: 100%;">No files uploaded yet.</p></div>';
        return;
    }

    filesList.innerHTML = '';
    files.forEach(file => {
        const date = new Date(file.createdAt).toLocaleDateString();
        const size = formatBytes(file.size);
        const icon = getFileIcon(file.mimetype);

        const card = document.createElement('div');
        card.className = 'file-card';
        card.innerHTML = `
            <div class="file-info">
                <div class="file-icon"><i class="fa-solid ${icon}"></i></div>
                <div class="file-details">
                    <h4>${file.originalName}</h4>
                    <p>${size} • Uploaded ${date}</p>
                </div>
            </div>
            <div class="file-actions">
                <button class="action-btn" onclick="downloadFile('${file._id}', '${file.originalName.replace(/'/g, "\\'")}')" title="Download">
                    <i class="fa-solid fa-download"></i>
                </button>
                <button class="action-btn del-btn" onclick="deleteFile('${file._id}')" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        filesList.appendChild(card);
    });
}

// Download File
async function downloadFile(id, filename) {
    const token = localStorage.getItem('token');
    
    // Fetch it as blob to send the Auth header correctly
    try {
        const res = await fetch(`${apiBase}/files/${id}/download`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.ok) {
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else {
            const data = await res.json();
            alert(data.message || 'Download failed');
        }
    } catch (err) {
        alert('Download error. Please try again.');
    }
}

// Delete File
async function deleteFile(id) {
    if(!confirm('Are you sure you want to delete this file?')) return;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiBase}/files/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        
        if (res.ok) {
            fetchFiles(); // reload list
        } else {
            const data = await res.json();
            alert(data.message || 'Delete failed');
        }
    } catch (err) {
        alert('Delete error. Please try again.');
    }
}

// Start
init();
