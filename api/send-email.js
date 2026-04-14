export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { fname, lname, email, phone, service, date, message } = req.body;

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: { fname, lname, email, phone, service, date, message }
    })
  });

  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: "Failed to send email" });
  }
}