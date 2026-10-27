"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function RobotSprite({ hue }: { hue: number }) {
  const body = `hsl(${hue}, 70%, 62%)`;
  const bodyDark = `hsl(${hue}, 65%, 48%)`;
  const eye = "#0d0d0d";
  const glow = "#e0e0ff";
  return (
    <svg viewBox="0 0 16 20" width="100%" height="100%" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="7" y="0" width="2" height="2" fill={bodyDark} />
      <rect x="7" y="1" width="2" height="1" fill={glow} />
      <rect x="3" y="2" width="10" height="7" fill={body} />
      <rect x="3" y="8" width="10" height="1" fill={bodyDark} />
      <rect x="5" y="4" width="2" height="2" fill={eye} />
      <rect x="9" y="4" width="2" height="2" fill={eye} />
      <rect x="5" y="4" width="1" height="1" fill={glow} />
      <rect x="9" y="4" width="1" height="1" fill={glow} />
      <rect x="6" y="7" width="4" height="1" fill={bodyDark} />
      <rect x="4" y="9" width="8" height="6" fill={body} />
      <rect x="4" y="14" width="8" height="1" fill={bodyDark} />
      <rect x="7" y="11" width="2" height="2" fill={glow} />
      <rect x="2" y="9" width="2" height="5" fill={bodyDark} />
      <rect x="12" y="9" width="2" height="5" fill={bodyDark} />
      <rect className="leg leg-l" x="5" y="15" width="2" height="4" fill={bodyDark} />
      <rect className="leg leg-r" x="9" y="15" width="2" height="4" fill={bodyDark} />
    </svg>
  );
}

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

// vertical travel band of the mascot, as fractions of the viewport height
const TOP_FRAC = 0.16;
const BOTTOM_FRAC = 0.8;

export default function MascotPixel() {
  const t = useTranslations("Mascot");
  const [progress, setProgress] = useState(0);
  const [moving, setMoving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [hue, setHue] = useState(258);
  const [party, setParty] = useState(false);

  const hintIndex = useRef(0);
  const konamiPos = useRef(0);
  const moveTimer = useRef<number | undefined>(undefined);
  const bubbleTimer = useRef<number | undefined>(undefined);

  // drag bookkeeping
  const isDown = useRef(false);
  const draggedRef = useRef(false);
  const startY = useRef(0);

  const scrollTopFromProgress = (p: number) => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    return p * h;
  };

  // Follow scroll (when not dragging)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      setProgress(Math.max(0, Math.min(1, p)));
      setMoving(true);
      window.clearTimeout(moveTimer.current);
      moveTimer.current = window.setTimeout(() => setMoving(false), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(moveTimer.current);
    };
  }, []);

  const showBubble = (text: string, ms = 3200) => {
    setBubble(text);
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => setBubble(null), ms);
  };

  // Map a pointer Y to a scroll position and scroll there ("pulling" the page)
  const scrollFromPointer = (clientY: number) => {
    const vh = window.innerHeight;
    const top = TOP_FRAC * vh;
    const bottom = BOTTOM_FRAC * vh;
    let frac = (clientY - top) / (bottom - top);
    frac = Math.max(0, Math.min(1, frac));
    window.scrollTo({ top: scrollTopFromProgress(frac), behavior: "auto" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDown.current = true;
    draggedRef.current = false;
    startY.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDown.current) return;
    if (!draggedRef.current && Math.abs(e.clientY - startY.current) > 6) {
      draggedRef.current = true;
      setDragging(true);
      showBubble(t("hint6"), 1500);
    }
    if (draggedRef.current) {
      e.preventDefault();
      scrollFromPointer(e.clientY);
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!isDown.current) return;
    isDown.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    if (draggedRef.current) {
      setDragging(false);
    } else {
      // treated as a click → cycle hints
      const hints = [t("hint1"), t("hint2"), t("hint4"), t("hint5")];
      showBubble(hints[hintIndex.current % hints.length]);
      hintIndex.current += 1;
    }
  };

  // Konami code easter egg
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[konamiPos.current]) {
        konamiPos.current += 1;
        if (konamiPos.current === KONAMI.length) {
          konamiPos.current = 0;
          triggerParty();
        }
      } else {
        konamiPos.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerParty = () => {
    setParty(true);
    showBubble(t("hint3"), 4000);
    let h = 0;
    const spin = window.setInterval(() => {
      h = (h + 40) % 360;
      setHue(h);
    }, 120);
    window.setTimeout(() => {
      window.clearInterval(spin);
      setHue(258);
      setParty(false);
    }, 4000);
  };

  // Initial greeting
  useEffect(() => {
    const id = window.setTimeout(() => showBubble(t("hint1"), 3600), 2600);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const top = (TOP_FRAC + progress * (BOTTOM_FRAC - TOP_FRAC)) * 100;

  return (
    <div
      className={`mascot ${moving ? "walking" : ""} ${party ? "party" : ""} ${dragging ? "dragging" : ""}`}
      style={{ top: `${top}vh` }}
    >
      {bubble && <div className="mascot-bubble" role="status">{bubble}</div>}
      <button
        className="mascot-btn"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        aria-label="Mascote — arraste para percorrer as seções, ou clique para interagir"
        title="Me arrasta :)"
      >
        <RobotSprite hue={hue} />
      </button>
    </div>
  );
}
