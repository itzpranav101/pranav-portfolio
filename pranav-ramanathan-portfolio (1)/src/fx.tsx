import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {fine, smooth} from './motion';

/* ---------- custom cursor ---------- */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !fine) return;
    document.documentElement.classList.add('has-cursor');
    const qx = gsap.quickTo(el, 'x', {duration: 0.35, ease: 'power3'});
    const qy = gsap.quickTo(el, 'y', {duration: 0.35, ease: 'power3'});
    const move = (e: MouseEvent) => { qx(e.clientX); qy(e.clientY); el.style.opacity = '1'; };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button');
      el.dataset.s = t ? (t.dataset.cursor ?? 'link') : '';
      if (label.current) label.current.textContent = t?.dataset.cursorLabel ?? '';
    };
    const out = () => { el.style.opacity = '0'; };
    addEventListener('mousemove', move);
    addEventListener('mouseover', over);
    document.documentElement.addEventListener('mouseleave', out);
    return () => { removeEventListener('mousemove', move); removeEventListener('mouseover', over); document.documentElement.removeEventListener('mouseleave', out); document.documentElement.classList.remove('has-cursor'); };
  }, []);
  if (!fine) return null;
  return <div ref={ref} className="cursor" aria-hidden="true"><span ref={label} /></div>;
}

/* ---------- intro ---------- */
export function Preloader({onReveal, onDone}: {onReveal: () => void; onDone: () => void}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current!;
    document.body.style.overflow = 'hidden';
    smooth.lenis?.stop();
    const num = {v: 0};
    const n = el.querySelector<HTMLElement>('.pre-n')!;
    const tl = gsap.timeline({onComplete: () => { document.body.style.overflow = ''; smooth.lenis?.start(); onDone(); }});
    tl.fromTo(el.querySelectorAll('.pc'), {yPercent: 115}, {yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.04}, 0.15)
      .to(num, {v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => { n.textContent = String(Math.round(num.v)).padStart(3, '0'); }}, 0.1)
      .to(el.querySelectorAll('.pc'), {yPercent: -115, duration: 0.7, ease: 'expo.in', stagger: 0.02}, 1.75)
      .add(onReveal, 2.15)
      .to(el, {clipPath: 'inset(0% 0% 100% 0%)', duration: 1.15, ease: 'expo.inOut'}, 2.1);
    return () => { tl.kill(); document.body.style.overflow = ''; };
  }, []);
  const chars = (s: string) => [...s].map((c, i) => <span className="pcw" key={i}><span className="pc">{c === ' ' ? ' ' : c}</span></span>);
  return (
    <div ref={root} className="pre" aria-hidden="true">
      <p className="pre-name"><span>{chars('Pranav ')}</span><em>{chars('Ramanathan.')}</em></p>
      <span className="pre-n">000</span>
    </div>
  );
}
