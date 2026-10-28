"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { TbVolume, TbVolumeOff } from "react-icons/tb";
import { setSound, soundOn } from "@/lib/sound";

// Liga/desliga os sons 8 bits (desligados por padrão).
export default function SoundToggle() {
  const c = useTranslations("Common");
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(soundOn());
    const sync = (e: Event) => setOn(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener("sound-change", sync);
    return () => window.removeEventListener("sound-change", sync);
  }, []);

  const label = on ? c("somDesligar") : c("somLigar");
  return (
    <button
      className="theme-toggle arcade-toggle"
      onClick={() => setSound(!on)}
      aria-pressed={on}
      aria-label={label}
      title={label}
    >
      {on ? <TbVolume aria-hidden="true" /> : <TbVolumeOff aria-hidden="true" />}
    </button>
  );
}
