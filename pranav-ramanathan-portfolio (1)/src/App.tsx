import {useEffect, useRef, useState, type ReactNode} from 'react';
import gsap from 'gsap';
import Gradient from './Gradient';
import {Cursor, Preloader} from './fx';
import {Link, Roll, Split, initScroll, nav, reduced, smooth, usePageMotion} from './motion';
import {EMAIL, interests, projects, principles, socials, taking, timeline, toolkit, type Cat, type Project} from './data';

/* ---------- routing (hash based, so it deploys anywhere) ---------- */
function useRoute() {
  const get = () => (location.hash.replace(/^#/, '') || '/').split('?')[0];
  const [r, setR] = useState(get);
  useEffect(() => {
    const f = () => setR(get());
    addEventListener('hashchange', f);
    return () => removeEventListener('hashchange', f);
  }, []);
  return r;
}

function useSingaporeTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat('en-SG', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Singapore'}).format(new Date()));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const labelFor = (to: string) => {
  const s = to.split('/').filter(Boolean);
  if (!s.length) return 'Home';
  if (s[0] === 'work' && s[1]) return projects.find((p) => p.slug === s[1])?.title ?? 'Project';
  return ({work: 'Projects', about: 'About', beyond: 'Beyond', contact: 'Contact'} as Record<string, string>)[s[0]] ?? 'Pranav';
};

/* ---------- shared bits ---------- */
function Media({p, big, plx}: {p: Project; big?: boolean; plx?: boolean}) {
  const c = plx ? ' plx' : '';
  if (p.media) return <img src={p.media.src} alt={p.media.alt} loading={big ? 'eager' : 'lazy'} className={`im ${p.media.kind}${c}`} />;
  return <div className={`tile a${p.accent}${c}`} role="img" aria-label={`${p.title} placeholder tile`}><span>{p.title}</span></div>;
}

function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const items = ['Robotics', 'Violin', 'Dementia care', 'Badminton', 'Urban farming', 'Golf', 'Student startups', 'Investing'];
  const row = items.concat(items);
  useEffect(() => {
    if (reduced) return;
    const anim = track.current?.getAnimations()[0];
    if (!anim) return;
    const st = {rate: 1, target: 1};
    const onScroll = ({velocity}: {velocity: number}) => { st.target = 1 + Math.max(-4, Math.min(4, velocity * 0.45)) * 1.5; };
    smooth.lenis?.on('scroll', onScroll);
    const tick = () => { st.target += (1 - st.target) * 0.04; st.rate += (st.target - st.rate) * 0.1; anim.playbackRate = st.rate; };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); smooth.lenis?.off('scroll', onScroll); };
  }, []);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track" ref={track}>{row.map((t, i) => <span key={i}>{t}<i>✦</i></span>)}</div>
    </div>
  );
}

function Cta() {
  return (
    <section className="cta">
      <p className="idx" data-r>Contact</p>
      <Split as="h2">Have something worth building? <em>Let&rsquo;s talk.</em></Split>
      <a className="mailbig mag" href={`mailto:${EMAIL}`} data-r aria-label={EMAIL} data-cursor="mail" data-cursor-label="Write"><Roll>{EMAIL}</Roll></a>
    </section>
  );
}

const RLink = ({to, children, ...r}: {to: string; children: string; className?: string}) => <Link to={to} aria-label={children} {...r}><Roll>{children}</Roll></Link>;

/* ---------- pages ---------- */
function Home() {
  const teaser = projects.filter((p) => p.featured);
  return (
    <>
      <section className="hero">
        <p className="blurb" data-r>Student building robots, <em>and software that helps people,</em> through care, detail and restraint.</p>
        <Split as="h1" by="char" className="name">Pranav <em>Ramanathan.</em></Split>
        <div className="heroRow" data-r>
          <ul>
            {socials.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><Roll>{s.label}</Roll></a></li>)}
          </ul>
          <p className="scroll">Scroll ↓</p>
        </div>
      </section>

      <Marquee />

      <section className="sec">
        <p className="idx" data-r>Hello</p>
        <Split as="p" className="statement">I&rsquo;m a student in Singapore. I like making things that quietly help people, and I spend just as much time away from a screen: <em>violin, badminton and golf.</em></Split>
        <RLink to="/about" className="btnline mag">More about me →</RLink>
      </section>

      <section className="sec">
        <p className="idx" data-r>What I care about</p>
        <ol className="three">
          {principles.map((p) => (
            <li key={p.n} data-r>
              <span>{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sec">
        <div className="secHead" data-r>
          <p className="idx">Beyond the screen</p>
          <RLink to="/beyond" className="more">All of it →</RLink>
        </div>
        <ul className="tiles">
          {interests.map((it) => (
            <li key={it.name} data-r>
              <Link to="/beyond" className={`itile t${it.tone}`} data-cursor="view" data-cursor-label="Open">
                <small>{it.kicker}</small>
                <b>{it.name}</b>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec">
        <p className="idx" data-r>Taking part in</p>
        <ul className="rows2">
          {taking.map((t) => (
            <li key={t.name} data-r><b>{t.name}</b><span>{t.what}</span></li>
          ))}
        </ul>
      </section>

      <section className="sec">
        <div className="secHead" data-r>
          <p className="idx">A few things I&rsquo;ve made</p>
          <RLink to="/work" className="more">All projects →</RLink>
        </div>
        <ul className="mini-list">
          {teaser.map((p) => (
            <li key={p.slug} data-r>
              <Link to={`/work/${p.slug}`} aria-label={p.title}><b><Roll>{p.title}</Roll></b><span>{p.kicker}</span><small>{p.year}</small></Link>
            </li>
          ))}
        </ul>
      </section>

      <Cta />
    </>
  );
}

function Beyond() {
  return (
    <section className="sec page">
      <p className="idx" data-r>Beyond the screen</p>
      <Split as="h1" className="pageH">Not everything is <em>code.</em></Split>
      <p className="lead" data-r>Robotics, violin, badminton and golf. The things I do when I&rsquo;m not building software.</p>
      <ul className="tiles big">
        {interests.map((it) => (
          <li key={it.name} data-r>
            <div className={`itile t${it.tone}`}>
              <small>{it.kicker}</small>
              <b>{it.name}</b>
              <p>{it.line}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="idx sp" data-r>Taking part in</p>
      <ul className="rows2">
        {taking.map((t) => <li key={t.name} data-r><b>{t.name}</b><span>{t.what}</span></li>)}
      </ul>
    </section>
  );
}

const CATS: ('All' | Cat)[] = ['All', 'Apps', 'Web', 'Hardware', 'Education'];
function Work() {
  const [f, setF] = useState<'All' | Cat>('All');
  const list = projects.filter((p) => f === 'All' || p.cat === f);
  return (
    <section className="sec page">
      <p className="idx" data-r>Projects</p>
      <Split as="h1" className="pageH">Things I&rsquo;ve <em>made.</em></Split>
      <div className="chips" role="group" aria-label="Filter by type" data-r>
        {CATS.map((c) => <button key={c} className={c === f ? 'on' : ''} aria-pressed={c === f} onClick={() => setF(c)}>{c}</button>)}
      </div>
      <ul className="grid">
        {list.map((p) => (
          <li key={`${f}-${p.slug}`} data-r>
            <Link to={`/work/${p.slug}`} className="card" data-cursor="view" data-cursor-label="View">
              <span className={`cm imr ${p.media?.kind ?? ''}`}><span className="imi"><Media p={p} plx /></span></span>
              <span className="cbody">
                <b>{p.title}</b>
                <span>{p.kicker}</span>
                <small>{p.year} · {p.cat} · {p.status}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectPage({slug}: {slug: string}) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return <NotFound />;
  const p = projects[i], next = projects[(i + 1) % projects.length];
  return (
    <article className="sec page">
      <RLink to="/work" className="back">← All projects</RLink>
      <p className="idx" data-r>{p.cat} · {p.year}</p>
      <Split as="h1" by="char" className="pageH">{p.title}</Split>
      <p className="lead" data-r>{p.kicker}</p>
      <figure className={`hero2 ${p.media?.kind ?? ''}`}>
        <div className="imr"><div className="imi"><Media p={p} big /></div></div>
        {p.media?.caption && <figcaption data-r>{p.media.caption}</figcaption>}
      </figure>
      <div className="cols">
        <div>
          <Split as="p" className="big">{p.body}</Split>
          <p className="muted" data-r>{p.detail}</p>
        </div>
        <dl className="meta" data-r>
          <dt>Status</dt><dd>{p.status}</dd>
          <dt>Type</dt><dd>{p.cat}</dd>
          <dt>Year</dt><dd>{p.year}</dd>
          <dt>Built with</dt><dd>{p.stack.join(', ')}</dd>
          {p.links.length > 0 && <><dt>Links</dt><dd className="ml">{p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}</dd></>}
        </dl>
      </div>
      <Link to={`/work/${next.slug}`} className="next" data-cursor="view" data-cursor-label="Next">
        <small>Next project</small>
        <span>{next.title} →</span>
      </Link>
    </article>
  );
}

function About() {
  return (
    <section className="sec page">
      <p className="idx" data-r>About</p>
      <Split as="h1" className="pageH">A student who builds <em>things that help.</em></Split>
      <div className="cols">
        <div>
          <Split as="p" className="big">I&rsquo;m Pranav, a student in Singapore. I build robots, and software that helps people.</Split>
          <p className="muted" data-r>Right now that means an app for people living with dementia, a plant-care app that checks plants on your phone, and a sensor that goes in the soil. Away from the screen: violin, badminton and golf.</p>
        </div>
        <div data-r>
          <p className="mini">Toolkit</p>
          {toolkit.map(([g, xs]) => (
            <div className="tk" key={g}><b>{g}</b><span>{xs.join(' · ')}</span></div>
          ))}
        </div>
      </div>

      <p className="idx sp" data-r>How I work</p>
      <ol className="rules wide">
        {principles.map((p) => <li key={p.n} data-r><span>{p.n}</span><div><b>{p.t}</b><p>{p.d}</p></div></li>)}
      </ol>

      <p className="idx sp" data-r>Timeline</p>
      <ol className="tl">
        {timeline.map(([d, t, s]) => <li key={d} data-r><time>{d}</time><b>{t}</b><span>{s}</span></li>)}
      </ol>
    </section>
  );
}

function Contact() {
  return (
    <section className="sec page">
      <p className="idx" data-r>Contact</p>
      <Split as="h1" className="pageH">Say <em>hello.</em></Split>
      <p className="lead" data-r>If you work on dementia care, urban farming, robotics or student startups, or you just want to compare notes, write to me.</p>
      <a className="mailbig mag" href={`mailto:${EMAIL}`} data-r aria-label={EMAIL} data-cursor="mail" data-cursor-label="Write"><Roll>{EMAIL}</Roll></a>
      <ul className="soc" data-r>
        {socials.map((s) => <li key={s.href}><a className="mag" href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><Roll>{s.label}</Roll> <span aria-hidden="true">↗</span></a></li>)}
      </ul>
    </section>
  );
}

function NotFound() {
  return <section className="sec page"><Split as="h1" className="pageH">Not <em>found.</em></Split><RLink to="/" className="btnline">Back home →</RLink></section>;
}

/* ---------- shell ---------- */
const NAV = [['/about', 'About'], ['/beyond', 'Beyond'], ['/work', 'Projects'], ['/contact', 'Contact']] as const;

export default function App() {
  const route = useRoute();
  const time = useSingaporeTime();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [past, setPast] = useState(false);
  const [intro, setIntro] = useState(!reduced);
  const [ready, setReady] = useState(reduced);
  const main = useRef<HTMLElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const seg = route.split('/').filter(Boolean);
  const top = seg[0] ?? '';

  useEffect(() => initScroll(), []);
  useEffect(() => { document.documentElement.classList.add('js'); }, []);

  /* page transition: curtain wipe, swap route under cover, wipe away */
  useEffect(() => {
    nav.go = (to: string) => {
      const here = location.hash.replace(/^#/, '') || '/';
      if (busy.current || here === to) return;
      const c = curtain.current;
      if (reduced || !c) { location.hash = to; return; }
      busy.current = true;
      setOpen(false);
      const l = c.firstElementChild as HTMLElement;
      l.textContent = labelFor(to);
      gsap.timeline()
        .set(c, {pointerEvents: 'all'})
        .fromTo(c, {clipPath: 'inset(100% 0% 0% 0%)'}, {clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'expo.inOut'})
        .fromTo(l, {yPercent: 110, opacity: 0}, {yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out'}, '-=0.4')
        .add(() => { setReady(false); location.hash = to; smooth.lenis?.scrollTo(0, {immediate: true}); scrollTo(0, 0); }, '+=0.05')
        .to(l, {yPercent: -110, opacity: 0, duration: 0.55, ease: 'expo.in'}, '+=0.3')
        .to(c, {clipPath: 'inset(0% 0% 100% 0%)', duration: 0.85, ease: 'expo.inOut'}, '-=0.3')
        .add(() => setReady(true), '-=0.6')
        .set(c, {pointerEvents: 'none'})
        .add(() => { busy.current = false; });
    };
  }, []);

  useEffect(() => {
    smooth.lenis?.scrollTo(0, {immediate: true});
    scrollTo(0, 0);
    setOpen(false);
    const p = top === 'work' && seg[1] ? projects.find((x) => x.slug === seg[1])?.title : ({work: 'Projects', about: 'About', beyond: 'Beyond', contact: 'Contact'} as Record<string, string>)[top];
    document.title = p ? `${p} · Pranav Ramanathan` : 'Pranav Ramanathan';
  }, [route]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) smooth.lenis?.stop(); else if (!intro) smooth.lenis?.start();
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [open]);
  useEffect(() => {
    const f = () => { setSolid(scrollY > 40); setPast(scrollY > innerHeight * 0.55); };
    f();
    addEventListener('scroll', f, {passive: true});
    return () => removeEventListener('scroll', f);
  }, []);
  usePageMotion(route, ready);

  const variant = top === 'work' ? (seg[1] ? (projects.find((p) => p.slug === seg[1])?.accent ?? 1) : 1) : top === 'about' ? 2 : top === 'beyond' ? 1 : 0;
  const dim = top === '' && !past ? 1 : 0.5;

  let page: ReactNode;
  if (top === '') page = <Home />;
  else if (top === 'work') page = seg[1] ? <ProjectPage slug={seg[1]} /> : <Work />;
  else if (top === 'about') page = <About />;
  else if (top === 'beyond') page = <Beyond />;
  else if (top === 'contact') page = <Contact />;
  else page = <NotFound />;

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); main.current?.focus(); }}>Skip to content</a>
      <Gradient variant={variant} dim={dim} />
      <Cursor />
      {intro && <Preloader onReveal={() => setReady(true)} onDone={() => setIntro(false)} />}
      <div ref={curtain} className="curtain" aria-hidden="true"><span /></div>
      <header className={`top ${solid ? 'solid' : ''}`}>
        <Link to="/" className="mark" aria-label="Pranav Ramanathan, home">pranav<i>.</i></Link>
        <nav aria-label="Primary" className="dnav">
          {time && <span className="clock">SG {time}</span>}
          {NAV.map(([to, l]) => <Link key={to} to={to} aria-label={l} className={top === to.slice(1) ? 'cur' : ''}><Roll>{l}</Roll></Link>)}
        </nav>
        <button className="burger mag" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          <span className="sr">{open ? 'Close menu' : 'Open menu'}</span><i /><i />
        </button>
      </header>
      <div id="menu" className={`menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {[['/', 'Home'], ...NAV].map(([to, l], i) => <Link key={to} to={to} className={top === to.slice(1) ? 'cur' : ''}><small>0{i + 1}</small>{l}</Link>)}
        </nav>
        <ul>{socials.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a></li>)}</ul>
      </div>

      <main id="main" tabIndex={-1} ref={main} key={route} className="view">{page}</main>

      <footer className="foot">
        <div>
          <Link to="/" className="mark">pranav<i>.</i></Link>
          <p>© 2026 Pranav Ramanathan · Singapore</p>
        </div>
        <ul>{NAV.map(([to, l]) => <li key={to}><RLink to={to}>{l}</RLink></li>)}</ul>
        <ul>{socials.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><Roll>{s.label}</Roll></a></li>)}</ul>
      </footer>
    </>
  );
}
