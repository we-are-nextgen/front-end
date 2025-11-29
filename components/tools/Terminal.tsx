"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function XTermTerminal({ onCommand }) {
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const fitAddonRef = useRef(null);

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      theme: {
        background: "#000000",
        foreground: "#FFFFFF",
      },
    });

    const fitAddon = new FitAddon();

    terminalRef.current = term;
    fitAddonRef.current = fitAddon;

    term.loadAddon(fitAddon);
    term.open(containerRef.current);
    fitAddon.fit();

    let buffer = ""; // user input buffer

    const prompt = () => {
      term.write("\r\n> ");
    };

    prompt();

    term.onData((data) => {
      const code = data.charCodeAt(0);

      // Handle ENTER
      if (code === 13) {
        term.write("\r\n");

        if (onCommand) onCommand(buffer, term); // send command to parent

        buffer = "";
        prompt();
        return;
      }

      // Handle BACKSPACE
      if (code === 127) {
        if (buffer.length > 0) {
          buffer = buffer.slice(0, -1);

          // Move cursor back, erase char, move cursor back again
          term.write("\b \b");
        }
        return;
      }

      // Printable characters
      if (code >= 32 && code <= 126) {
        buffer += data;
        term.write(data);
      }
    });

    const handleResize = () => fitAddon.fit();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, [onCommand]);

  return (
    <div ref={containerRef} className="w-full h-full bg-black rounded" />
  );
}
