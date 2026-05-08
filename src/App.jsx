import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  BrainCircuit,
  ChevronDown,
  Code2,
  Cpu,
  DatabaseZap,
  FileText,
  Mail,
  MessageCircle,
  Monitor,
  Network,
  Pause,
  Play,
  Radio,
  Send,
  Sparkles,
  Smartphone,
  Terminal,
  Volume2,
  VolumeX,
  WandSparkles,
} from 'lucide-react';
import BackgroundCanvas from './components/BackgroundCanvas';
import FadeSection from './components/FadeSection';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    title: 'AI / ML',
    icon: BrainCircuit,
    level: 92,
    items: ['PyTorch', 'TensorFlow', 'CNNs', 'WavLM', 'Audio Processing', 'Data Preprocessing', 'Deepfake Detection'],
  },
  {
    title: 'Frontend',
    icon: WandSparkles,
    level: 96,
    items: ['React', 'Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js', 'JavaScript'],
  },
  {
    title: 'Backend',
    icon: DatabaseZap,
    level: 82,
    items: ['Node.js', 'Express.js', 'MongoDB'],
  },
  {
    title: 'Tools',
    icon: Cpu,
    level: 88,
    items: ['Git', 'VS Code', 'Figma', 'Docker'],
  },
];

const storyBeats = [
  ['01', 'Signal', 'I listen for the tiny fractures between human voice and synthetic imitation.'],
  ['02', 'Interface', 'I shape models into tools that feel immediate, tactile, and strangely alive.'],
  ['03', 'Impact', 'The goal is not spectacle. It is clarity, velocity, and trust under pressure.'],
];

const projects = [
  {
    title: 'Sign Language AI Recognition System',
    copy: 'Gesture recognition pipeline translating real-time hand motion into text with low-latency feedback.',
    stack: ['OpenCV', 'TensorFlow', 'MediaPipe'],
  },
  {
    title: 'Interactive Music Player Web App',
    copy: 'Audio-reactive listening interface with spectrum analysis, mood-aware themes, and cinematic transitions.',
    stack: ['React', 'Web Audio', 'Canvas'],
  },
  {
    title: 'Cinematic Animated Portfolio Experiences',
    copy: 'Scroll-driven portfolio experiments focused on dramatic motion, layered atmospheres, and memorable presentation.',
    stack: ['GSAP', 'Framer', 'Tailwind'],
  },
  {
    title: 'Experimental Frontend Interfaces',
    copy: 'A lab for futuristic UI systems, interactive layouts, hover rituals, and visually expressive web interfaces.',
    stack: ['React', 'Three.js', 'GSAP'],
  },
];

const stats = [
  ['5+', 'Projects Built'],
  ['AI', 'Audio Pipelines'],
  ['Large', 'Datasets Explored'],
  ['UI', 'Cinematic Focus'],
];

function useViewportMode() {
  const [mode, setMode] = useState('desktop');

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setMode(query.matches ? 'mobile' : 'desktop');
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return mode;
}

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.18,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    const raf = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className={`fixed inset-0 z-[80] grid place-items-center bg-night ${hidden ? 'pointer-events-none' : ''}`}
    >
      <div className="relative text-center">
        <div className="mx-auto mb-5 h-16 w-16 border border-crimson/50 bg-black/40 shadow-[0_0_50px_rgba(225,0,45,0.35)]">
          <div className="h-full w-full animate-[spin_3.2s_linear_infinite] border-l-2 border-t-2 border-white/80" />
        </div>
        <p className="text-xs uppercase tracking-[0.7em] text-white/60">loading sequence</p>
      </div>
    </motion.div>
  );
}

function CursorAura() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { damping: 28, stiffness: 180 });
  const smoothY = useSpring(y, { damping: 28, stiffness: 180 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return <motion.div className="pointer-events-none fixed z-[70] hidden h-[360px] w-[360px] rounded-full bg-crimson/[0.12] blur-3xl md:block" style={{ x: smoothX, y: smoothY }} />;
}

function MusicControl() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.38);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    await audioRef.current.play();
    setPlaying(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-black/[0.55] px-3 py-2 text-white shadow-red backdrop-blur-xl md:bottom-7 md:right-7">
      <audio ref={audioRef} src="/music.mp3" loop preload="metadata" />
      <button onClick={toggle} className="grid h-10 w-10 place-items-center rounded-full bg-white text-black transition hover:bg-crimson hover:text-white" aria-label="Toggle music">
        {playing ? <Pause size={17} /> : <Play size={17} />}
      </button>
      <Volume2 size={16} className="hidden text-white/[0.55] sm:block" />
      <input
        aria-label="Music volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(event) => setVolume(Number(event.target.value))}
        className="hidden w-20 accent-crimson sm:block"
      />
      {!playing && <VolumeX size={16} className="text-crimson sm:hidden" />}
    </div>
  );
}

function Nav({ mode }) {
  if (mode === 'mobile') {
    return (
      <>
        <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-4 py-4 text-[0.65rem] uppercase tracking-[0.28em] text-white/70">
          <a href="#home" className="font-semibold text-white">Portfolio</a>
          <span className="rounded-full border border-crimson/40 bg-black/55 px-3 py-1 text-crimson backdrop-blur-md">phone cut</span>
        </nav>
        <div className="fixed bottom-4 left-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 grid-cols-4 rounded-full border border-white/10 bg-black/70 p-2 text-white shadow-red backdrop-blur-xl">
          {[
            ['#home', Smartphone, 'Home'],
            ['#skills', Sparkles, 'Skill'],
            ['#projects', Code2, 'Work'],
            ['#contact', Send, 'Talk'],
          ].map(([href, Icon, label]) => (
              <a key={label} href={href} className="flex flex-col items-center justify-center gap-1 rounded-full py-2 text-[0.62rem] text-white/55 transition hover:bg-crimson/20 hover:text-white">
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      </>
    );
  }

  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-8 py-5 text-xs uppercase tracking-[0.28em] text-white/70">
      <a href="#home" className="font-semibold text-white">Portfolio</a>
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl">
        <Monitor size={14} className="text-crimson" />
        <span className="text-[0.62rem] text-white/45">desktop sequence</span>
      </div>
      <div className="flex items-center gap-7">
        {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero({ mode }) {
  if (mode === 'mobile') {
    return (
      <section id="home" className="mobile-hero relative flex min-h-[100svh] items-end px-4 pb-28 pt-24">
        <div className="w-full">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-4 text-[0.62rem] uppercase tracking-[0.42em] text-crimson">
            mobile cinematic interface
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.8 }} className="font-display text-[4.6rem] leading-[0.75] text-white text-shadow-red">
            AADITYA
            <span className="block text-outline">SINGH</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }} className="mt-6 rounded-lg border border-white/10 bg-black/52 p-4 backdrop-blur-xl">
            <p className="text-sm leading-6 text-white/[0.72]">
              Building intelligent systems, cinematic web experiences, and futuristic interactive interfaces.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <a href="#projects" className="btn-primary justify-center px-4 py-3">Projects</a>
              <a href="#contact" className="btn-ghost justify-center px-4 py-3">Contact</a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative grid min-h-screen place-items-center px-5 pt-20">
      <div className="mx-auto max-w-6xl text-center">
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-5 text-xs uppercase tracking-[0.55em] text-crimson">
          AI Developer • Creative Frontend Builder • Student
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, duration: 0.9 }} className="font-display text-[clamp(3.8rem,12vw,12.2rem)] leading-[0.78] text-white text-shadow-red">
          AADITYA
          <span className="block text-outline">SINGH</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78 }} className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/[0.72] md:text-lg">
          Building intelligent systems, cinematic web experiences, and futuristic interactive interfaces.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#projects" className="btn-primary">View Projects <ArrowUpRight size={17} /></a>
          <a href="#contact" className="btn-ghost">Contact <Send size={16} /></a>
          <a href="#contact" className="btn-ghost">Resume Soon <FileText size={16} /></a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/[0.45]">
        <ChevronDown className="animate-bounce" size={19} />
      </div>
    </section>
  );
}

function StoryStrip() {
  return (
    <section className="story-pin relative min-h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center px-5 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-crimson">fixed text / moving frame</p>
            <h2 className="mt-5 font-display text-5xl leading-none text-white md:text-8xl">A quiet system with a sharp edge.</h2>
          </div>
          <div className="story-copy relative min-h-52">
            {storyBeats.map(([num, title, text], index) => (
              <article key={title} className="story-beat absolute inset-0 rounded-lg border border-white/10 bg-black/[0.42] p-6 backdrop-blur-md md:p-8" style={{ opacity: index === 0 ? 1 : 0 }}>
                <span className="text-xs text-crimson">{num}</span>
                <h3 className="mt-3 text-3xl font-semibold text-white">{title}</h3>
                <p className="mt-4 max-w-xl text-lg leading-8 text-white/[0.68]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <FadeSection id="about">
      <div className="section-grid">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="section-title">AI developer, creative frontend builder, student.</h2>
        </div>
        <div className="panel p-6 md:p-8">
          <p className="copy">
            I am a student and developer passionate about AI, immersive frontend experiences, and creative coding. My work focuses on combining machine learning with visually engaging interfaces to build projects that feel both intelligent and cinematic.
          </p>
          <p className="copy mt-5">
            I enjoy experimenting with futuristic UI design, animation systems, audio AI, and interactive web technologies while constantly exploring new ways to create memorable digital experiences.
          </p>
        </div>
      </div>
    </FadeSection>
  );
}

function Skills() {
  return (
    <FadeSection className="scroll-mt-20" id="skills">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow text-center">Technical Arsenal</p>
        <h2 className="section-title mx-auto max-w-3xl text-center">Built for prototypes that have to feel impossible until they work.</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map(({ title, icon: Icon, items, level }) => (
            <motion.article key={title} whileHover={{ y: -8, scale: 1.015 }} className="panel group min-h-[310px] p-5">
              <div className="flex items-center justify-between">
                <Icon className="text-crimson" size={28} />
                <span className="text-xs text-white/[0.35]">{level}%</span>
              </div>
              <h3 className="mt-7 text-2xl font-semibold text-white">{title}</h3>
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${level}%` }} viewport={{ once: true }} transition={{ duration: 1.3, ease: 'easeOut' }} className="h-full bg-crimson shadow-[0_0_22px_rgba(225,0,45,0.85)]" />
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-white/[0.66] transition group-hover:border-crimson/40 group-hover:text-white">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </FadeSection>
  );
}

function FeaturedProject({ mode }) {
  const bars = useMemo(() => Array.from({ length: 40 }, (_, index) => 25 + ((index * 17) % 70)), []);

  if (mode === 'mobile') {
    return (
      <FadeSection className="scroll-mt-20 mobile-project-section" id="projects">
        <div className="w-full">
          <p className="eyebrow">Featured Project</p>
          <h2 className="mt-5 font-display text-4xl leading-none text-white">Real-Time Audio Deepfake Detection using WavLM + CNN</h2>
          <p className="mt-4 text-sm leading-6 text-white/[0.66]">
            A phone-first mission deck for the WavLM + CNN detector: swipe-like stacked panels, compact metrics, and touch-sized actions.
          </p>
          <div className="mt-7 space-y-3">
            {[
              ['01', 'Capture', 'Stream audio into a live spectrogram buffer.'],
              ['02', 'Embed', 'Extract WavLM features from suspicious vocal texture.'],
              ['03', 'Classify', 'CNN confidence decides human or synthetic probability.'],
            ].map(([num, title, copy]) => (
              <motion.article key={title} whileTap={{ scale: 0.98 }} className="panel p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-crimson text-sm font-semibold text-white">{num}</span>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-white/55">{copy}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ['95.4%', 'Accuracy'],
              ['<50ms', 'Latency'],
              ['Live', 'Signal'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-crimson/25 bg-black/55 p-3 text-center backdrop-blur-md">
                <p className="font-display text-2xl text-white">{value}</p>
                <p className="mt-1 text-[0.56rem] uppercase tracking-[0.22em] text-white/40">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button className="btn-primary justify-center px-4"><Code2 size={16} /> Source</button>
            <button className="btn-ghost justify-center px-4"><Radio size={16} /> Demo</button>
          </div>
        </div>
      </FadeSection>
    );
  }

  return (
    <FadeSection className="scroll-mt-20" id="projects">
      <div className="mx-auto w-full max-w-7xl">
        <p className="eyebrow">Featured Project</p>
        <div className="project-hero mt-6 overflow-hidden rounded-lg border border-white/10 bg-black/[0.55] backdrop-blur-xl">
          <div className="grid min-h-[680px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative flex flex-col justify-between overflow-hidden p-6 md:p-10">
              <div className="absolute inset-0 opacity-50">
                <div className="spectrogram">
                  {bars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                </div>
              </div>
              <div className="relative">
                <h2 className="font-display text-5xl leading-none text-white md:text-7xl">Real-Time Audio Deepfake Detection using WavLM + CNN</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.68]">
                  A WavLM + CNN detection system that turns uncertain audio into measurable evidence. Designed around streaming inference, confidence panels, and practical forensic review.
                </p>
              </div>
              <div className="relative grid gap-3 sm:grid-cols-3">
                {['WavLM features', 'CNN classifier', 'Realtime verdict'].map((node, index) => (
                  <div key={node} className="rounded-md border border-crimson/30 bg-black/[0.55] p-4 shadow-red">
                    <span className="text-xs text-crimson">0{index + 1}</span>
                    <p className="mt-2 font-medium text-white">{node}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 bg-white/[0.025] p-6 md:p-10 lg:border-l lg:border-t-0">
              <div className="grid gap-4">
                {[
                  ['Accuracy', '95.4%', 'validated on noisy real-world clips'],
                  ['Latency', '<50ms', 'optimized inference loop'],
                  ['Signal View', 'Live', 'spectrogram and confidence overlay'],
                ].map(([label, value, sub]) => (
                  <div key={label} className="panel p-5">
                    <p className="text-xs uppercase tracking-[0.32em] text-white/[0.38]">{label}</p>
                    <p className="mt-3 font-display text-4xl text-white">{value}</p>
                    <p className="mt-2 text-sm text-white/50">{sub}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-md border border-white/10 bg-black/50 p-5 font-mono text-sm text-white/[0.62]">
                <p className="text-crimson">$ detect --stream input.wav</p>
                <p className="mt-3">embedding: wavlm-large-layer-12</p>
                <p>classifier: cnn-v4 / calibrated</p>
                <p>verdict: synthetic probability 0.041</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="btn-primary"><Code2 size={17} /> Source Code</button>
                <button className="btn-ghost"><Radio size={17} /> Live Demo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeSection>
  );
}

function OtherProjects() {
  return (
    <FadeSection>
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow">Other Projects</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <motion.article key={project.title} whileHover={{ y: -6 }} className="panel group p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <ArrowUpRight className="text-white/[0.28] transition group-hover:text-crimson" />
              </div>
              <p className="mt-4 leading-7 text-white/[0.58]">{project.copy}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => <span key={tech} className="tag">{tech}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </FadeSection>
  );
}

function TimelineStats() {
  return (
    <FadeSection>
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Experience / Education</p>
          <h2 className="section-title">A timeline for experiments, systems, and craft.</h2>
        </div>
        <div className="space-y-4">
          {[
            ['Now', 'Student Developer', 'Focused on AI/ML and frontend development while building personal AI and web-based projects.'],
            ['AI / ML', 'Audio and Intelligent Systems', 'Exploring audio AI pipelines, deepfake detection, large datasets, and experimental AI-driven systems.'],
            ['Frontend', 'Immersive UI / UX Systems', 'Designing cinematic interfaces with React, Tailwind, GSAP, Framer Motion, and creative engineering.'],
          ].map(([year, role, copy]) => (
            <div key={role} className="timeline-item panel p-5">
              <span className="text-crimson">{year}</span>
              <h3 className="mt-2 text-xl font-semibold text-white">{role}</h3>
              <p className="mt-2 text-white/[0.55]">{copy}</p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="panel p-5 text-center">
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-5xl text-white text-shadow-red">
                  {value}
                </motion.p>
                <p className="mt-3 text-xs uppercase tracking-[0.28em] text-white/[0.42]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeSection>
  );
}

function Contact() {
  return (
    <FadeSection className="scroll-mt-20" id="contact">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Open a channel.</h2>
          <div className="mt-8 grid gap-3">
            {[
              [Mail, 'Email', 'flash6027@gmail.com', 'mailto:flash6027@gmail.com'],
              [Code2, 'GitHub', 'github.com/WaifuPuller', 'https://github.com/WaifuPuller'],
              [Network, 'LinkedIn', 'linkedin.com/in/aaditya-singh-408968357', 'https://www.linkedin.com/in/aaditya-singh-408968357/'],
              [MessageCircle, 'Discord', 'waifu_puller', '#contact'],
            ].map(([Icon, label, value, href]) => (
              <a key={label} href={href} className="panel flex items-center gap-4 p-4 transition hover:border-crimson/60">
                <Icon className="text-crimson" size={20} />
                <span className="text-white/[0.45]">{label}</span>
                <span className="ml-auto text-white">{value}</span>
              </a>
            ))}
          </div>
        </div>
        <form className="panel p-5 md:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4 font-mono text-sm text-white/[0.55]">
            <Terminal size={18} className="text-crimson" />
            /contact/initiate
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input" placeholder="Name" />
            <input className="input" placeholder="Email" />
          </div>
          <input className="input mt-4" placeholder="Project signal" />
          <textarea className="input mt-4 min-h-40 resize-none" placeholder="Tell me what you want to build..." />
          <button type="button" className="btn-primary mt-5 w-full justify-center">Send Transmission <Sparkles size={17} /></button>
        </form>
      </div>
    </FadeSection>
  );
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const viewportMode = useViewportMode();

  useLenis();

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    const ctx = gsap.context(() => {
      gsap.to('.story-beat', {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        scrollTrigger: {
          trigger: '.story-pin',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const index = Math.min(storyBeats.length - 1, Math.floor(self.progress * storyBeats.length));
            gsap.to('.story-beat', { opacity: 0, y: 28, duration: 0.35, overwrite: true });
            gsap.to(`.story-beat:nth-child(${index + 1})`, { opacity: 1, y: 0, duration: 0.35, overwrite: true });
          },
        },
      });
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <BackgroundCanvas progress={scrollProgress} />
      <CursorAura />
      <Nav mode={viewportMode} />
      <MusicControl />
      <main className="relative z-10 overflow-hidden">
        <Hero mode={viewportMode} />
        <StoryStrip />
        <About />
        <Skills />
        <FeaturedProject mode={viewportMode} />
        <OtherProjects />
        <TimelineStats />
        <Contact />
        <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-center text-xs uppercase tracking-[0.28em] text-white/[0.38]">
          Copyright 2026 Aaditya Singh. Designed as a cinematic AI developer portfolio.
        </footer>
      </main>
    </>
  );
}

export default App;
