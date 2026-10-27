"use client";

import { useEffect } from "react";
import { socialLinks } from "@/lib/social-links";

// Easter egg para quem abre o DevTools
export default function ConsoleGreeting() {
  useEffect(() => {
    const w = window as Window & { __gustavoGreeted?: boolean };
    if (w.__gustavoGreeted) return;
    w.__gustavoGreeted = true;

    const robot = [
      "      ▄█▄",
      "   ▄███████▄",
      "   █  ▀ ▀  █",
      "   █▄▄▄▄▄▄▄█",
      "  ▐█ ▄███▄ █▌",
      "    ██   ██",
    ].join("\n");

    const purple = "color:#8b5cf6;font-weight:700;font-family:monospace;font-size:13px;line-height:1.1";
    const title = "color:#8b5cf6;font-weight:800;font-size:16px";
    const text = "color:#a0a0a0;font-size:13px";
    const green = "color:#25d366;font-weight:700;font-size:13px";

    console.log(`%c${robot}`, purple);
    console.log("%cOpa, dev curioso! 👋", title);
    console.log("%cProcurando bugs? Me chama no WhatsApp 😄", text);
    console.log(`%c${socialLinks.whatsapp.split("?")[0]}`, green);
    console.log("%cDica: aperte  /  no site pra abrir o terminal secreto.", text);
  }, []);

  return null;
}
