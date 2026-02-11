import express from "express";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const { name = "", email = "", message = "" } = req.body || {};
    if (!email.trim()) {
      return res.status(400).json({ ok: false, error: "Email required" });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      MAIL_FROM = SMTP_USER,
      MAIL_TO = process.env.MAIL_TO || SMTP_USER
    } = process.env;

    const missingEnv = !SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS;
    if (missingEnv) {
      if (isProd) {
        return res.status(500).json({ ok: false, error: "SMTP env vars missing" });
      }

      console.warn("[contact] SMTP env vars missing; skipping send (dev mode).", {
        name,
        email,
        message
      });

      return res.json({ ok: true, skipped: true });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for others
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const subject = `Portfolio inquiry from ${name || "visitor"}`;
    const text = [
      `Name: ${name || "(not provided)"}`,
      `Email: ${email}`,
      "",
      "Message:",
      message || "(no message)"
    ].join("\n");

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject,
      replyTo: email,
      text
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Mail send failed:", err);
    res.status(500).json({ ok: false, error: "Send failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Contact server listening on http://localhost:${PORT}`);
});
