import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Sun, Moon, ExternalLink, Mail, Phone, MessageCircle, 
  Linkedin, Search, X, ChevronRight, Menu, Download 
} from 'lucide-react';
import { cvData } from './data/cv';
import type { Project } from './types';
import { SplineScene } from './components/ui/spline';
import { Spotlight } from './components/ui/spotlight';
import { Card } from './components/ui/card';
import { cn } from './lib/utils';

// --- Components ---

// Magnetic Button
const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; href?: string }> = ({ children, className, onClick, href }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const Wrapper = href ? motion.a : motion.button;
  // @ts-ignore
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };

  return (
    <Wrapper
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("relative inline-flex items-center justify-center cursor-pointer", className)}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

// Cursor Spotlight
const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden md:block"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div 
        className="absolute w-[300px] h-[300px] bg-foreground/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
};

// Text Reveal
const TextReveal: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className={cn("flex flex-wrap gap-x-[0.25em]", className)}
    >
      {words.map((word, i) => (
        <motion.span 
          key={i} 
          variants={{ 
            hidden: { opacity: 0, y: 10 }, 
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- Modal ---
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background border border-border rounded-2xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors">
          <X size={20} />
        </button>
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-6">{project.description}</p>
        
        <div className="space-y-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Problem</span>
            <p className="text-sm mt-1">{project.details.problem}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Solution</span>
            <p className="text-sm mt-1">{project.details.solution}</p>
          </div>
          <div>
             <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tech Stack</span>
             <div className="flex flex-wrap gap-2 mt-2">
               {project.details.tech.map(t => (
                 <span key={t} className="px-2 py-1 bg-muted rounded text-xs border border-border">{t}</span>
               ))}
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Command K ---
const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const sections = ['About', 'Highlights', 'Experience', 'Projects', 'Education', 'Skills', 'Contact'];
  const filteredSections = sections.filter(s => s.toLowerCase().includes(query.toLowerCase()));

  const handleNav = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg bg-background border border-border rounded-xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center px-4 py-3 border-b border-border">
          <Search size={18} className="text-muted-foreground mr-3" />
          <input 
            autoFocus
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            placeholder="Search sections..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="p-2 max-h-[300px] overflow-y-auto">
          {filteredSections.length > 0 ? filteredSections.map(s => (
            <button key={s} onClick={() => handleNav(s)} className="w-full text-left px-4 py-2 hover:bg-muted rounded text-sm flex items-center justify-between group">
              <span>{s}</span>
              <span className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground">Jump to</span>
            </button>
          )) : <div className="p-4 text-center text-muted-foreground text-sm">No results found</div>}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Scroll hooks
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Theme Init
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  // Cmd+K Listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setIsCmdKOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-foreground selection:text-background overflow-x-hidden">
      <CursorSpotlight />
      <CommandPalette isOpen={isCmdKOpen} onClose={() => setIsCmdKOpen(false)} />
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-foreground z-[60] origin-left" style={{ scaleX }} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tight">NDR</div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map(item => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, item)}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
             <button onClick={() => setIsCmdKOpen(true)} className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-muted/50 border border-border text-xs text-muted-foreground hover:bg-muted transition-colors">
               <span>Search</span>
               <kbd className="bg-background px-1 rounded border border-border/50">⌘K</kbd>
             </button>
             <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors text-foreground">
               {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
             </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative min-h-screen pt-24 pb-12 flex items-center overflow-hidden">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                {cvData.hero.name}
              </h1>
              <TextReveal 
                text={cvData.hero.headline} 
                className="text-2xl md:text-3xl text-muted-foreground font-light mb-6" 
              />
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                {cvData.hero.subheadline}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <MagneticButton className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity" href={`mailto:${cvData.contact.email}`}>
                  Email Me
                </MagneticButton>
                <MagneticButton className="border border-border bg-background px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors" href={cvData.contact.linkedin}>
                  LinkedIn
                </MagneticButton>
              </div>

              <div className="flex flex-wrap gap-2">
                {cvData.hero.badges.map(b => (
                  <span key={b} className="px-3 py-1 bg-muted/50 border border-border rounded-full text-xs text-muted-foreground">
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Spline 3D Scene */}
            <div className="h-[500px] w-full relative">
               <div className="w-full h-full relative z-10">
                 <Spotlight
                  className="-top-40 left-0 md:left-20 md:-top-20"
                  fill={theme === 'dark' ? 'white' : 'black'} 
                 />
                 <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                 />
               </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 container mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block">About</span>
            <TextReveal text={cvData.about.summary} className="text-2xl md:text-3xl font-medium leading-relaxed mb-8" />
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 bg-muted/50 border border-border p-4 rounded-xl"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">{cvData.about.now}</span>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section id="highlights" className="py-12 container mx-auto px-6 border-t border-border/50">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cvData.highlights.map((h, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-foreground/20 transition-colors"
              >
                <h3 className="font-semibold text-lg mb-2">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{h.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-24 container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Experience</h2>
          
          {/* Timeline Layout */}
          <div className="relative border-l border-border ml-6 md:ml-32 space-y-16">
            {cvData.experience.map((job, i) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="pl-8 md:pl-12 relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-foreground border-4 border-background z-10" />
                
                {/* Logo positioning */}
                {/* Adjusted left position from -140px to -32 (8rem = 128px) which aligns with margin-left of 32 */}
                <div className="md:absolute md:top-0 md:-left-32 md:w-28 md:text-right mb-4 md:mb-0">
                  {job.logo ? (
                     <img 
                       src={job.logo} 
                       alt={`${job.company} logo`} 
                       className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full bg-white border border-border p-1 md:ml-auto inline-block shadow-sm"
                     />
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted border border-border flex items-center justify-center md:ml-auto inline-block">
                       <span className="text-xs font-bold text-muted-foreground">{job.company.substring(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <div className="text-lg text-muted-foreground font-medium">{job.company} <span className="text-sm font-normal opacity-70">• {job.type}</span></div>
                  </div>
                  {/* Date Column: Fixed width and left aligned for consistent starting alignment */}
                  <div className="text-sm text-muted-foreground mt-1 md:mt-0 font-mono md:w-48 md:text-left md:shrink-0">
                    {job.period} <br className="hidden md:block" /> {job.location}
                  </div>
                </div>

                <ul className="space-y-2 list-disc list-outside ml-4 text-muted-foreground">
                  {job.bullets.map((b, idx) => (
                    <li key={idx} className="text-sm md:text-base">{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 container mx-auto px-6 bg-muted/20">
          <h2 className="text-3xl font-bold mb-12">Selected Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cvData.projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-background border border-border rounded-2xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {p.description}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedProject(p)}
                  className="mt-4 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View Details <ChevronRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Certs */}
        <section id="education" className="py-24 container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-8">Education</h2>
              <div className="space-y-8">
                {cvData.education.map((edu, i) => (
                  <div key={i} className="group flex gap-4 items-start">
                    {edu.logo && (
                      <div className="shrink-0">
                        <img 
                          src={edu.logo} 
                          alt={`${edu.school} logo`} 
                          className="w-12 h-12 object-contain rounded bg-white border border-border p-1"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{edu.school}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{edu.degree}</p>
                      <p className="text-xs font-mono opacity-60 mb-2">{edu.period}</p>
                      {edu.notes && (
                        <ul className="text-xs text-muted-foreground list-disc ml-4">
                          {edu.notes.map((n, idx) => <li key={idx}>{n}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-8">Certifications</h2>
              <div className="grid gap-4">
                {cvData.certifications.map((cert, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-border pb-3">
                    <div>
                      <p className="font-medium text-sm">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-mono opacity-50">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-24 container mx-auto px-6 border-t border-border">
          <h2 className="text-2xl font-bold mb-12">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cvData.skills.map((grp, i) => (
              <div key={i}>
                <h3 className="font-semibold text-muted-foreground mb-4 text-sm uppercase tracking-wider">{grp.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {grp.skills.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-muted rounded-md text-xs font-medium border border-border/50">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-muted-foreground mb-12">Open to full-time roles or contract collaborations.</p>
          
          <div className="flex justify-center gap-6 flex-wrap">
             <MagneticButton className="p-4 bg-muted rounded-full hover:bg-foreground hover:text-background transition-colors" href={`mailto:${cvData.contact.email}`}>
               <Mail />
             </MagneticButton>
             <MagneticButton className="p-4 bg-muted rounded-full hover:bg-blue-600 hover:text-white transition-colors" href={cvData.contact.linkedin}>
               <Linkedin />
             </MagneticButton>
             <MagneticButton className="p-4 bg-muted rounded-full hover:bg-green-500 hover:text-white transition-colors" href={cvData.contact.whatsapp}>
               <MessageCircle />
             </MagneticButton>
             <MagneticButton className="p-4 bg-muted rounded-full hover:bg-foreground hover:text-background transition-colors" href={`tel:${cvData.contact.phone}`}>
               <Phone />
             </MagneticButton>
          </div>
        </section>
      </main>
      
      <footer className="py-8 border-t border-border text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Nick de Ridder. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}