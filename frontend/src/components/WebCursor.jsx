import React, { useEffect, useRef, useState } from 'react';

// Cursor dot + dynamic web-threads that connect to nearby anchor points
export default function WebCursor() {
  const dotRef = useRef(null);
  const svgRef = useRef(null);
  const [threads, setThreads] = useState([]);
  const anchorsRef = useRef([]);
  const mouse = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  useEffect(() => {
    const collect = () => {
      const nodes = Array.from(document.querySelectorAll('[data-web-anchor]'));
      anchorsRef.current = nodes.map(el => {
        const r = el.getBoundingClientRect();
        return { el, x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };
    collect();
    const ro = new ResizeObserver(collect);
    ro.observe(document.body);
    window.addEventListener('scroll', collect, { passive: true });
    window.addEventListener('resize', collect);

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      // hover state
      const t = e.target;
      if (t && (t.closest('a,button,[role="button"],input,textarea,select,[data-hover]'))) {
        dotRef.current?.classList.add('hover');
      } else {
        dotRef.current?.classList.remove('hover');
      }
    };

    const tick = () => {
      collect();
      const { x, y } = mouse.current;
      const near = anchorsRef.current
        .map(a => ({ ...a, d: Math.hypot(a.x - x, a.y - y) }))
        .filter(a => a.d < 260)
        .sort((a, b) => a.d - b.d)
        .slice(0, 4);
      setThreads(near.map(a => ({ x1: x, y1: y, x2: a.x, y2: a.y, o: 1 - a.d / 260 })));
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', collect);
      window.removeEventListener('resize', collect);
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      <svg ref={svgRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}>
        {threads.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={`rgba(140,111,198,${(t.o * 0.55).toFixed(2)})`} strokeWidth="1" />
        ))}
      </svg>
      <div ref={dotRef} className="web-cursor" data-testid="web-cursor" />
    </>
  );
}
