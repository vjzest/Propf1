import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MailIcon, UserIcon, PencilAltIcon } from "@heroicons/react/solid";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📬 Contact Us
        </h2>

        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6 text-center">
            Thank you for your message! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Message subject"
                className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your message..."
                className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
