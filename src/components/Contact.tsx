import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-20"
      style={{ backgroundColor: "hsl(var(--section-bg))", color: "hsl(var(--foreground))" }}
    >
      <div className="section-container">
        <h2 className="section-title pb-4">Contact Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-primary">Get In Touch</h3>
            <p className="mb-8 text-[hsl(var(--muted-foreground))]">
              I'm currently open to new opportunities and collaborations. Feel free to reach out if you'd like to discuss a project or learn more about my work.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="text-primary" size={20} />,
                  title: "Email",
                  content: (
                    <a
                      href="mailto:agathamudivinaykumar@gmail.com"
                      className="hover:text-primary transition-colors text-[hsl(var(--muted-foreground))]"
                    >
                      agathamudivinaykumar@gmail.com
                    </a>
                  ),
                },
                {
                  icon: <Phone className="text-primary" size={20} />,
                  title: "Phone",
                  content: (
                    <a
                      href="tel:+919392454022"
                      className="hover:text-primary transition-colors text-[hsl(var(--muted-foreground))]"
                    >
                      +91 9392454022
                    </a>
                  ),
                },
                {
                  icon: <MapPin className="text-primary" size={20} />,
                  title: "Location",
                  content: <p className="text-[hsl(var(--muted-foreground))]">Srikakulam, Andhra Pradesh, India</p>,
                },
              ].map(({ icon, title, content }, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
                  <div>
                    <h4 className="font-medium text-[hsl(var(--foreground))]">{title}</h4>
                    {content}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.linkedin.com/in/agathamudi-vinay-kumar-0677a4235/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/vinaythanay"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="animate-fade-in delay-200">
            <div
              className="glass-card rounded-xl p-8"
              style={{ backgroundColor: "hsl(var(--section-card-bg))", borderColor: "hsl(var(--border))" }}
            >
              <h3 className="text-xl font-bold mb-6 text-primary">Send a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-[hsl(var(--foreground))]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-[hsl(var(--foreground))]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium mb-1 text-[hsl(var(--foreground))]">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))]"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-[hsl(var(--foreground))]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))]"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <p className="mt-4 text-green-600">Message sent successfully!</p>
                )}
                {submitStatus === "error" && (
                  <p className="mt-4 text-red-600">There was an error sending your message.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
