import { motion } from 'motion/react';
import { Award, ShieldCheck, Cpu, Sparkles, BookOpen, Target, CheckSquare } from 'lucide-react';
import { CertificationItem, AchievementItem } from '../types';

interface AchievementsAndCertsProps {
  isDarkMode: boolean;
}

export default function AchievementsAndCerts({ isDarkMode }: AchievementsAndCertsProps) {
  const certifications: CertificationItem[] = [
    {
      title: 'Foundations of AI Cert',
      issuer: 'Edunet Foundation & Microsoft Collaboration',
      date: '2024 Scope',
      highlights: [
        'AI Core Principles: Conceptualized model building architectures from scratch.',
        'Machine Learning: Solidified concepts of regression, normalization & feature scaling.',
        'Data Analysis: Mastered preprocessing pipelines for raw unstructured arrays.',
        'AI Project Showcase: Successfully verified house pricing regressors with optimal validation loss.',
      ]
    }
  ];

  const achievements: AchievementItem[] = [
    {
      id: 'ach-1',
      title: 'Completed AI Internship',
      description: 'Collaborated in industrial cohorts to preprocessing telemetry data and validate regression outputs.',
      metric: 'Edunet & Microsoft'
    },
    {
      id: 'ach-2',
      title: 'House Price Predictor System',
      description: 'Programmed an end-to-end Python ML model utilizing Linear Regression with Scikit-learn.',
      metric: 'Live Demonstration'
    },
    {
      id: 'ach-3',
      title: 'Learning Problem Solving',
      description: 'Regularly solving computer science problems to optimize algorithm complexity index.',
      metric: 'Python & Java Code'
    },
    {
      id: 'ach-4',
      title: 'Exploring Advanced AI Tools',
      description: 'Automating developer tasks and prompt engineering with Google AI Studio, Claude, and Gemini APIs.',
      metric: 'LLM Foundations'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 18 } }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      {/* Certifications Block (Left Col-5) */}
      <div id="certifications-block" className="lg:col-span-5 space-y-6">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-pink-900/40 text-pink-400 border border-pink-500/20' : 'bg-pink-100 text-pink-600'}`}>
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              Certifications
            </h3>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Industrial verified credentials and qualifications.
            </p>
          </div>
        </div>

        {certifications.map((cert) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden group ${
              isDarkMode 
                ? 'bg-white/5 border-pink-500/15 hover:border-pink-500/30 shadow-md' 
                : 'bg-white border-slate-200 shadow-sm hover:shadow-lg'
            }`}
          >
            {/* Visual credential stamp backing */}
            <span className="absolute -bottom-10 -right-10 w-24 h-24 bg-pink-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-100 text-pink-600'}`}>
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
                {cert.date}
              </span>
            </div>

            <h4 className={`text-base font-bold font-sans ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {cert.title}
            </h4>
            
            <p className="text-xs font-mono font-bold text-purple-400 mt-1 mb-4">
              {cert.issuer}
            </p>

            <h5 className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase mb-2">
              Skills Acquired & Verified:
            </h5>
            
            <ul className="space-y-2.5">
              {cert.highlights.map((hil, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <CheckSquare className="w-4 h-4 shrink-0 text-pink-500 mt-0.5" />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>{hil}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Achievements Block (Right Col-7 CSS grid) */}
      <div id="achievements-block" className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-100 text-cyan-600'}`}>
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Key Achievements
            </h3>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Chronological milestones reflecting progress metrics.
            </p>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {achievements.map((ach) => (
            <motion.div
              key={ach.id}
              variants={itemVariants}
              whileHover={{ 
                y: -4, 
                boxShadow: isDarkMode ? '0 10px 20px -5px rgba(6, 182, 212, 0.15)' : '0 10px 20px -5px rgba(124, 58, 237, 0.1)',
                borderColor: isDarkMode ? 'rgba(6, 182, 212, 0.25)' : 'rgba(124, 58, 237, 0.2)'
              }}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isDarkMode 
                  ? 'bg-white/5 border-white/5' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 uppercase mb-2 inline-block">
                  {ach.metric}
                </span>

                <h4 className={`text-sm font-bold font-sans mb-1 text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? 'from-white to-gray-300' : 'from-slate-900 to-slate-800'}`}>
                  {ach.title}
                </h4>

                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'} leading-relaxed`}>
                  {ach.description}
                </p>
              </div>

              {/* visual telemetry dot */}
              <div className="flex items-center gap-1 mt-4 pt-4 border-t border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[9px] font-mono text-gray-500">AI Node Synchronized</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
