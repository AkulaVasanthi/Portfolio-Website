import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, Brain, Wrench, MessageSquare, Users, Crown, 
  Lightbulb, Clock, ShieldAlert, Sparkles, Database 
} from 'lucide-react';
import { SkillItem } from '../types';

interface SkillsSectionProps {
  isDarkMode: boolean;
}

export default function SkillsSection({ isDarkMode }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'programming' | 'ai-data-science' | 'tools'>('all');

  const technicalSkills: SkillItem[] = [
    // Programming
    { name: 'Python', level: 92, category: 'programming' },
    { name: 'Java', level: 78, category: 'programming' },
    { name: 'SQL', level: 85, category: 'programming' },
    { name: 'HTML & CSS', level: 88, category: 'programming' },
    { name: 'JavaScript', level: 80, category: 'programming' },
    // AI & Data Science
    { name: 'Machine Learning', level: 88, category: 'ai-data-science' },
    { name: 'Linear Regression', level: 95, category: 'ai-data-science' },
    { name: 'Data Analysis', level: 86, category: 'ai-data-science' },
    { name: 'Data Visualization', level: 84, category: 'ai-data-science' },
    { name: 'Model Training', level: 85, category: 'ai-data-science' },
    // Tools
    { name: 'Google AI Studio', level: 90, category: 'tools' },
    { name: 'ChatGPT', level: 95, category: 'tools' },
    { name: 'Claude', level: 92, category: 'tools' },
    { name: 'GitHub', level: 86, category: 'tools' },
    { name: 'VS Code', level: 90, category: 'tools' },
    { name: 'Canva', level: 80, category: 'tools' }
  ];

  const softSkills = [
    { name: 'Communication', icon: MessageSquare, desc: 'Articulating technical concepts with high clarity.' },
    { name: 'Teamwork', icon: Users, desc: 'Collaborating seamlessly across cross-functional units.' },
    { name: 'Leadership', icon: Crown, desc: 'Empowering peers and driving student initiatives.' },
    { name: 'Problem Solving', icon: Lightbulb, desc: 'Dissecting complex logic into optimal sub-tasks.' },
    { name: 'Time Management', icon: Clock, desc: 'Prioritizing academic deliverables and projects.' },
    { name: 'Adaptability', icon: Sparkles, desc: 'Pivoting quickly to embrace emerging AI frameworks.' },
    { name: 'Critical Thinking', icon: Database, desc: 'Analyzing structured datasets for objective insights.' },
    { name: 'Creativity', icon: Sparkles, desc: 'Inventing dynamic approaches for machine learning applications.' }
  ];

  const filteredSkills = activeTab === 'all' 
    ? technicalSkills 
    : technicalSkills.filter(skill => skill.category === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  const currentTextClass = isDarkMode ? 'text-gray-300' : 'text-slate-700';
  const tabButtonStyles = (isActive: boolean) => {
    if (isActive) {
      return isDarkMode
        ? 'bg-purple-600/35 border-purple-400 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
        : 'bg-purple-600 border-purple-600 text-white';
    }
    return isDarkMode
      ? 'bg-white/5 hover:bg-white/10 text-gray-400 border-white/5'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300/40';
  };

  const getMeterColor = (category: string) => {
    switch (category) {
      case 'programming': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'ai-data-science': return 'bg-gradient-to-r from-cyan-400 to-purple-500';
      case 'tools': return 'bg-gradient-to-r from-pink-500 to-cyan-400';
      default: return 'bg-purple-500';
    }
  };

  return (
    <div className="space-y-16">
      {/* Technical Skills Tab Grid */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Technical Skill Matrix
            </h3>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Quantified academic & practical capabilities.
            </p>
          </div>

          {/* Navigation filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Stack', icon: Code2 },
              { id: 'programming', label: 'Program', icon: Code2 },
              { id: 'ai-data-science', label: 'AI & ML', icon: Brain },
              { id: 'tools', label: 'Tools', icon: Wrench }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${tabButtonStyles(activeTab === tab.id)}`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Technical skills list displays */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className={`p-4 rounded-2xl border ${
                isDarkMode 
                  ? 'bg-white/5 border-white/5 hover:border-purple-500/30 hover:bg-white/8 shadow-md' 
                  : 'bg-white border-slate-200/60 hover:border-purple-300/40 hover:shadow-lg'
              } transition-all duration-300`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-semibold font-sans ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {skill.name}
                </span>
                <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-cyan-400' : 'text-purple-600'}`}>
                  {skill.level}%
                </span>
              </div>
              
              {/* Skill meter */}
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200/70'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className={`h-full rounded-full ${getMeterColor(skill.category)}`}
                />
              </div>

              {/* Skill meta indicators */}
              <span className={`text-[10px] font-mono mt-2 inline-block uppercase font-semibold text-gray-500`}>
                {skill.category.replace('-', ' ')}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Soft Skills modern grid item cards */}
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Professional Soft Skills
          </h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
            Powering cross-collaboration and agile productivity.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {softSkills.map((ss) => {
            const IconComponent = ss.icon;
            return (
              <motion.div
                key={ss.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: isDarkMode 
                    ? '0 10px 25px -5px rgba(6, 182, 212, 0.15)' 
                    : '0 10px 25px -5px rgba(124, 58, 237, 0.1)',
                  borderColor: isDarkMode ? 'rgba(6, 182, 212, 0.3)' : 'rgba(124, 58, 237, 0.2)'
                }}
                className={`p-4 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/5' 
                    : 'bg-white border-slate-200/50 shadow-sm'
                } transition-all duration-300 relative group overflow-hidden`}
              >
                {/* Visual hover background node effect */}
                <span className="absolute -bottom-6 -right-6 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                
                <div className={`p-2.5 rounded-xl w-fit mb-3.5 ${
                  isDarkMode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-purple-100 text-purple-600'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                <h4 className={`text-sm font-bold font-sans mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {ss.name}
                </h4>
                
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'} leading-relaxed`}>
                  {ss.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
