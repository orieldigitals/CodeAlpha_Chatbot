const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "../public")
  )
);

/* SIMPLE MEMORY */

let lastTopic = "";

/* HEALTH CHECK */

app.get("/api/health", (req, res) => {

  res.json({
    status: "OK",
    message: "Cloud AI Support running 🚀"
  });

});

/* CHATBOT */

app.post("/api/chat", (req, res) => {

  const message =
    req.body.message.toLowerCase();

  let reply =
    "I want to make sure I guide you properly 😊 Could you share a little more detail about what you're trying to achieve or the issue you're experiencing?";

  /* GREETING */

  if (

    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")

  ) {

    reply =
      "Hey there 👋 Welcome to Cloud AI Support. I’m here to help with deployment guidance, APIs, debugging, infrastructure support, and scalable cloud systems.";

  }

  /* DEPLOYMENT */

  else if (

    message.includes("deployment") ||
    message.includes("deploy")

  ) {

    lastTopic = "deployment";

    reply =
      "Absolutely — I’d be happy to help with deployment 😊 Are you planning to deploy on AWS, Docker, or another cloud platform?";

  }

  /* AWS */

  else if (

    message.includes("aws")

  ) {

    if (lastTopic === "deployment") {

      reply =
        "Great choice — AWS is widely used for scalable cloud deployments ☁️ Would you like guidance for EC2 virtual servers, Elastic Beanstalk, or Docker container deployment?";

    } else {

      reply =
        "AWS provides powerful cloud infrastructure services including compute, storage, databases, networking, and scalable deployment environments.";

    }

    lastTopic = "aws";

  }

  /* EC2 */

  else if (

    message.includes("ec2")

  ) {

    if (lastTopic === "aws") {

      reply =
        "EC2 is a great starting point because it gives you full control over your Node.js application server. You’ll typically connect using SSH, install Node.js, clone your GitHub repository, and run the application using PM2.";

    }

  }

  /* DOCKER */

  else if (

    message.includes("docker")

  ) {

    lastTopic = "docker";

    reply =
      "Docker helps package your chatbot into portable containers, making deployment much more reliable and scalable across cloud environments.";

  }

  /* DEBUGGING */

  else if (

    message.includes("bug") ||
    message.includes("error") ||
    message.includes("issue") ||
    message.includes("debug")

  ) {

    lastTopic = "debugging";

    reply =
      "I’m sorry you’re running into issues — debugging can definitely feel frustrating sometimes. If you share the error message or describe what’s happening, I’ll help you troubleshoot it step-by-step.";

  }

  /* API */

  else if (

    message.includes("api")

  ) {

    lastTopic = "api";

    reply =
      "APIs are essential for communication between systems. I can help you understand routing, requests, JSON handling, backend integration, and deployment workflows.";

  }

  /* PERFORMANCE */

  else if (

    message.includes("performance") ||
    message.includes("slow") ||
    message.includes("traffic")

  ) {

    lastTopic = "performance";

    reply =
      "Performance optimization becomes really important as applications grow. Techniques like caching, load balancing, database optimization, and auto-scaling can significantly improve reliability and speed.";

  }

  /* SECURITY */

  else if (

    message.includes("security") ||
    message.includes("secure")

  ) {

    lastTopic = "security";

    reply =
      "Cloud security is extremely important 🔐 Best practices usually include HTTPS encryption, environment variables, authentication systems, API protection, and server hardening.";

  }

  setTimeout(() => {

    res.json({ reply });

  }, 1200);

});

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});