import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Calendar, Building, Award, CheckCircle2 } from 'lucide-react';

interface TimelineProps {
  isDarkMode: boolean;
}

export default function Timeline({ isDarkMode }: TimelineProps) {
  const educationData = [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology',
      specialization: 'Computer Science Engineering (Artificial Intelligence)',
      institution: 'Siddharth Institute of Engineering and Technology',
      duration: '2022 – 2026',
      status: 'Final Year Student',
      grade: 'Pursuing',
      highlights: [
        'Specializing in Artificial Intelligence and Machine Learning models.',
        'Strengthening coding fundamentals, data representation schemas, and regression frameworks.',
        'Actively building prediction pipelines and analytics systems.',
      ]
    },
    {
      id: 'edu-2',
      degree: 'Diploma',
      specialization: 'Computer Science and Engineering (DCME)',
      institution: 'State Board of Technical Education & Training',
      duration: 'Completed',
      status: 'First Class with Distinction',
      highlights: [
        'Acquired core fundamentals of Operating Systems, Databases, and Software Projects.',
        'Developed comprehensive group project and presentation modules.',
      ]
    },
    {
      id: 'edu-3',
      degree: 'Secondary School Certificate (SSC)',
      specialization: 'General Education',
      institution: 'Zilla Parishad High Secondary School',
      duration: 'Completed Successful Output',
      status: 'Academically Strong Performance',
      highlights: [
        'Completed with stellar grades across core engineering foundational science subjects.',
        'Participated in multiple regional mathematics and science olympiad initiatives.',
      ]
    }
  ];

  const internshipData = {
    title: 'Foundations of AI Internship',
    organization: 'Edunet Foundation',
    collaboration: 'In Collaboration With Microsoft',
    duration: 'Recognized 2024 - 2025 Block',
    highlights: [
      'Learned Artificial Intelligence core elements & neural networks.',
      'Constructed practical data preparation, model optimization, and feature pipelines.',
      'Analyzed regression algorithms & housing feature preprocessing concepts.',
      'Explored Scikit-learn, Scipy, Matplotlib libraries for model training outputs.',
      'Gained valuable hands-on guidance on workspace standards, repositories, and AI safety principles.',
    ]
  };

  const textPrimary = isDarkMode ? 'text-white' : 'text-slate-900';
  const textSecondary = isDarkMode ? 'text-slate-300' : 'text-slate-700';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Education block (Left or Col-7) */}
      <div className="lg:col-span-7 space-y-8" id="education-sub-section">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-purple-900/40 text-purple-400 border border-purple-500/20' : 'bg-purple-100 text-purple-600'}`}>
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Academics &amp; Education
            </h3>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              The scholarly milestones of my Computer Science specialization.
            </p>
          </div>
        </div>

        {/* Chronological Grid */}
        <div className="relative border-l border-white/10 ml-4 pl-6 space-y-8">
          {educationData.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="relative"
            >
              {/* Timeline Indicator Node */}
              <span className={`absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 bg-slate-950 ${
                idx === 0 
                  ? 'border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]' 
                  : 'border-white/20'
              }`} />

              <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-purple-500/20 shadow-md' 
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}>
                {/* Year Badge & Status */}
                <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                  <span className={`flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-full ${
                    idx === 0
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'bg-white/5 text-gray-400 border border-white/5'
                  }`}>
                    <Calendar className="w-3 h-3" />
                    {edu.duration}
                  </span>

                  <span className={`text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded ${
                    idx === 0 ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/25' : 'bg-slate-500/10 text-gray-500'
                  }`}>
                    {edu.status}
                  </span>
                </div>

                {/* Degree Name */}
                <h4 className={`text-base font-bold font-sans ${textPrimary}`}>
                  {edu.degree}
                </h4>

                {edu.specialization && (
                  <p className="text-xs font-mono text-cyan-400 font-bold mt-0.5">
                    {edu.specialization}
                  </p>
                )}

                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'} italic mt-1.5 mb-3`}>
                  {edu.institution}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5">
                  {edu.highlights.map((hil, hidx) => (
                    <li key={hidx} className="flex items-start gap-2 text-xs">
                      <span className="text-purple-400 mt-1">&bull;</span>
                      <span className={textSecondary}>{hil}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Internship block (Right or Col-5) */}
      <div className="lg:col-span-5 space-y-8" id="internship-sub-section">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-100 text-cyan-700'}`}>
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Certifiable Internships
            </h3>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              Industrial exposure validating foundational ML models.
            </p>
          </div>
        </div>

        {/* Highlight Internship Panel (3D tilt accent) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-2xl border relative overflow-hidden group shadow-lg ${
            isDarkMode 
              ? 'bg-gradient-to-b from-slate-900/80 to-slate-950/90 border-cyan-500/15' 
              : 'bg-white border-slate-200 hover:border-cyan-400/40'
          }`}
        >
          {/* Aesthetic corner matrix wires */}
          <span className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
          <span className="absolute top-0 right-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-500 h-full group-hover:h-3/4 transition-all duration-500" />

          {/* Heading */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Corporate Block ID
            </span>
            <span className="text-[11px] font-mono font-medium text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {internshipData.duration}
            </span>
          </div>

          <h4 className={`text-lg font-extrabold font-sans mb-1 text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? 'from-white to-gray-300' : 'from-slate-900 to-slate-700'}`}>
            {internshipData.title}
          </h4>

          <div className="space-y-1.5 mb-6">
            <div className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-purple-400" />
              <span className={`text-xs font-bold ${textPrimary}`}>{internshipData.organization}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-400" />
              <span className={`text-xs font-mono font-bold text-cyan-400`}>{internshipData.collaboration}</span>
            </div>
          </div>

          <h5 className={`text-xs uppercase font-mono font-bold tracking-widest text-purple-400 mb-3`}>
            Internship Training Deliverables:
          </h5>

          <ul className="space-y-3">
            {internshipData.highlights.map((hil, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className={textSecondary}>{hil}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
