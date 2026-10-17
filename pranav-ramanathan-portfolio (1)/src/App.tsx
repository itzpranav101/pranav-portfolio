import {useEffect, useState} from 'react';

const B = import.meta.env.BASE_URL;

type Project = {
  id: string;
  title: string;
  kicker: string;
  body: string;
  detail: string;
  stack: string[];
  tone: string;
  media: {src: string; alt: string; kind: 'wide' | 'phone' | 'square'; caption?: string};
  links: {label: string; href: string}[];
};

const projects: Project[] = [
  {
    id: 'meco',
    title: 'Meco',
    kicker: 'Cognitive support for dementia',
    body: 'Dementia takes away context. Meco learns the people, routines and memories that matter to one person, then gives the smallest useful cue when everyday life gets difficult.',
    detail: 'It never does the task for the person. The goal is the least help that works, so they stay in charge of their own day.',
    stack: ['JavaScript', 'No build step', 'Zero runtime dependencies'],
    tone: 'sky',
    media: {src: `${B}img/meco.jpg`, alt: 'The Meco website: Dementia takes away context. Meco rebuilds it.', kind: 'wide'},
    links: [{label: 'Source', href: 'https://github.com/itzpranav101/meco-67-website-final'}],
  },
  {
    id: 'rooted',
    title: 'ROOTED SG',
    kicker: 'A plant-care app for Singapore',
    body: 'Keep a garden on the register, trade produce with neighbours, finish quests and fill your BioDex. Its motto is on the home screen: don’t count what we plant, count what we keep alive.',
    detail: 'Native SwiftUI on iOS with an Android port. Plant checks run on the phone using Apple’s Vision framework. Entered in Samsung Solve for Tomorrow 2026 with Aashrith Reddy.',
    stack: ['SwiftUI', 'Kotlin', 'On-device Vision'],
    tone: 'mint',
    media: {src: `${B}img/rooted.gif`, alt: 'Screen recording of the ROOTED SG app showing a plant page and the produce market', kind: 'phone', caption: 'Screen recording of the iOS app'},
    links: [{label: 'Source', href: 'https://github.com/itzpranav101/rootedsg'}],
  },
  {
    id: 'rootstake',
    title: 'RootStake',
    kicker: 'A sensor stake for ROOTED',
    body: 'A stake that goes in the soil and reports moisture, light and temperature to the app over Bluetooth, so plant care can be based on readings instead of guesses.',
    detail: 'The app side is built into ROOTED. The hardware is still a design and firmware in progress, and the render shown here is exactly that: a render.',
    stack: ['ESP32-S3', 'Bluetooth LE', 'CAD'],
    tone: 'peach',
    media: {src: `${B}img/rootstake.jpg`, alt: 'Render of the RootStake enclosure with a small solar panel and a dragonfly on top', kind: 'square', caption: 'Design render, not a photo of a built unit'},
    links: [],
  },
  {
    id: 'linguabomb',
    title: 'LinguaBomb',
    kicker: 'An AI language tutor',
    body: 'Practice English, Hindi, Spanish, French and Mandarin with a tutor that teaches, quizzes and role-plays with you. Every activity turns into XP.',
    detail: 'Built with Team Bomb Island for Battle of Bots, a one-day AI chatbot competition.',
    stack: ['JavaScript', 'Chatbot', 'Knowledge base'],
    tone: 'butter',
    media: {src: `${B}img/linguabomb.jpg`, alt: 'The LinguaBomb website: Speak a new language with confidence', kind: 'wide'},
    links: [
      {label: 'Live site', href: 'https://itzpranav101.github.io/linguabomb/'},
      {label: 'Source', href: 'https://github.com/itzpranav101/linguabomb'},
    ],
  },
];

const also = [
  {name: 'Stavex', text: 'A platform that helps teen founders turn ideas into real projects with weekly tasks and peer validation.', href: 'https://stavex.org', tone: 'lav'},
  {name: 'Kairo', text: 'A scheduler built around your energy levels, so focus time lands when you actually have focus.', href: 'https://github.com/itzpranav101', tone: 'sky'},
  {name: 'EcoFlex', text: 'A sustainability project built with web tech.', href: 'https://github.com/itzpranav101/EcoFlex', tone: 'mint'},
  {name: 'Chorefolio', text: 'Chores, tracked like a portfolio.', href: 'https://github.com/itzpranav101/Chorefolio', tone: 'peach'},
  {name: 'FinFlow Academy', text: 'Finance lessons for students, built in React and TypeScript.', href: 'https://github.com/itzpranav101/fin-flow-academy-verse', tone: 'butter'},
];

const principles = [
  {n: '01', t: 'The smallest useful cue', d: 'Good help is the least that works. Meco is built around that, and I try to apply it to everything else I make.'},
  {n: '02', t: 'Say only what you measured', d: 'A spec should separate what is built, what is a prototype and what is just an idea. A smaller true claim beats a bigger one someone can poke a hole in.'},
  {n: '03', t: 'Keep it on the device', d: 'ROOTED checks plants on the phone, so a photo of someone’s balcony never has to leave it.'},
];

const timeline = [
  ['Jan 2024', 'Joined GitHub', 'First web projects'],
  ['Jan 2025', 'CryptoEducation', 'My first Swift app'],
  ['Jan 2026', 'FinFlow Academy', 'React and TypeScript'],
  ['Mar 2026', 'Chorefolio', 'Chores, gamified'],
  ['May 2026', 'Stavex', 'Startups for teens'],
  ['Aug 2026', 'Meco and EcoFlex', 'Dementia support, sustainability'],
  ['Sep 2026', 'ROOTED SG', 'iOS and Android'],
  ['Oct 2026', 'LinguaBomb', 'AI language tutor'],
];

function useSingaporeTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () =>
      setT(new Intl.DateTimeFormat('en-SG', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Singapore'}).format(new Date()));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function App() {
  const time = useSingaporeTime();
  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <header className="nav">
        <a className="brand" href="#top">Pranav Ramanathan</a>
        <nav aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <h1>I&rsquo;m a student in Singapore building robots and software that helps people.</h1>
          <p className="lede">
            Right now: an app for people living with dementia, a plant-care app that runs its checks on your phone, and a sensor that goes in the soil.
          </p>
          <p className="meta">Singapore{time && <> &middot; {time}</>}</p>
        </section>

        <section id="work" className="section">
          <h2 className="label">Work</h2>
          {projects.map((p, i) => (
            <article key={p.id} className="project" id={p.id}>
              <figure className={`media ${p.media.kind}`}>
                <img src={p.media.src} alt={p.media.alt} loading="lazy" />
                {p.media.caption && <figcaption>{p.media.caption}</figcaption>}
              </figure>
              <div className="copy">
                <h3>{p.title}</h3>
                <p className="kicker">{p.kicker}</p>
                <p>{p.body}</p>
                <p className="muted">{p.detail}</p>
                <p className="stack">{p.stack.join(' · ')}</p>
                {p.links.length > 0 && (
                  <p className="links">
                    {p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <span aria-hidden="true">↗</span></a>)}
                  </p>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="section">
          <h2 className="label">Also built</h2>
          <ul className="list">
            {also.map((a) => (
              <li key={a.name}>
                <a href={a.href} target="_blank" rel="noreferrer">
                  <b>{a.name} <span aria-hidden="true">↗</span></b>
                  <span>{a.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="how" className="section">
          <h2 className="label">How I work</h2>
          <ul className="rules">
            {principles.map((p) => (
              <li key={p.n}><b>{p.t}.</b> {p.d}</li>
            ))}
          </ul>
        </section>

        <section id="path" className="section">
          <h2 className="label">Timeline</h2>
          <ol className="timeline">
            {timeline.map(([d, t, s]) => (
              <li key={d}><time>{d}</time><span><b>{t}</b>, {s.toLowerCase()}</span></li>
            ))}
          </ol>
          <p className="muted small">Away from the screen: violin, badminton and golf.</p>
        </section>

        <section id="contact" className="section">
          <h2 className="label">Contact</h2>
          <p className="lede-sm">If you work on dementia care, urban farming, robotics or student startups, or want to compare notes, write to me.</p>
          <p className="mail"><a href="mailto:pranav@stavex.org">pranav@stavex.org</a></p>
          <ul className="social">
            <li><a href="https://github.com/itzpranav101" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://instagram.com/prx_50" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://stavex.org" target="_blank" rel="noreferrer">Stavex</a></li>
          </ul>
        </section>
      </main>

      <footer>
        <p>© 2026 Pranav Ramanathan · Singapore</p>
        <p><a href="#top">Back to top ↑</a></p>
      </footer>
    </>
  );
}
