import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles, Cpu } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
}

export default function Navbar({ isDarkMode, toggleDarkMode, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Academic Journey', id: 'timeline' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress ratio
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-950/80 border-b border-white/5 backdrop-blur-md' 
        : 'bg-white/80 border-b border-slate-200/50 backdrop-blur-md'
    }`}>
      {/* Scroll Progress Line */}
      <div 
        className="h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 absolute bottom-0 left-0 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Futuristic Branding Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className={`p-1.5 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-400 text-white flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300`}>
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className={`font-sans font-extrabold text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Akula Vasanthi
              </span>
              <span className="text-[9px] font-mono tracking-wider text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> CSE (AI) Student
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? isDarkMode 
                        ? 'text-cyan-400 bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                        : 'text-purple-600 bg-purple-100/60 border border-purple-200/40 shadow-sm font-bold'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Control Actions (Theme Switcher + Mobile Trigger) */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10 shadow-md' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 shadow-sm'
              }`}
              title="Toggle Light/Dark Mode"
              id="theme-switcher-toggle"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl border lg:hidden transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`lg:hidden animate-fade-in ${
          isDarkMode ? 'bg-slate-950 border-b border-white/10' : 'bg-white border-b border-slate-200'
        }`}>
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    isActive
                      ? isDarkMode 
                        ? 'text-cyan-400 bg-cyan-950/30 font-bold border-l-2 border-cyan-400' 
                        : 'text-purple-600 bg-purple-50 font-bold border-l-2 border-purple-600'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
