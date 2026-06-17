import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, FileText, Mail, Sparkles, Terminal, 
  Cpu, Award, MessageSquare, GraduationCap, ChevronRight, 
  ExternalLink, Github, Link, Database 
} from 'lucide-react';

import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import SkillsSection from './components/SkillsSection';
import Timeline from './components/Timeline';
import InteractivePredictor from './components/InteractivePredictor';
import AchievementsAndCerts from './components/AchievementsAndCerts';
import ContactSection from './components/ContactSection';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // default to futuristic dark theme
  });

  // App level loading simulation state for authentic futuristic feeling
  const [loading, setLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState('Initializing Core Layouts...');
  const [loadingPercent, setLoadingPercent] = useState(0);

  // Active navigation section state
  const [activeSection, setActiveSection] = useState('home');

  // Typewriter effect states
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'AI Enthusiast',
    'CSE (Artificial Intelligence) Student',
    'Future AI Engineer',
    'Machine Learning Learner',
    'Passionate Problem Solver'
  ];

  // Sync dark mode class configuration
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#0F172A';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#F8FAFC';
    }
  }, [isDarkMode]);

  // Cyber space boot loader timeline simulation
  useEffect(() => {
    const stages = [
      { pct: 25, label: 'Mounting Interactive Particle Matrices...' },
      { pct: 50, label: 'Synergizing Multi-Epoch Linear Models...' },
      { pct: 75, label: 'Binding Glassmorphic Layout Components...' },
      { pct: 100, label: 'Network Handshake Standard Approved!' }
    ];

    let currentStageIdx = 0;
    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }

        const nextVal = prev + Math.floor(Math.random() * 5) + 3;
        const currentCap = Math.min(nextVal, 100);

        if (currentStageIdx < stages.length && currentCap >= stages[currentStageIdx].pct) {
          setLoadingStage(stages[currentStageIdx].label);
          currentStageIdx++;
        }

        return currentCap;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Multiphrase typewriter effect
  useEffect(() => {
    if (loading) return;

    let timer: NodeJS.Timeout;
    const activePhrase = phrases[phraseIndex];
    const speed = isDeleting ? 30 : 60;

    const handleType = () => {
      if (!isDeleting) {
        // Appending characters
        setTypewriterText(activePhrase.substring(0, typewriterIndex + 1));
        setTypewriterIndex((prev) => prev + 1);

        if (typewriterIndex >= activePhrase.length) {
          // Finished typing, pause, then delete
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Removing characters
        setTypewriterText(activePhrase.substring(0, typewriterIndex - 1));
        setTypewriterIndex((prev) => prev - 1);

        if (typewriterIndex <= 1) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypewriterIndex(0);
        }
      }

      timer = setTimeout(handleType, speed);
    };

    timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [typewriterIndex, isDeleting, phraseIndex, loading]);

  // Section observer to switch navigation active status on scrolling
  useEffect(() => {
    if (loading) return;

    const sections = ['home', 'about', 'timeline', 'skills', 'projects', 'achievements', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // check within active center quadrant
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Mock Resume Printer / Viewer window
  const handleDownloadResume = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked! Please allow popups to open the interactive resume.');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Akula Vasanthi - Digital Curriculum Vitae</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #1e293b;
              max-width: 800px;
              margin: 40px auto;
              padding: 0 20px;
              line-height: 1.6;
            }
            .header {
              border-bottom: 2px solid #7c3aed;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            h1 { margin: 0; color: #0f172a; font-size: 28px; }
            h2 { color: #7c3aed; margin-top: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; font-size: 18px; }
            h3 { margin: 5px 0 0 0; font-size: 14px; color: #475569; }
            .meta { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #06b6d4; margin-top: 8px; }
            .section-lbl { font-weight: bold; margin-top: 10px; font-size: 13px; color: #0f172a; }
            ul { margin: 5px 0 15px 20px; padding: 0; }
            li { margin-bottom: 5px; font-size: 13px; }
            .btn-print {
              background: #7c3aed;
              color: #fff;
              border: none;
              padding: 10px 18px;
              font-size: 12px;
              font-weight: bold;
              border-radius: 8px;
              cursor: pointer;
              float: right;
              font-family: 'Inter', sans-serif;
            }
            @media print {
              .btn-print { display: none; }
              body { margin: 20px auto; }
            }
          </style>
        </head>
        <body>
          <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
          
          <div class="header">
            <h1>Akula Vasanthi</h1>
            <h3>AI Enthusiast | CSE (AI) Student | Future AI Engineer</h3>
            <div class="meta">
              Email: vasanthiakula2005@gmail.com | LinkedIn: linkedin.com/in/vasanthi-akula-76a084284 | Location: India
            </div>
          </div>

          <p style="font-size: 13px;">
            Final-year Computer Science Engineering student specializing in Artificial Intelligence. Passionate about exploring machine learning algorithms, database schemas, data analytics, and implementing production-grade digital solutions to solve real-world complexities.
          </p>

          <h2>EDUCATION</h2>
          <div class="section-lbl">Bachelor of Technology (Computer Science Engineering - AI)</div>
          <div style="font-size: 12px; color: #64748b;">Siddharth Institute of Engineering and Technology | 2022 - 2026 (Final Year Student)</div>
          
          <div class="section-lbl">Diploma (Computer Science and Engineering - DCME)</div>
          <div style="font-size: 12px; color: #64748b;">Completed | First Class with Distinction</div>

          <div class="section-lbl">Secondary School Certificate (SSC)</div>
          <div style="font-size: 12px; color: #64748b;">Completed | Strong Academic Performance</div>

          <h2>INTERNSHIP</h2>
          <div class="section-lbl">Foundations of AI Internship</div>
          <div style="font-size: 12px; color: #64748b;">Edunet Foundation (In collaboration with Microsoft) | 2024 Scope</div>
          <ul>
            <li>Acquired foundational knowledge of artificial intelligence paradigms and neural activations.</li>
            <li>Constructed practical datasets, preprocess routines, and linear regressors.</li>
            <li>Leveraged Python, Pandas, NumPy, Scikit-learn, and Matplotlib.</li>
          </ul>

          <h2>PROJECTS</h2>
          <div class="section-lbl">House Price Prediction System</div>
          <div style="font-size: 12px; color: #64748b;">Machine Learning Project</div>
          <ul>
            <li>Engineered algorithms to predict property prices dynamically on multi-feature inputs.</li>
            <li>Conducted comprehensive exploration of data preparation, linear modeling, and regression coefficient optimization.</li>
          </ul>

          <h2>TECHNICAL SKILLS</h2>
          <ul>
            <li><strong>Programming:</strong> Python, Java, SQL, HTML, CSS, JavaScript</li>
            <li><strong>AI & Data Science:</strong> Machine Learning, Linear Regression, Data Analysis, Data Visualization, Model Training</li>
            <li><strong>Developer Tools:</strong> Google AI Studio, ChatGPT, Claude, GitHub, VS Code, Canva</li>
          </ul>

          <h2>CERTIFICATIONS & HONORS</h2>
          <ul>
            <li>Foundations of AI certification issued by Edunet Foundation and Microsoft.</li>
            <li>Gained valuable understanding of agile standards, collaborative spaces, and safe AI principles.</li>
          </ul>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const mainBgClass = isDarkMode ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-slate-900';
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const descColor = isDarkMode ? 'text-gray-400' : 'text-slate-600';
  const sectionDividerClass = isDarkMode ? 'border-white/5' : 'border-slate-200';

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-400 ${mainBgClass}`}>
      
      {/* 3D Neural Particle attraction simulation background layer */}
      <ParticleBackground isDarkMode={isDarkMode} />

      {/* Cyber Loader UI */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="cyber-loader-container"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#070B19] flex flex-col items-center justify-center p-6"
          >
            <div className="max-w-md w-full text-center space-y-6">
              {/* Spinning core node graphics */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500 animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-2 rounded-full border border-purple-500/30 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-[0.25em]">
                  Booting AI Neural Network
                </h2>
                <div className="text-[11px] font-mono text-slate-500 h-4">
                  {loadingStage}
                </div>
              </div>

              {/* Loader percentage slider bar */}
              <div className="space-y-1">
                <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"
                    style={{ width: `${loadingPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>SSL_HANDSHAKE_OK</span>
                  <span>{loadingPercent}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Transparent high fidelity header */}
          <Navbar 
            isDarkMode={isDarkMode} 
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
            activeSection={activeSection}
          />

          <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-28 md:space-y-36">

            {/* SECTION 1: HERO HOME BANNER */}
            <section id="home" className="min-h-[calc(100vh-140px)] flex flex-col justify-center py-6 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Introduction column */}
                <div className="lg:col-span-7 space-y-6 text-left" id="hero-intro-text">
                  <div className={`p-1.5 rounded-full inline-flex items-center gap-2 border text-xs font-mono pr-4 ${
                    isDarkMode ? 'bg-white/5 border-white/5 text-cyan-400' : 'bg-purple-50 border-purple-100 text-purple-700'
                  }`}>
                    <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-bold animate-pulse text-[9px] uppercase">
                      OPEN_FOR_ROLES
                    </span>
                    <span className="text-[10px]">&bull; CSE (Artificial Intelligence) Engineer</span>
                  </div>

                  <div className="space-y-2">
                    <h1 className={`text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight ${headingColor}`}>
                      Hi, I'm <br className="sm:hidden" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 hover:brightness-110 transition-all duration-300">
                        Akula Vasanthi
                      </span>
                    </h1>

                    {/* Animated dynamic typewriter text */}
                    <div className="h-8 md:h-10 flex items-center">
                      <span className={`text-lg md:text-xl font-display font-medium text-purple-500 ${isDarkMode ? 'dark:text-cyan-400' : ''}`}>
                        {typewriterText}
                      </span>
                      <span className="inline-block w-[3px] h-5 ml-1 bg-cyan-400 animate-pulse shrink-0" />
                    </div>
                  </div>

                  <p className={`text-sm md:text-base leading-relaxed max-w-xl ${descColor}`}>
                    Final-year CSE (AI) student passionate about building Artificial Intelligence paradigms, Machine Learning models, and optimizing Data Analytics frameworks to build innovative, intelligent solutions.
                  </p>

                  <blockquote className={`pl-4 border-l-2 text-xs italic ${isDarkMode ? 'border-cyan-400/30 text-gray-400' : 'border-purple-300 text-slate-500'}`}>
                    "Transforming Ideas into Intelligent Solutions with AI & Technology"
                  </blockquote>

                  {/* Multi action digital items CTAs */}
                  <div className="flex flex-wrap gap-4 pt-4" id="hero-action-buttons">
                    <button
                      onClick={() => handleScrollTo('projects')}
                      id="btn-view-projects"
                      className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:glow-cyan text-white text-xs font-mono font-bold uppercase tracking-wider px-5 py-3.5 rounded-2xl cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                    >
                      View Projects
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </button>

                    <button
                      onClick={handleDownloadResume}
                      id="btn-download-resume"
                      className={`flex items-center gap-2 border px-5 py-3.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white shadow-sm'
                          : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-800 shadow-sm'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-purple-400" />
                      View/Print CV
                    </button>

                    <button
                      onClick={() => handleScrollTo('contact')}
                      id="btn-contact-me"
                      className={`flex items-center gap-2 border px-5 py-3.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white shadow-sm'
                          : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-800 shadow-sm'
                      }`}
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      Contact Me
                    </button>
                  </div>
                </div>

                {/* Cybernetic portrait Column (Right or Col-5) */}
                <div className="lg:col-span-5 flex justify-center" id="hero-avatar-portrait">
                  <motion.div
                    initial={{ opacity: 0, Math: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
                  >
                    {/* Glowing outer rotating concentric ring overlays */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-purple-500/30 animate-spin" style={{ animationDuration: '30s' }} />
                    <div className="absolute -inset-4 rounded-[2.5rem] border border-cyan-400/20 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />

                    {/* Frame container */}
                    <div className={`absolute inset-4 rounded-2xl overflow-hidden border ${
                      isDarkMode ? 'border-white/10 bg-slate-950/80 shadow-[0_0_50px_rgba(124,58,237,0.2)]' : 'border-slate-200 bg-white shadow-lg'
                    }`}>
                      <img 
                        src="/src/assets/images/portfolio_avatar_1781511419097.jpg" 
                        alt="Akula Vasanthi Cyber Port" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-500"
                      />
                      
                      {/* Futuristic scanning graphics layer */}
                      <span className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-purple-500/10 pointer-events-none" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 cyber-scanline opacity-75 shadow-[0_0_10px_#06B6D4]" />
                      
                      <div className="absolute bottom-3 left-3 right-3 glass-card py-2 px-3 rounded-xl border border-white/10 text-center">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 block font-semibold animate-pulse">
                          AI Core System Active
                        </span>
                        <span className="text-[10px] font-mono text-white">
                          VASANTHI_AKULA_INIT.py
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            {/* SECTION 2: BENTO STATISTICS ROW */}
            <section id="statistics" className="py-2.5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="stats-dashboard-grid">
                {[
                  { value: '1+ Major ML Projects', label: 'Undergrad Assets', desc: 'Predictive algorithm engines', icon: Cpu, color: 'text-purple-400', borderGlow: 'hover:border-purple-500/20' },
                  { value: '1 Industrial Internship', label: 'Foundations of AI', desc: 'Microsoft - Edunet Corp', icon: Award, color: 'text-cyan-400', borderGlow: 'hover:border-cyan-500/20' },
                  { value: 'Final Year Student', label: 'B.Tech Specialization', desc: 'CSE (Artificial Intelligence)', icon: GraduationCap, color: 'text-pink-400', borderGlow: 'hover:border-pink-500/20' },
                  { value: 'AI Enthusiast', label: 'Technology Core', desc: 'Deep analytics advocate', icon: Sparkles, color: 'text-violet-400', borderGlow: 'hover:border-violet-500/20' }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className={`p-5 rounded-2xl border ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/5 hover:bg-white/8' 
                          : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                      } ${stat.borderGlow} transition-all duration-300`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                        <span className="text-[8px] font-mono text-gray-500">Node_ID: 0{idx + 1}</span>
                      </div>
                      <h4 className={`text-sm font-sans font-bold ${headingColor} truncate`}>
                        {stat.value}
                      </h4>
                      <p className="text-xs font-mono font-bold text-cyan-400 mt-1">
                        {stat.label}
                      </p>
                      <p className={`text-[10px] mt-1 ${descColor}`}>
                        {stat.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: ABOUT ME GRID */}
            <section id="about" className="scroll-mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Visual quote panel (Left Col-5) */}
                <div className="lg:col-span-5 space-y-6" id="about-quotes-card">
                  <div className={`p-6 rounded-3xl border relative overflow-hidden group ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/40 border-purple-500/10' 
                      : 'bg-gradient-to-br from-purple-50 to-white border-purple-100 shadow-sm'
                  }`}>
                    <span className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
                    
                    <div className="flex justify-between border-b border-white/5 pb-4 mb-4 items-center">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        Telemetry / Objective
                      </span>
                      <Terminal className="w-4 h-4 text-purple-400" />
                    </div>

                    <h3 className={`text-xl font-heading font-extrabold ${headingColor} leading-snug`}>
                      Specializing in Intelligent Engineering Systems
                    </h3>

                    <p className={`text-xs mt-3 leading-relaxed ${descColor}`}>
                      Constructing clean pipelines from raw data to robust estimations. Harnessing Linear formulation math to yield accurate value predictions.
                    </p>

                    <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                      <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/15">Python</span>
                      <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/15">MachineLearning</span>
                      <span className="text-[10px] font-mono bg-pink-500/10 text-pink-400 px-2 py-1 rounded border border-pink-500/15">LinearAlgebra</span>
                    </div>
                  </div>
                </div>

                {/* Long description panel (Right Col-7) */}
                <div className="lg:col-span-7 space-y-6" id="about-detailed-paragraphs">
                  <div>
                    <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3 inline-block">
                      Profile Paradigm
                    </span>
                    <h2 className={`text-3xl md:text-4xl font-heading font-extrabold ${headingColor}`}>
                      About Me
                    </h2>
                  </div>

                  <div className={`space-y-4 text-sm leading-relaxed ${descColor}`}>
                    <p>
                      I am a passionate Computer Science Engineering student specializing in **Artificial Intelligence**. I enjoy exploring cutting-edge AI technologies, solving critical real-world problems, and programming robust intelligent systems. My interests center on **Machine Learning**, **Data Analytics**, functional **AI Tools**, and custom **Software Development**.
                    </p>
                    <p>
                      Currently, I am focused on strengthening my foundational problem-solving abilities, building interactive regressors, and preparing for high-impact software and AI-related career opportunities in the tech sector.
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {[
                      'Python Modeling Pipeline',
                      'Foundations Of Machine Learning',
                      'Preprocessing Structured Datasets',
                      'Agile Project Implementation Standards'
                    ].map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'} font-sans font-medium`}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 4: EDUCATIONAL TIMELINE */}
            <section id="timeline" className="scroll-mt-20">
              <Timeline isDarkMode={isDarkMode} />
            </section>

            {/* SECTION 5: SKILL METER GRID */}
            <section id="skills" className="scroll-mt-20">
              <SkillsSection isDarkMode={isDarkMode} />
            </section>

            {/* SECTION 6: PROJECTS FEATURED & LIVE SIMULATION INTERACTIVE SANDBOX */}
            <section id="projects" className="scroll-mt-20 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Meta details (Left Col-5) */}
                <div className="lg:col-span-5 space-y-6" id="projects-metadata-aside">
                  <div>
                    <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 mb-3 inline-block">
                      Showcase Repositories
                    </span>
                    <h2 className={`text-3xl md:text-4xl font-heading font-extrabold ${headingColor}`}>
                      Featured Projects
                    </h2>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                      Deploying machine learning models directly into sandbox components.
                    </p>
                  </div>

                  {/* House Price card */}
                  <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/5 shadow-md' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-purple-400 block mb-2">
                      Machine Learning Module
                    </span>
                    <h3 className={`text-lg font-bold font-sans mb-2 ${headingColor}`}>
                      House Price Prediction System
                    </h3>
                    <p className={`text-xs ${descColor} leading-relaxed mb-4`}>
                      Developed and compiled a linear regression machine learning algorithm using property features to predict real estate valuation arrays with strong correlation.
                    </p>

                    <h4 className="text-[10px] font-mono uppercase font-bold text-gray-500 tracking-wider mb-2">
                      Core Implementation Stack:
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib'].map((tech) => (
                        <span key={tech} className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/Akulavasanthi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 hover:brightness-110"
                      >
                        <Github className="w-4.5 h-4.5" />
                        Rep Codebase
                      </a>
                      <span className="text-gray-600">|</span>
                      <button
                        onClick={() => handleScrollTo('interactive-predictor')}
                        className="flex items-center gap-1 text-xs font-mono font-bold text-purple-400 hover:brightness-110 cursor-pointer"
                      >
                        <Link className="w-4.5 h-4.5" />
                        Launcer Simulator
                      </button>
                    </div>
                  </div>
                </div>

                {/* Executable ML sandbox simulator (Right Col-7) */}
                <div className="lg:col-span-7">
                  <InteractivePredictor />
                </div>

              </div>
            </section>

            {/* SECTION 7: ACHIEVEMENTS & ACCREDITATIONS */}
            <section id="achievements" className="scroll-mt-20">
              <AchievementsAndCerts isDarkMode={isDarkMode} />
            </section>

            {/* SECTION 8: CONTACT PANEL & SECURE NETWORKS */}
            <section id="contact" className="scroll-mt-20">
              <ContactSection isDarkMode={isDarkMode} />
            </section>

          </main>

          {/* HIGH POLISHED CYBER FOOTER */}
          <footer className={`border-t py-12 transition-colors duration-400 ${
            isDarkMode ? 'border-white/5 bg-slate-950/60' : 'border-slate-200 bg-white shadow-inner'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              
              <div className="relative w-10 h-10 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/60 animate-spin" style={{ animationDuration: '10s' }} />
                <Cpu className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>

              <blockquote className={`text-base font-heading italic max-w-xl mx-auto ${headingColor}`}>
                "Artificial Intelligence is not just technology; <br />it's the future I am building."
              </blockquote>

              <div className="flex items-center justify-center gap-4 text-xs font-mono">
                <a href="https://linkedin.com/in/vasanthi-akula-76a084284" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  LinkedIn
                </a>
                <span className="text-gray-600">&bull;</span>
                <a href="https://github.com/Akulavasanthi" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                  GitHub
                </a>
                <span className="text-gray-600">&bull;</span>
                <a href="mailto:vasanthiakula2005@gmail.com" className="hover:text-pink-400 transition-colors">
                  Email
                </a>
              </div>

              <div className="text-[10px] font-mono text-gray-500 space-y-1">
                <p>&copy; 2026 Akula Vasanthi. All Rights Reserved.</p>
                <p>Telemetry Node: SIET_CSE_AI_BLOCK_2026</p>
              </div>

            </div>
          </footer>
        </>
      )}

    </div>
  );
}
