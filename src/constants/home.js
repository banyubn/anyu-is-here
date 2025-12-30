import { Code, Video, Music, Award, Globe, Database, Palette, Zap, Trophy, Star, Target, Rocket } from 'lucide-vue-next'

export const STATS = [
  { value: '350+', label: 'PROJECTS' },
  { value: '8+', label: 'YEARS' },
  { value: '70+', label: 'CLIENTS' },
]

export const CATEGORIES = [
  {
    id: 'programming',
    name: 'PROGRAMMING',
    description: 'Full-stack development with modern technologies',
    icon: Code,
    technologies: ['Vue.js', 'React', 'Node.js', 'Python', 'TypeScript'],
    comingSoon: false,
    path: '/programming',
  },
  {
    id: 'video',
    name: 'VIDEO EDITING',
    description: 'Cinematic storytelling through visual media',
    icon: Video,
    technologies: ['After Effects', 'Premiere Pro', 'DaVinci', 'Blender'],
    comingSoon: false,
    path: '/video-editing',
  },
  {
    id: 'music',
    name: 'MUSIC PRODUCTION',
    description: 'Creating immersive audio experiences',
    icon: Music,
    technologies: ['FL Studio', 'Sytrus', 'Serum', 'Kontakt'],
    comingSoon: false,
    path: '/music-production',
  },
  {
    id: 'certificates',
    name: 'CERTIFICATES',
    description: 'Professional certifications and achievements',
    icon: Award,
    technologies: ['AWS', 'Google Cloud', 'Microsoft', 'Adobe'],
    comingSoon: false,
    path: '/certificates',
  },
]

export const ORBIT_SKILLS = [
  'Vue.js',
  'React',
  'Node.js',
  'Python',
  'After Effects',
  'Premiere Pro',
  'Ableton Live',
  'TypeScript',
]

export const SKILL_CATEGORIES = [
  {
    name: 'Frontend Development',
    icon: Globe,
    color: '#61dafb',
    skills: [
      { name: 'Vue.js', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'GSAP', level: 82 },
    ],
  },
  {
    name: 'Backend Development',
    icon: Database,
    color: '#339933',
    skills: [
      { name: 'LUMEN', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'Express', level: 75 },
      { name: 'PostgreSQL', level: 78 },
    ],
  },
  {
    name: 'Creative Tools',
    icon: Palette,
    color: '#9999ff',
    skills: [
      { name: 'After Effects', level: 90 },
      { name: 'Premiere Pro', level: 88 },
      { name: 'Photoshop', level: 85 },
      { name: 'FL Studio', level: 80 },
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: Zap,
    color: '#ff6b6b',
    skills: [
      { name: 'Docker', level: 25 },
      { name: 'Git', level: 90 },
      { name: 'WSL', level: 70 },
      { name: 'SQLWorkBench', level: 65 },
    ],
  },
]

export const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'LKS National Champion',
    description: 'Proved skills on the national stage. Excellence through competition.',
    year: '2023',
    icon: Trophy,
  },
  {
    id: 2,
    title: '50M+ Video Views',
    description: 'Cumulative views across all video editing projects and content',
    year: '2021',
    icon: Star,
  },
  {
    id: 3,
    title: '100+ Projects Completed',
    description: 'Successfully delivered diverse projects across multiple domains',
    year: '2022',
    icon: Target,
  },
  {
    id: 4,
    title: 'Certified Cool Guy',
    description: 'Certified in spreading good vibes',
    year: 'jk :/',
    icon: Rocket,
  },
]
