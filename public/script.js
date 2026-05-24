async function sendMessage(messageFromButton = null) {

  const input =
    document.getElementById("user-input");

  const message =
    messageFromButton || input.value.trim();

  if (!message) return;

  /* ADD USER MESSAGE */

  addMessage(
    message,
    "user-message"
  );

  input.value = "";

  /* SHOW TYPING */

  showTyping();

  try {

    const response =
      await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message
        })

      });

    const data =
      await response.json();

    /* REMOVE TYPING */

    removeTyping();

    /* ADD BOT RESPONSE */

    addMessage(
      data.reply,
      "bot-message"
    );

  } catch (error) {

    removeTyping();

    addMessage(
      "Something went wrong. Please try again.",
      "bot-message"
    );

    console.error(error);

  }

}

/* ADD MESSAGE */

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

  const timestamp =
    document.createElement("span");

  timestamp.classList.add(
    "timestamp"
  );

  const time =
    new Date().toLocaleTimeString([], {

      hour: "2-digit",
      minute: "2-digit"

    });

  timestamp.innerText = time;

  messageWrapper.appendChild(
    messageDiv
  );

  messageWrapper.appendChild(
    timestamp
  );

  chatBox.appendChild(
    messageWrapper
  );

  chatBox.scrollTop =
    chatBox.scrollHeight;

  /* SAVE */

  if (save) {

    saveMessage(
      text,
      className,
      time
    );

  }

}

/* TYPING */

function showTyping() {

  const chatBox =
    document.getElementById("chat-box");

  const typingWrapper =
    document.createElement("div");

  typingWrapper.id =
    "typing-wrapper";

  const typing =
    document.createElement("div");

  typing.classList.add(
    "bot-message"
  );

  typing.innerHTML = `

    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>

  `;

  typingWrapper.appendChild(
    typing
  );

  chatBox.appendChild(
    typingWrapper
  );

chatBox.scrollTo({
  top: chatBox.scrollHeight,
  behavior: "smooth"
});
}

/* REMOVE TYPING */

function removeTyping() {

  const typingWrapper =
    document.getElementById(
      "typing-wrapper"
    );

  if (typingWrapper) {

    typingWrapper.remove();

  }

}

/* QUICK REPLY */

function quickReply(text) {

  sendMessage(text);

}

/* ENTER KEY */

document
.getElementById("user-input")
.addEventListener(
  "keypress",
  function(event){

    if(event.key === "Enter"){

      sendMessage();

    }

});

/* SAVE MESSAGE */

function saveMessage(
  text,
  className,
  time
){

  let messages =

    JSON.parse(

      localStorage.getItem(
        "chatMessages"
      )

    ) || [];

  messages.push({

    text,
    className,
    time

  });

  localStorage.setItem(

    "chatMessages",

    JSON.stringify(messages)

  );

}

/* LOAD SAVED */

function loadMessages(){

  const messages =

    JSON.parse(

      localStorage.getItem(
        "chatMessages"
      )

    ) || [];

  messages.forEach(msg => {

    const chatBox =
      document.getElementById(
        "chat-box"
      );

    const wrapper =
      document.createElement("div");

    wrapper.classList.add(
      "message-wrapper"
    );

    const div =
      document.createElement("div");

    div.classList.add(
      msg.className
    );

    div.innerText =
      msg.text;

    const timestamp =
      document.createElement("span");

    timestamp.classList.add(
      "timestamp"
    );

    timestamp.innerText =
      msg.time;

    wrapper.appendChild(div);

    wrapper.appendChild(timestamp);

    chatBox.appendChild(wrapper);

  });

}

/* ON LOAD */

window.onload = () => {

  loadMessages();

  const savedMessages =

    JSON.parse(

      localStorage.getItem(
        "chatMessages"
      )

    );

  if (

    !savedMessages ||

    savedMessages.length === 0

  ) {

    addMessage(

      "Hey there 👋 Welcome to Cloud AI Support. I’m here to help with deployment guidance, APIs, debugging, and scalable infrastructure support. How can I help you today?",

      "bot-message"

    );

  }

};

function clearChat(){

  const chatBox =
    document.getElementById("chat-box");

  chatBox.innerHTML = "";

  localStorage.removeItem("chatMessages");

  addMessage(
    "Chat cleared 🧹 How can I help you today?",
    "bot-message",
    false
  );

}