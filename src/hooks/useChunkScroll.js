import { useEffect, useRef, useState } from "react";

export default function useChunkScroll(containerRef, sectionRefs, options) {
  const mode = options?.mode || "chunk";
  const snapDuration = options?.snapDuration ?? 500;
  const wheelCooldown = options?.wheelCooldown ?? 450;
  const [index, setIndex] = useState(0);
  const animRef = useRef(false);
  const lastWheelRef = useRef(0);
  const timerRef = useRef(null);

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const scrollToIndex = (i) => {
    const c = containerRef.current;
    const s = sectionRefs.current;
    if (!c || !s || !s[i]) return;
    i = clamp(i, 0, s.length - 1);
    if (animRef.current && i === index) return;
    animRef.current = true;
    setIndex(i);
    s[i].scrollIntoView({ behavior: "smooth", block: "start" });
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      animRef.current = false;
    }, snapDuration);
  };

  const nearestIndex = () => {
    const s = sectionRefs.current;
    if (!s || s.length === 0) return 0;
    let best = 0;
    let bd = Infinity;
    for (let i = 0; i < s.length; i++) {
      const r = s[i].getBoundingClientRect();
      const center = r.top + r.height / 2;
      const d = Math.abs(center - window.innerHeight / 2);
      if (d < bd) {
        bd = d;
        best = i;
      }
    }
    return best;
  };

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const onWheel = (e) => {
      if (mode !== "chunk") return;
      const now = Date.now();
      if (now - lastWheelRef.current < wheelCooldown) return;
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      lastWheelRef.current = now;
      if (e.deltaY > 0) scrollToIndex(index + 1);
      else scrollToIndex(index - 1);
    };

    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        if (e.shiftKey && e.key === " ") scrollToIndex(index - 1);
        else scrollToIndex(index + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(index - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        const s = sectionRefs.current || [];
        scrollToIndex(s.length - 1);
      }
    };

    const onScroll = () => {
      if (animRef.current) return;
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        const i = nearestIndex();
        if (i !== index) scrollToIndex(i);
      }, 120);
    };

    const onHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const s = sectionRefs.current || [];
      const idx = s.findIndex((el) => el && el.id === id);
      if (idx >= 0) scrollToIndex(idx);
    };

    c.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey, { passive: false });
    c.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);

    return () => {
      c.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      c.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
      window.clearTimeout(timerRef.current);
    };
  }, [containerRef, sectionRefs, index, mode, snapDuration, wheelCooldown]);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    const s = sectionRefs.current || [];
    const idx = id ? s.findIndex((el) => el && el.id === id) : 0;
    if (idx >= 0) scrollToIndex(idx);
  }, []);

  return { index, scrollToIndex, setIndex };
}
