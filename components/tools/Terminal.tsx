"use client";

import { useEffect, useRef } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function Terminal() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const fitAddon = new FitAddon();
    const xterm = new XTerm({
      fontSize: 14,
      cursorBlink: true,
      theme: {
        background: "#1e1e1e",
        foreground: "#ffffff",
      },
    });

    xterm.loadAddon(fitAddon);
    xterm.open(containerRef.current);
    fitAddon.fit();

    // Welcome message — gentle, not shouting
    xterm.write("Welcome to the sandbox terminal.\r\n$ ");

    // Basic echo command
    xterm.onKey(({ key, domEvent }) => {
      const char = key;
      const ev = domEvent;

      if (ev.key === "Enter") {
        xterm.write("\r\n$ ");
      } else if (ev.key === "Backspace") {
        xterm.write("\b \b");
      } else {
        xterm.write(char);
      }
    });

    terminalRef.current = xterm;
    return () => xterm.dispose();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-64 rounded-lg overflow-hidden border shadow-inner bg-black"
    />
  );
}
