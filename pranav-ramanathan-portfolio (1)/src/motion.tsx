import {Children, cloneElement, isValidElement, useEffect, useLayoutEffect, type AnchorHTMLAttributes, type CSSProperties, type ReactElement, type ReactNode} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const fine = typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Replaced by the page-transition in App; plain hash change as a fallback. */
export const nav = {go: (to: string) => { location.hash = to; }};
export const smooth: {lenis: Lenis | null} = {lenis: null};

export function initScroll() {
  if (reduced) return () => {};
  const lenis = new Lenis({lerp: 0.085, smoothWheel: true});
  smooth.lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => { gsap.ticker.remove(tick); lenis.destroy(); smooth.lenis = null; };
}

export function Link({to, children, ...rest}: {to: string; children: ReactNode} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={`#${to}`}
      {...rest}
      onClick={(e) => {
        rest.onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        nav.go(to);
      }}
    >
      {children}
    </a>
  );
}

/* ---------- per-letter roll on hover ---------- */
export function Roll({children}: {children: string}) {
  return (
    <span className="roll" aria-hidden="true">
      {[...children].map((c, i) => {
        const ch = c === ' ' ? ' ' : c;
        return <span className="rc" key={i} style={{'--i': i} as CSSProperties}><span>{ch}</span><span>{ch}</span></span>;
      })}
    </span>
  );
}

/* ---------- split text (words or characters) ---------- */
function textOf(n: ReactNode): string {
  if (typeof n === 'string' || typeof n === 'number') return String(n);
  if (Array.isArray(n)) return n.map(textOf).join('');
  if (isValidElement(n)) return textOf((n as ReactElement<{children?: ReactNode}>).props.children);
  return '';
}
function splitNode(n: ReactNode, k: string, by: 'word' | 'char'): ReactNode {
  if (typeof n === 'string') {
    return n.split(/(\s+)/).map((w, i) => {
      if (!w) return null;
      if (/^\s+$/.test(w)) return ' ';
      return by === 'word'
        ? <span className="w wd" key={`${k}-${i}`}><span className="wi">{w}</span></span>
        : <span className="w" key={`${k}-${i}`}>{[...w].map((c, j) => <span className="ch" key={j}><span className="wi">{c}</span></span>)}</span>;
    });
  }
  if (isValidElement(n)) {
    const el = n as ReactElement<{children?: ReactNode}>;
    return cloneElement(el, {key: k}, ...Children.toArray(el.props.children).map((c, i) => splitNode(c, `${k}${i}`, by)));
  }
  return n;
}
export function Split({as = 'span', by = 'word', className = '', children}: {as?: 'h1' | 'h2' | 'p' | 'span'; by?: 'word' | 'char'; className?: string; children: ReactNode}) {
  const Tag = as;
  return (
    <Tag className={`split ${className}`} data-by={by} aria-label={textOf(children)}>
      <span aria-hidden="true">{Children.toArray(children).map((c, i) => splitNode(c, `s${i}`, by))}</span>
    </Tag>
  );
}

/* ---------- page-level scroll animations ---------- */
export function usePageMotion(route: string, ready: boolean) {
  useLayoutEffect(() => {
    if (reduced) return;
    gsap.set('.split .wi', {yPercent: 118});
    gsap.set('[data-r]', {opacity: 0, y: 40});
    gsap.set('.imr', {clipPath: 'inset(0% 0% 100% 0%)'});
    gsap.set('.imr .imi', {scale: 1.3});
  }, [route]);

  useEffect(() => {
    if (reduced || !ready) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.split').forEach((el) => {
        const t = el.querySelectorAll('.wi');
        const hero = !!el.closest('.hero');
        const each = el.dataset.by === 'char' ? 0.035 : 0.055;
        ScrollTrigger.create({trigger: el, start: 'top 94%', once: true, onEnter: () => { gsap.to(t, {yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: each, delay: hero ? 0.1 : 0}); }});
      });
      ScrollTrigger.batch('[data-r]', {start: 'top 99%', once: true, onEnter: (b) => { gsap.to(b, {opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09, overwrite: true}); }});
      gsap.utils.toArray<HTMLElement>('.imr').forEach((el) => {
        ScrollTrigger.create({trigger: el, start: 'top 90%', once: true, onEnter: () => {
          gsap.to(el, {clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut'});
          gsap.to(el.querySelector('.imi'), {scale: 1, duration: 1.8, ease: 'expo.out'});
        }});
      });
      gsap.utils.toArray<HTMLElement>('.plx').forEach((el) => {
        gsap.fromTo(el, {yPercent: -5}, {yPercent: 5, ease: 'none', scrollTrigger: {trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true}});
      });
      if (fine) {
        gsap.utils.toArray<HTMLElement>('.mag').forEach((el) => {
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            gsap.to(el, {x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.28, duration: 0.4, ease: 'power3.out'});
          };
          const leave = () => gsap.to(el, {x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)'});
          el.addEventListener('mousemove', move);
          el.addEventListener('mouseleave', leave);
        });
      }
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    addEventListener('load', refresh);
    return () => { ctx.revert(); removeEventListener('load', refresh); };
  }, [route, ready]);
}
