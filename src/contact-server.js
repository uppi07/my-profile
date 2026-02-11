import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: [
    "https://my-profile-rosy-alpha.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["POST"]
}));

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const { name = "", email = "", message = "" } = req.body || {};

    if (!email.trim()) {
      return res.status(400).json({ ok: false, error: "Email required" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, // MUST be false for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },

      // prevent hanging
      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 20000,

      // debug logs in Render
      logger: true,
      debug: true
    });

    // verify SMTP connection before sending
    await transporter.verify();

    const subject = `Portfolio inquiry from ${name || "visitor"}`;
    const text = `
Name: ${name || "(not provided)"}
Email: ${email}

Message:
${message || "(no message)"}
`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject,
      text
    });

    res.json({ ok: true });

  } catch (err) {
    console.error("Mail send failed:", err);
    res.status(500).json({
      ok: false,
      error: err.message || "Send failed"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact server listening on port ${PORT}`);
});
