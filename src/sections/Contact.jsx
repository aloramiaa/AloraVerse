import { useRef, useState } from "react";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      // Discord webhook URL
      const webhookUrl = "https://ptb.discord.com/api/webhooks/1367478877466919023/ryteZkYhxiy9Rr4Eq3QgxDzeUa_d57KiIbfTqHz-uQwk0Cn2jYyYTxqetub-gg53kgP6";
      
      // Create a stylish Discord embed
      const payload = {
        content: "@everyone New message from AloraVerse portfolio!",
        embeds: [
          {
            title: "📩 New Contact Form Submission",
            color: 0x8A2BE2, // Purple color
            fields: [
              {
                name: "💌 From",
                value: form.name,
                inline: true
              },
              {
                name: "📧 Email",
                value: form.email,
                inline: true
              },
              {
                name: "🗨️ Message",
                value: form.message
              },
              {
                name: "📆 Submitted At",
                value: new Date().toLocaleString(),
                inline: true
              }
            ],
            footer: {
              text: "AloraVerse Portfolio Contact Form"
            },
            timestamp: new Date().toISOString()
          }
        ]
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        // Reset form
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(true);
        console.error("Error sending to Discord", await response.text());
      }
    } catch (error) {
      setError(true);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Let's Connect and Create Together"
          sub="💬 Have a cool idea or project? I'd love to hear about it! 🌟"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                {success && (
                  <div className="text-green-500">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {error && (
                  <div className="text-red-500">
                    Something went wrong. Please try again or contact me directly.
                  </div>
                )}

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
