const socket = io();

const joinContainer = document.getElementById('join-container');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('join-btn');
const chatMessages = document.getElementById('chat-messages');
const msgInput = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');

let currentUsername = '';

joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username !== '') {
        currentUsername = username;
        socket.emit('join', username);
        joinContainer.classList.add('hidden');
        chatContainer.classList.remove('hidden');
    }
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinBtn.click();
    }
});

sendBtn.addEventListener('click', () => {
    const msg = msgInput.value.trim();
    if (msg !== '') {
        socket.emit('chatMessage', msg);
        msgInput.value = '';
        msgInput.focus();
    }
});

msgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

socket.on('message', (data) => {
    const div = document.createElement('div');
    
    if (data.type === 'notification') {
        div.classList.add('notification');
        div.innerText = data.text;
    } else {
        div.classList.add('message');
        if (data.username === currentUsername) {
            div.classList.add('self');
            div.innerText = data.text;
        } else {
            div.classList.add('other');
            div.innerHTML = `<div class="username">${data.username}</div><div>${data.text}</div>`;
        }
    }
    
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
});
