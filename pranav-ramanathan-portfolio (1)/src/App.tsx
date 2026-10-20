import {useEffect, useRef, useState, type ReactNode} from 'react';
import Gradient from './Gradient';
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
function Link({to, children, className, ...rest}: {to: string; children: ReactNode; className?: string; 'aria-label'?: string; onMouseEnter?: () => void}) {
  return <a href={`#${to}`} className={className} {...rest}>{children}</a>;
}

function useReveal(key: string) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-r]');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {rootMargin: '0px 0px -8% 0px'});
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [key]);
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

/* ---------- shared bits ---------- */
function Media({p, big}: {p: Project; big?: boolean}) {
  if (p.media) return <img src={p.media.src} alt={p.media.alt} loading={big ? 'eager' : 'lazy'} className={`im ${p.media.kind}`} />;
  return <div className={`tile a${p.accent}`} role="img" aria-label={`${p.title} placeholder tile`}><span>{p.title}</span></div>;
}

function Marquee() {
  const items = ['Robotics', 'Violin', 'Dementia care', 'Badminton', 'Urban farming', 'Golf', 'Student startups', 'Investing'];
  const row = items.concat(items);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">{row.map((t, i) => <span key={i}>{t}<i>✦</i></span>)}</div>
    </div>
  );
}

function Cta() {
  return (
    <section className="cta" data-r>
      <p className="idx">Contact</p>
      <h2>Have something worth building? <em>Let&rsquo;s talk.</em></h2>
      <a className="mailbig" href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </section>
  );
}

/* ---------- pages ---------- */
function Home() {
  const teaser = projects.filter((p) => p.featured);
  return (
    <>
      <section className="hero">
        <p className="blurb">Student building robots, <em>and software that helps people,</em> through care, detail and restraint.</p>
        <h1 className="name"><span className="ln"><span>Pranav</span></span> <span className="ln"><em>Ramanathan.</em></span></h1>
        <div className="heroRow">
          <p className="scroll">Scroll ↓</p>
          <p className="now">Singapore · <b>Student</b></p>
        </div>
      </section>

      <Marquee />

      <section className="sec" data-r>
        <p className="idx">Hello</p>
        <p className="statement">I&rsquo;m a student in Singapore. I like making things that quietly help people, and I spend just as much time away from a screen: <em>violin, badminton and golf.</em></p>
        <Link to="/about" className="btnline">More about me →</Link>
      </section>

      <section className="sec">
        <p className="idx" data-r>What I care about</p>
        <ol className="three">
          {principles.map((p, i) => (
            <li key={p.n} data-r style={{transitionDelay: `${i * 80}ms`}}>
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
          <Link to="/beyond" className="more">All of it →</Link>
        </div>
        <ul className="tiles">
          {interests.map((it, i) => (
            <li key={it.name} data-r style={{transitionDelay: `${i * 70}ms`}}>
              <Link to="/beyond" className={`itile t${it.tone}`}>
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
          {taking.map((t, i) => (
            <li key={t.name} data-r style={{transitionDelay: `${i * 60}ms`}}><b>{t.name}</b><span>{t.what}</span></li>
          ))}
        </ul>
      </section>

      <section className="sec">
        <div className="secHead" data-r>
          <p className="idx">A few things I&rsquo;ve made</p>
          <Link to="/work" className="more">All projects →</Link>
        </div>
        <ul className="mini-list">
          {teaser.map((p, i) => (
            <li key={p.slug} data-r style={{transitionDelay: `${i * 60}ms`}}>
              <Link to={`/work/${p.slug}`}><b>{p.title}</b><span>{p.kicker}</span><small>{p.year}</small></Link>
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
      <h1 className="pageH" data-r>Not everything is <em>code.</em></h1>
      <p className="lead" data-r>Robotics, violin, badminton and golf. The things I do when I&rsquo;m not building software.</p>
      <ul className="tiles big">
        {interests.map((it, i) => (
          <li key={it.name} data-r style={{transitionDelay: `${(i % 2) * 70}ms`}}>
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
      <h1 className="pageH" data-r>Things I&rsquo;ve <em>made.</em></h1>
      <div className="chips" role="group" aria-label="Filter by type">
        {CATS.map((c) => <button key={c} className={c === f ? 'on' : ''} aria-pressed={c === f} onClick={() => setF(c)}>{c}</button>)}
      </div>
      <ul className="grid">
        {list.map((p, i) => (
          <li key={p.slug} data-r style={{transitionDelay: `${(i % 2) * 70}ms`}}>
            <Link to={`/work/${p.slug}`} className="card">
              <span className={`cm ${p.media?.kind ?? ''}`}><Media p={p} /></span>
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
      <Link to="/work" className="back">← All projects</Link>
      <p className="idx" data-r>{p.cat} · {p.year}</p>
      <h1 className="pageH" data-r>{p.title}</h1>
      <p className="lead" data-r>{p.kicker}</p>
      <figure className={`hero2 ${p.media?.kind ?? ''}`} data-r>
        <Media p={p} big />
        {p.media?.caption && <figcaption>{p.media.caption}</figcaption>}
      </figure>
      <div className="cols">
        <div data-r>
          <p className="big">{p.body}</p>
          <p className="muted">{p.detail}</p>
        </div>
        <dl className="meta" data-r>
          <dt>Status</dt><dd>{p.status}</dd>
          <dt>Type</dt><dd>{p.cat}</dd>
          <dt>Year</dt><dd>{p.year}</dd>
          <dt>Built with</dt><dd>{p.stack.join(', ')}</dd>
          {p.links.length > 0 && <><dt>Links</dt><dd className="ml">{p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}</dd></>}
        </dl>
      </div>
      <Link to={`/work/${next.slug}`} className="next" >
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
      <h1 className="pageH" data-r>A student who builds <em>things that help.</em></h1>
      <div className="cols">
        <div data-r>
          <p className="big">I&rsquo;m Pranav, a student in Singapore. I build robots, and software that helps people.</p>
          <p className="muted">Right now that means an app for people living with dementia, a plant-care app that checks plants on your phone, and a sensor that goes in the soil. Away from the screen: violin, badminton and golf.</p>
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
      <h1 className="pageH" data-r>Say <em>hello.</em></h1>
      <p className="lead" data-r>If you work on dementia care, urban farming, robotics or student startups, or you just want to compare notes, write to me.</p>
      <a className="mailbig" href={`mailto:${EMAIL}`} data-r>{EMAIL}</a>
      <ul className="soc" data-r>
        {socials.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer">{s.label} <span aria-hidden="true">↗</span></a></li>)}
      </ul>
    </section>
  );
}

function NotFound() {
  return <section className="sec page"><h1 className="pageH">Not <em>found.</em></h1><Link to="/" className="btnline">Back home →</Link></section>;
}

/* ---------- shell ---------- */
const NAV = [['/about', 'About'], ['/beyond', 'Beyond'], ['/work', 'Projects'], ['/contact', 'Contact']] as const;

export default function App() {
  const route = useRoute();
  const time = useSingaporeTime();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [past, setPast] = useState(false);
  const main = useRef<HTMLElement>(null);
  const seg = route.split('/').filter(Boolean);
  const top = seg[0] ?? '';

  useEffect(() => {
    scrollTo({top: 0, behavior: 'instant' as ScrollBehavior});
    setOpen(false);
    const p = top === 'work' && seg[1] ? projects.find((x) => x.slug === seg[1])?.title : ({work: 'Projects', about: 'About', beyond: 'Beyond', contact: 'Contact'} as Record<string, string>)[top];
    document.title = p ? `${p} · Pranav Ramanathan` : 'Pranav Ramanathan';
  }, [route]);
  useEffect(() => { document.documentElement.classList.add('js'); }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
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
  useReveal(route);

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
      <header className={`top ${solid ? 'solid' : ''}`}>
        <Link to="/" className="mark" aria-label="Pranav Ramanathan, home">pranav<i>.</i></Link>
        <nav aria-label="Primary" className="dnav">
          {time && <span className="clock">SG {time}</span>}
          {NAV.map(([to, l]) => <Link key={to} to={to} className={top === to.slice(1) ? 'cur' : ''}>{l}</Link>)}
        </nav>
        <button className="burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
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
        <ul>{NAV.map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul>
        <ul>{socials.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a></li>)}</ul>
      </footer>
    </>
  );
}
