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
      "Hey there 👋 Welcome to Cloud AI Support. I’m here to help with deployment guidance, APIs, debugging, and cloud infrastructure support.";

  }

  /* SERVICES */

  else if (
    message.includes("services")
  ) {

    reply =
      "We help businesses build scalable cloud systems, AI-powered applications, REST APIs, deployment pipelines, and modern infrastructure solutions designed for reliability and growth.";

  }

  /* PRICING */

  else if (
    message.includes("pricing") ||
    message.includes("price")
  ) {

    reply =
      "Pricing usually depends on your application size, cloud resources, expected traffic, and deployment complexity. I can also help you understand which setup may fit your project best.";

  }

  /* SUPPORT */

  else if (
    message.includes("support") ||
    message.includes("help")
  ) {

    reply =
      "Absolutely — I can help with deployment setup, debugging issues, server configuration, cloud infrastructure guidance, and API troubleshooting step-by-step.";

  }

  /* DEPLOYMENT */

  else if (
    message.includes("deployment") ||
    message.includes("aws")
  ) {

    reply =
      "AWS deployment is a great next step once your application is stable locally. You can deploy this chatbot using EC2, Docker containers, or Elastic Beanstalk depending on your preferred workflow.";

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