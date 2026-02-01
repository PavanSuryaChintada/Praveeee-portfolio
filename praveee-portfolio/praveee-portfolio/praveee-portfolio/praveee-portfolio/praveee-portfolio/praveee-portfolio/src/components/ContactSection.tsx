import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import WireframeGlobe from './WireframeGlobe';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Have a project in mind? Let's create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b-2 border-border py-4 px-0 text-foreground font-sans placeholder:text-muted-foreground focus:outline-none transition-colors duration-300"
                  style={{
                    borderColor: focusedField === 'name' ? 'hsl(var(--primary))' : undefined,
                  }}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b-2 border-border py-4 px-0 text-foreground font-sans placeholder:text-muted-foreground focus:outline-none transition-colors duration-300"
                  style={{
                    borderColor: focusedField === 'email' ? 'hsl(var(--primary))' : undefined,
                  }}
                  required
                />
              </div>

              <div className="relative">
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-border py-4 px-0 text-foreground font-sans placeholder:text-muted-foreground focus:outline-none transition-colors duration-300 resize-none"
                  style={{
                    borderColor: focusedField === 'message' ? 'hsl(var(--primary))' : undefined,
                  }}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-sans font-semibold rounded-full transition-all duration-300 hover:gap-5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitted}
                data-cursor="hover"
              >
                {isSubmitted ? (
                  <>
                    <Check size={20} />
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* 3D Globe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <WireframeGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
