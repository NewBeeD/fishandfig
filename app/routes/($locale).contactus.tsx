import { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit logic (e.g. API call)
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white text-gray-800">
      {/* Header */}
      <section className="w-full text-center py-12 bg-[#f68b1f] text-white">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg">We'd love to hear from you</p>
      </section>

      {/* Contact Info and Form */}
      <section className="w-[90%] max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
          <p>📍 Bioche, St. Peters, Dominica</p>
          <p>📞 +1 (767) 614-0626</p>
          <p>📧 hello@yourbusiness.com</p>
          <p>🕒 Mon–Friday: 8 AM – 4 PM</p>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/1767612XXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-[#f68b1f] text-white font-semibold rounded hover:bg-green-600 transition"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            required
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          ></textarea>
          <button type="submit" className="bg-[#f68b1f] text-white px-6 py-3 rounded hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </section>

      {/* Google Map */}
      <section className="w-full max-w-5xl px-4 pb-12">
        <a
          href="https://www.google.com/maps/place/15%C2%B030'30.9%22N+61%C2%B028'01.2%22W/@15.508595,-61.467004,1094m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d15.508595!4d-61.467004?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[#f68b1f] text-white font-bold rounded hover:bg-blue-700 transition"
        >
          📍 View Map Location
        </a>


      </section>
    </div>
  );
};

export default ContactUs;
