async function sendMessage(messageFromButton = null) {

  const input = document.getElementById("user-input");

  const message = messageFromButton || input.value.trim();

  if (!message) return;

  addMessage(message, "user-message");

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

    removeTyping();

    addMessage(data.reply, "bot-message");

  } catch (error) {

    removeTyping();

    addMessage(
      "Something went wrong. Please try again.",
      "bot-message"
    );
  }
}

function addMessage(text, className) {

  const chatBox = document.getElementById("chat-box");

  const messageDiv = document.createElement("div");

  messageDiv.classList.add(className);

  messageDiv.innerText = text;

  chatBox.appendChild(messageDiv);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {

  const chatBox = document.getElementById("chat-box");

  const typing = document.createElement("div");

  typing.classList.add("bot-message");

  typing.id = "typing";

  typing.innerText = "AI Support Assistant is typing...";

  typing.style.opacity = "0.7";

  chatBox.appendChild(typing);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {

  const typing = document.getElementById("typing");

  if (typing) {
    typing.remove();
  }
}

function quickReply(text) {
  sendMessage(text);
}

/* ENTER KEY SUPPORT */

document
.getElementById("user-input")
.addEventListener("keypress", function(event){

  if(event.key === "Enter"){
    sendMessage();
  }

});