import {useEffect, useRef, useState} from 'react';

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

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r; uniform float t;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r; vec2 p=(gl_FragCoord.xy-.5*r)/min(r.x,r.y)*1.6;
  vec2 q=vec2(fbm(p+vec2(0.,t*.05)),fbm(p+vec2(5.2,1.3)-t*.04));
  float f=fbm(p+2.4*q+vec2(t*.03,0.));
  vec3 deep=vec3(.027,.07,.05), moss=vec3(.08,.40,.26), teal=vec3(.14,.66,.52), gold=vec3(1.,.74,.26);
  vec3 c=mix(deep,moss,smoothstep(.15,.7,f));
  c=mix(c,teal,smoothstep(.25,.85,q.x)*.7);
  c=mix(c,gold,smoothstep(.42,.80,f*(.55+.9*uv.y)));
  c*=mix(.22,1.,smoothstep(.0,.8,uv.y));
  gl_FragColor=vec4(c,1.);
}`;

function Gradient() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const gl = cv.getContext('webgl', {antialias: false, alpha: false, powerPreference: 'low-power'});
    if (!gl) return;
    const mk = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, mk(gl.VERTEX_SHADER, VERT));
    gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, visible = true, start = performance.now();
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 1.25) * 0.6;
      cv.width = Math.max(2, Math.floor(cv.clientWidth * d));
      cv.height = Math.max(2, Math.floor(cv.clientHeight * d));
      gl.viewport(0, 0, cv.width, cv.height);
    };
    const draw = () => {
      gl.uniform2f(uR, cv.width, cv.height);
      gl.uniform1f(uT, reduce ? 12 : (performance.now() - start) / 1000 + 12);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => { draw(); raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0; };
    const kick = () => { if (!reduce && !raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
    size(); draw(); kick();
    const ro = new ResizeObserver(() => { size(); draw(); });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); });
    io.observe(cv);
    document.addEventListener('visibilitychange', kick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', kick); };
  }, []);
  return <canvas ref={ref} className="gl" aria-hidden="true" />;
}

export default function App() {
  const time = useSingaporeTime();
  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <header className="hero" id="top">
        <Gradient />
        <p className="blurb">Student building robots, <em>and software that helps people,</em> through care, detail and restraint.</p>
        <h1 className="name"><span>Pranav</span> <em>Ramanathan.</em></h1>
        <nav className="bar" aria-label="Primary">
          <span className="ver">Singapore{time && <> &middot; {time}</>}</span>
          <ul className="out">
            <li><a href="https://github.com/itzpranav101" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://instagram.com/prx_50" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://stavex.org" target="_blank" rel="noreferrer">Stavex</a></li>
          </ul>
          <ul className="in">
            <li><a href="#work">Work</a></li>
            <li><a href="#info">Info</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="info" className="sec">
          <p className="idx">Info</p>
          <p className="big">I&rsquo;m Pranav, a student in Singapore. I build robots, and software that helps people. Right now: an app for people living with dementia, a plant-care app that checks plants on your phone, and a sensor that goes in the soil.</p>
          <ul className="rules">
            {principles.map((p) => <li key={p.n}><b>{p.t}.</b> {p.d}</li>)}
          </ul>
        </section>

        <section id="work" className="sec">
          <p className="idx">Work</p>
          {projects.map((p, i) => (
            <article key={p.id} className="proj" id={p.id}>
              <div className="pt">
                <span className="n">0{i + 1}</span>
                <h2>{p.title}</h2>
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
              <figure className={`shot ${p.media.kind}`}>
                <img src={p.media.src} alt={p.media.alt} loading="lazy" />
                {p.media.caption && <figcaption>{p.media.caption}</figcaption>}
              </figure>
            </article>
          ))}
        </section>

        <section className="sec">
          <p className="idx">Also built</p>
          <ul className="rows">
            {also.map((a) => (
              <li key={a.name}><a href={a.href} target="_blank" rel="noreferrer"><b>{a.name} <span aria-hidden="true">↗</span></b><span>{a.text}</span></a></li>
            ))}
          </ul>
        </section>

        <section className="sec">
          <p className="idx">Timeline</p>
          <ol className="timeline">
            {timeline.map(([d, t, sub]) => <li key={d}><time>{d}</time><span><b>{t}</b>, {sub.toLowerCase()}</span></li>)}
          </ol>
          <p className="muted">Away from the screen: violin, badminton and golf.</p>
        </section>

        <section id="contact" className="sec contact">
          <p className="idx">Contact</p>
          <p className="big">Work on dementia care, urban farming, robotics or student startups? Write to me.</p>
          <a className="mail" href="mailto:pranav@stavex.org">pranav@stavex.org</a>
        </section>
      </main>

      <footer className="foot">
        <p>© 2026 Pranav Ramanathan · Singapore</p>
        <p><a href="#top">Back to top ↑</a></p>
      </footer>
    </>
  );
}
