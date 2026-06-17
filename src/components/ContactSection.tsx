import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Linkedin, Github, SendHorizontal, AlertCircle, CheckCircle, Database } from 'lucide-react';

interface ContactFormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactSectionProps {
  isDarkMode: boolean;
}

export default function ContactSection({ isDarkMode }: ContactSectionProps) {
  const [form, setForm] = useState<ContactFormState>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Partial<ContactFormState>>({});
  const [sentMessages, setSentMessages] = useState<Array<ContactFormState & { timestamp: string }>>([]);

  const validate = (): boolean => {
    const errors: Partial<ContactFormState> = {};
    if (!form.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!form.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email structure.';
    }
    if (!form.subject.trim()) errors.subject = 'Subject line is required.';
    if (!form.message.trim()) errors.message = 'Message payload cannot be empty.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate cyber transmission channels
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      const timestamp = new Date().toLocaleTimeString();
      setSentMessages((prev) => [...prev, { ...form, timestamp }]);
      setForm({ fullName: '', email: '', subject: '', message: '' });

      // Reset success notification after a few seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1800);
  };

  const cardBgClass = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-md';
  const textInputClass = isDarkMode 
    ? 'bg-slate-950/40 border-white/10 text-white placeholder-gray-500 hover:border-white/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 hover:border-slate-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600';

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/vasanthi-akula-76a084284',
      icon: Linkedin,
      color: 'hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 text-blue-500',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Akulavasanthi',
      icon: Github,
      color: 'hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 text-slate-400',
    },
    {
      name: 'Email Support',
      url: 'mailto:vasanthiakula2005@gmail.com',
      icon: Mail,
      color: 'hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/30 text-pink-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Social / Info pane (Left or Col-5) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-8" id="social-contact-info">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Get In Touch
            </h3>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Let's connect! Always happy to talk about internship projects, software roles, or neural network ideas.
            </p>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${isDarkMode ? 'bg-slate-900/50 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div className="p-2 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Personal Email</span>
                <a href="mailto:vasanthiakula2005@gmail.com" className={`text-xs font-mono font-bold hover:underline break-all ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  vasanthiakula2005@gmail.com
                </a>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${isDarkMode ? 'bg-slate-900/50 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div className="p-2 bg-gradient-to-tr from-cyan-400 to-blue-500 text-white rounded-lg">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">LinkedIn Profile</span>
                <a href="https://linkedin.com/in/vasanthi-akula-76a084284" target="_blank" rel="noopener noreferrer" className={`text-xs font-mono font-bold hover:underline ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Vasanthi Akula
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social channels matrix indicators */}
        <div className="space-y-4">
          <h4 className={`text-xs uppercase font-mono font-bold tracking-widest text-purple-400`}>
            Secure Cyber Grid links:
          </h4>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-3 border rounded-2xl text-xs font-mono transition-all duration-300 ${
                    isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
                  } ${social.color}`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {social.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Stream of submitted mock logs showing durability */}
        <AnimatePresence>
          {sentMessages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 bg-green-500/5 border border-green-500/10 p-3.5 rounded-2xl"
            >
              <span className="text-[10px] uppercase font-mono font-bold text-green-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 animate-pulse" /> Local Transmission Log
              </span>
              <div className="max-h-24 overflow-y-auto space-y-1.5 pr-2">
                {sentMessages.map((msg, idx) => (
                  <div key={idx} className="text-[11px] font-mono text-gray-400 flex justify-between gap-4 border-b border-white/5 pb-1 last:border-0 last:pb-0">
                    <span className="truncate text-green-300 font-semibold">{msg.fullName}: "{msg.subject}"</span>
                    <span className="text-gray-500 shrink-0">{msg.timestamp}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actual Glassmorphism Contact Form (Right or Col-7) */}
      <div className="lg:col-span-7">
        <motion.div
          className={`p-6 rounded-3xl border ${cardBgClass} relative overflow-hidden`}
          whileHover={{ boxShadow: isDarkMode ? '0 15px 35px -5px rgba(124, 58, 237, 0.1)' : '0 15px 35px -5px rgba(0,0,0,0.05)' }}
          transition={{ duration: 0.3 }}
        >
          {/* Aesthetic Scanner line or status border */}
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name field */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-xs font-mono text-gray-400 font-medium">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className={`w-full text-xs font-sans rounded-xl border px-4 py-2.5 outline-none transition-all duration-200 ${textInputClass}`}
                placeholder="Enter your full name"
              />
              {formErrors.fullName && (
                <span className="text-pink-500 text-[10px] font-mono flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                </span>
              )}
            </div>

            {/* Email Address & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-mono text-gray-400 font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full text-xs font-sans rounded-xl border px-4 py-2.5 outline-none transition-all duration-200 ${textInputClass}`}
                  placeholder="contact@gmail.com"
                />
                {formErrors.email && (
                  <span className="text-pink-500 text-[10px] font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.email}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="block text-xs font-mono text-gray-400 font-medium">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`w-full text-xs font-sans rounded-xl border px-4 py-2.5 outline-none transition-all duration-200 ${textInputClass}`}
                  placeholder="Inquiry Topic"
                />
                {formErrors.subject && (
                  <span className="text-pink-500 text-[10px] font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.subject}
                  </span>
                )}
              </div>
            </div>

            {/* Message payload */}
            <div className="space-y-1">
              <label htmlFor="message" className="block text-xs font-mono text-gray-400 font-medium">Message Details</label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`w-full text-xs font-sans rounded-xl border px-4 py-2.5 outline-none transition-all duration-200 resize-none ${textInputClass}`}
                placeholder="Type your message payload..."
              />
              {formErrors.message && (
                <span className="text-pink-500 text-[10px] font-mono flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.message}
                </span>
              )}
            </div>

            {/* Submit progress */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-2">
              <span className="text-[11px] text-gray-500 font-mono italic">
                {isSubmitting ? 'Channel handshake established...' : 'Secure SSL connection encryption is active.'}
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                id="btn-send-message"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isSubmitting
                    ? 'bg-cyan-900/30 text-cyan-300 border border-cyan-500/20 shadow-none cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:glow-cyan text-white shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transform hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Database className="w-4 h-4 animate-spin text-cyan-400" />
                    Transmitting Package...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Success alerting prompts */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono flex items-center gap-2.5 mt-2"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Transmission Handshake Success!</span>
                    <span>Your message payload has been buffered in the local session log of this app.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
