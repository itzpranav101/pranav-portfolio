export const B = import.meta.env.BASE_URL;

export type Cat = 'Apps' | 'Web' | 'Hardware' | 'Education';
export type Project = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  cat: Cat;
  status: string;
  body: string;
  detail: string;
  stack: string[];
  accent: 0 | 1 | 2;
  featured?: boolean;
  media?: {src: string; alt: string; kind: 'wide' | 'phone' | 'square'; caption?: string};
  links: {label: string; href: string}[];
};

export const projects: Project[] = [
  {
    slug: 'meco', title: 'Meco', kicker: 'Cognitive support for dementia', year: '2026', cat: 'Apps', status: 'Live', accent: 0, featured: true,
    body: 'Dementia takes away context. Meco learns the people, routines and memories that matter to one person, then gives the smallest useful cue when everyday life gets difficult.',
    detail: 'It never does the task for the person. The goal is the least help that works, so they stay in charge of their own day.',
    stack: ['JavaScript', 'No build step', 'Zero runtime dependencies'],
    media: {src: `${B}img/meco.jpg`, alt: 'The Meco website: Dementia takes away context. Meco rebuilds it.', kind: 'wide'},
    links: [{label: 'Live site', href: 'https://heymeco.xyz'}, {label: 'Source', href: 'https://github.com/itzpranav101/meco-67-website-final'}],
  },
  {
    slug: 'rooted-sg', title: 'ROOTED SG', kicker: 'A plant-care app for Singapore', year: '2026', cat: 'Apps', status: 'iOS and Android', accent: 1, featured: true,
    body: 'Keep a garden on the register, trade produce with neighbours, finish quests and fill your BioDex. Its motto is on the home screen: don’t count what we plant, count what we keep alive.',
    detail: 'Native SwiftUI on iOS with an Android port. Plant checks run on the phone using Apple’s Vision framework. Entered in Samsung Solve for Tomorrow 2026 with Aashrith Reddy.',
    stack: ['SwiftUI', 'Kotlin', 'On-device Vision'],
    media: {src: `${B}img/rooted.gif`, alt: 'Screen recording of the ROOTED SG app showing a plant page and the produce market', kind: 'phone', caption: 'Screen recording of the iOS app'},
    links: [{label: 'Source', href: 'https://github.com/itzpranav101/rootedsg'}],
  },
  {
    slug: 'rootstake', title: 'RootStake', kicker: 'A sensor stake for ROOTED', year: '2026', cat: 'Hardware', status: 'In progress', accent: 2, featured: true,
    body: 'A stake that goes in the soil and reports moisture, light and temperature to the app over Bluetooth, so plant care can be based on readings instead of guesses.',
    detail: 'The app side is built into ROOTED. The hardware is still a design and firmware in progress, and the render shown here is exactly that: a render.',
    stack: ['ESP32-S3', 'Bluetooth LE', 'CAD'],
    media: {src: `${B}img/rootstake.jpg`, alt: 'Render of the RootStake enclosure with a small solar panel and a dragonfly on top', kind: 'square', caption: 'Design render, not a photo of a built unit'},
    links: [],
  },
  {
    slug: 'linguabomb', title: 'LinguaBomb', kicker: 'An AI language tutor', year: '2026', cat: 'Web', status: 'Live', accent: 0, featured: true,
    body: 'Practice English, Hindi, Spanish, French and Mandarin with a tutor that teaches, quizzes and role-plays with you. Every activity turns into XP.',
    detail: 'Built with Team Bomb Island for Battle of Bots, a one-day AI chatbot competition.',
    stack: ['JavaScript', 'Chatbot', 'Knowledge base'],
    media: {src: `${B}img/linguabomb.jpg`, alt: 'The LinguaBomb website: Speak a new language with confidence', kind: 'wide'},
    links: [{label: 'Live site', href: 'https://itzpranav101.github.io/linguabomb/'}, {label: 'Source', href: 'https://github.com/itzpranav101/linguabomb'}],
  },
  {
    slug: 'stavex', title: 'Stavex', kicker: 'Startups for teens', year: '2026', cat: 'Web', status: 'Live', accent: 2,
    body: 'A platform that helps teen founders turn ideas into real projects, with structured weekly tasks and peer validation.',
    detail: 'Started in May 2026.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: [{label: 'Live site', href: 'https://stavex.org'}, {label: 'Source', href: 'https://github.com/itzpranav101/stavex'}],
  },
  {
    slug: 'kairo', title: 'Kairo', kicker: 'A scheduler built around your energy', year: '2026', cat: 'Apps', status: 'Prototype', accent: 1,
    body: 'A scheduler built around your energy levels, so focus time lands when you actually have focus.',
    detail: 'It schedules balanced focus breaks, spreads out task checklists and tracks daily milestones.',
    stack: ['Scheduling'],
    links: [{label: 'GitHub', href: 'https://github.com/itzpranav101'}],
  },
  {
    slug: 'chorefolio', title: 'Chorefolio', kicker: 'Chores, tracked like a portfolio', year: '2026', cat: 'Web', status: 'Live', accent: 0,
    body: 'Chores, tracked like a portfolio, and gamified.',
    detail: 'Built in March 2026 in TypeScript and deployed on Vercel.',
    stack: ['TypeScript', 'Vercel'],
    links: [{label: 'Live site', href: 'https://chorefolio.vercel.app'}, {label: 'Source', href: 'https://github.com/itzpranav101/Chorefolio'}],
  },
  {
    slug: 'ecoflex', title: 'EcoFlex', kicker: 'A sustainability project', year: '2026', cat: 'Web', status: 'Built', accent: 1,
    body: 'A sustainability project built with web tech.',
    detail: 'Built in August 2026.',
    stack: ['CSS', 'Web'],
    links: [{label: 'Source', href: 'https://github.com/itzpranav101/EcoFlex'}],
  },
  {
    slug: 'finflow', title: 'FinFlow Academy', kicker: 'Finance lessons for students', year: '2026', cat: 'Education', status: 'Built', accent: 2,
    body: 'Finance lessons for students, built in React and TypeScript.',
    detail: 'Started in January 2026.',
    stack: ['React', 'TypeScript'],
    links: [{label: 'Source', href: 'https://github.com/itzpranav101/fin-flow-academy-verse'}],
  },
  {
    slug: 'cryptoeducation', title: 'CryptoEducation', kicker: 'My first Swift app', year: '2025', cat: 'Education', status: 'Built', accent: 0,
    body: 'My first Swift app, written in January 2025.',
    detail: 'Swift is also what ROOTED SG’s iOS app is written in.',
    stack: ['Swift'],
    links: [{label: 'Source', href: 'https://github.com/itzpranav101/CryptoEducation'}],
  },
];

export const principles = [
  {n: '01', t: 'The smallest useful cue', d: 'Good help is the least that works. Meco is built around that, and I try to apply it to everything else I make.'},
  {n: '02', t: 'Say only what you measured', d: 'A spec should separate what is built, what is a prototype and what is just an idea. A smaller true claim beats a bigger one someone can poke a hole in.'},
  {n: '03', t: 'Keep it on the device', d: 'ROOTED checks plants on the phone, so a photo of someone’s balcony never has to leave it.'},
];

export const timeline: [string, string, string][] = [
  ['Jan 2024', 'Joined GitHub', 'First web projects'],
  ['Jan 2025', 'CryptoEducation', 'My first Swift app'],
  ['Jan 2026', 'FinFlow Academy', 'React and TypeScript'],
  ['Mar 2026', 'Chorefolio', 'Chores, gamified'],
  ['May 2026', 'Stavex', 'Startups for teens'],
  ['Aug 2026', 'Meco and EcoFlex', 'Dementia support, sustainability'],
  ['Sep 2026', 'ROOTED SG', 'iOS and Android'],
  ['Oct 2026', 'LinguaBomb', 'AI language tutor'],
];

export const toolkit: [string, string[]][] = [
  ['Apps', ['SwiftUI', 'Kotlin', 'Apple Vision']],
  ['Web', ['JavaScript', 'TypeScript', 'React', 'Vite']],
  ['Hardware', ['ESP32-S3', 'Bluetooth LE', 'CAD']],
];

export const EMAIL = 'pranav@stavex.org';
export const socials = [
  {label: 'GitHub', href: 'https://github.com/itzpranav101'},
  {label: 'Instagram', href: 'https://instagram.com/prx_50'},
  {label: 'Stavex', href: 'https://stavex.org'},
];

export const interests = [
  {name: 'Robotics', kicker: 'Hardware and firmware', line: 'Bluetooth, an ESP32-S3 and CAD: the RootStake sensor stake is the project that sits closest to this.', tone: 0},
  {name: 'Violin', kicker: 'Away from the screen', line: 'Something I do away from the screen.', tone: 2},
  {name: 'Badminton', kicker: 'Away from the screen', line: 'Something I do away from the screen.', tone: 1},
  {name: 'Golf', kicker: 'Away from the screen', line: 'Something I do away from the screen.', tone: 0},
];

export const taking = [
  {name: 'Samsung Solve for Tomorrow 2026', what: 'ROOTED SG, entered with Aashrith Reddy'},
  {name: 'IYEC 2026', what: 'ROOTED SG with the RootStake sensor hardware'},
  {name: 'Battle of Bots', what: 'LinguaBomb, built with Team Bomb Island for a one-day AI chatbot competition'},
  {name: 'Wharton Global High School Investment Competition', what: 'Team entry for the 2026–27 season'},
];
