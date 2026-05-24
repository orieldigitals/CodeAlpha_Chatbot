let currentChatId = null;
let chats = {};

/* =========================
   SEND MESSAGE
========================= */

async function sendMessage(messageFromButton = null) {

  const input = document.getElementById("user-input");

  const message =
    messageFromButton || input.value.trim();

  if (!message) return;

  addMessage(
    message,
    "user-message"
  );

  input.value = "";

  showTyping();

  try {

    const response = await fetch("/api/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ message })

    });

    const data = await response.json();

    console.log(data);

    removeTyping();

    addMessage(
      data.reply,
      "bot-message"
    );

  } catch (error) {

    removeTyping();

    addMessage(
      "Something went wrong while connecting to the server. Please try again.",
      "bot-message"
    );

  }

}

/* =========================
   ADD MESSAGE
========================= */

function addMessage(
  text,
  className,
  save = true
) {

  const chatBox =
    document.getElementById("chat-box");

  const messageWrapper =
    document.createElement("div");

  messageWrapper.classList.add(
    "message-wrapper"
  );

  const messageDiv =
    document.createElement("div");

  messageDiv.classList.add(className);

  messageDiv.innerText = text;

  /* TIMESTAMP */

  const time =
    document.createElement("div");

  time.classList.add("timestamp");

  const now = new Date();

  time.innerText =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  messageWrapper.appendChild(messageDiv);

  messageWrapper.appendChild(time);

  chatBox.appendChild(messageWrapper);

  /* AUTO SCROLL */

  chatBox.scrollTop =
    chatBox.scrollHeight;

  /* SAVE CHAT */

  if (save) {

    if (!currentChatId) {
      newChat();
    }

    if (!chats[currentChatId]) {
      chats[currentChatId] = [];
    }

    chats[currentChatId].push({
      text,
      className
    });

    saveChats();

    renderChatHistory();

  }

}

/* =========================
   TYPING INDICATOR
========================= */

function showTyping() {

  const chatBox =
    document.getElementById("chat-box");

  const typing =
    document.createElement("div");

  typing.classList.add(
    "bot-message"
  );

  typing.id = "typing";

  typing.innerText =
    "AI Support Assistant is typing...";

  typing.style.opacity = "0.7";

  chatBox.appendChild(typing);

  chatBox.scrollTop =
    chatBox.scrollHeight;

}

function removeTyping() {

  const typing =
    document.getElementById("typing");

  if (typing) {
    typing.remove();
  }

}

/* =========================
   QUICK REPLIES
========================= */

function quickReply(text) {
  sendMessage(text);
}

/* =========================
   ENTER KEY SUPPORT
========================= */

document
.getElementById("user-input")
.addEventListener("keypress", function(event){

  if(event.key === "Enter"){
    sendMessage();
  }

});

/* =========================
   CHAT STORAGE
========================= */

function saveChats() {

  localStorage.setItem(
    "allChats",
    JSON.stringify(chats)
  );

}

function loadChats() {

  const saved =
    localStorage.getItem("allChats");

  if(saved){
    chats = JSON.parse(saved);
  }

}

/* =========================
   NEW CHAT
========================= */

function newChat() {

  currentChatId =
    "chat_" + Date.now();

  chats[currentChatId] = [];

  saveChats();

  renderChatHistory();

  document.getElementById(
    "chat-box"
  ).innerHTML = "";

  addMessage(
    "Hello 👋 I’m your AI Support Assistant. How can I help you today?",
    "bot-message",
    false
  );

}

/* =========================
   RENDER SIDEBAR
========================= */

function renderChatHistory() {

  const history =
    document.getElementById(
      "chat-history"
    );

  history.innerHTML = "";

  Object.keys(chats)
  .reverse()
  .forEach(id => {

    const item =
      document.createElement("div");

    item.classList.add(
      "chat-item"
    );

    if(id === currentChatId){
      item.classList.add("active");
    }

    const firstMessage =
      chats[id][0]?.text ||
      "New Conversation";

    item.innerText =
      firstMessage.substring(0, 30);

    item.onclick = () => {
      loadChat(id);
    };

    history.appendChild(item);

  });

}

/* =========================
   LOAD CHAT
========================= */

function loadChat(id) {

  currentChatId = id;

  const chatBox =
    document.getElementById(
      "chat-box"
    );

  chatBox.innerHTML = "";

  chats[id].forEach(msg => {

    addMessage(
      msg.text,
      msg.className,
      false
    );

  });

  renderChatHistory();

}

/* =========================
   CLEAR CHAT
========================= */

function clearChat() {

  if (!currentChatId) return;

  chats[currentChatId] = [];

  saveChats();

  document.getElementById(
    "chat-box"
  ).innerHTML = "";

  addMessage(
    "Chat cleared 🧹 How can I help you today?",
    "bot-message",
    false
  );

  renderChatHistory();

}

/* =========================
   APP INIT
========================= */

window.onload = () => {

  loadChats();

  const keys =
    Object.keys(chats);

  if(keys.length > 0){

    currentChatId = keys[0];

    loadChat(currentChatId);

  } else {

    newChat();

  }

};