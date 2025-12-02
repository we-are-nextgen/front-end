"use client";

import { useEffect, useRef } from "react";
import "xterm/css/xterm.css";

export default function XTermTerminal( { lab } ) {
  const containerRef = useRef(null);
  const termRef = useRef(null);
  const fitRef = useRef(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let term: any;
    let fitAddon: any;

    async function setup() {
      const { Terminal } = await import("xterm");
      const { FitAddon } = await import("xterm-addon-fit");

      // Terminal init
      term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        scrollback: 1000,
        disableStdin: false,
        theme: {
          background: "#000000",
          foreground: "#FFFFFF",
        },
      });

      fitAddon = new FitAddon();
      termRef.current = term;
      fitRef.current = fitAddon;

      term.loadAddon(fitAddon);
      term.open(containerRef.current);
      fitAddon.fit();

      connectWebSocket(term);

      // Resize fit
      const resize = () => fitAddon.fit();
      window.addEventListener("resize", resize);

      return () => {
        window.removeEventListener("resize", resize);
        socketRef.current?.close();
        term.dispose();
      };
    }

    setup();
  }, []);

  function connectWebSocket(term: any) {
    const ws = new WebSocket("ws://localhost:8080/terminal/" + lab.userId  );
    socketRef.current = ws;

    let inputBuffer = "";

    ws.onopen = () => {
      term.writeln("");
      term.writeln("\x1b[32mConnected to remote terminal.\x1b[0m");
      //term.write("> ");
    };

    ws.onmessage = (event) => {
      term.write(event.data);
    };
  

    ws.onerror = () => {
      if (term) {
        term.writeln("\r\n\x1b[31mConnection error. Falling back to local echo.\x1b[0m");
      }
    };

    ws.onclose = () => {
      if (term) {
        term.writeln("\r\n\x1b[33mDisconnected.\x1b[0m");
      }
    };

    // Handle user input
    term.onData((data: string) => {
      const code = data.charCodeAt(0);

      // ENTER key
      if (code === 13) {
        // 1. Echo the newline locally
        term.write("\r\n");

        if (ws.readyState === WebSocket.OPEN) {
          // 2. Send the command
          ws.send(inputBuffer + "\n");
        } else {
          term.write("(local) " + inputBuffer + "\r\n");
        }

        // 3. Clear buffer. DO NOT DRAW THE PROMPT LOCALLY.
        // The Java backend/shell must send the prompt after output is complete.
        inputBuffer = "";
        // REMOVED: term.write("> "); 
        return;
      }

      // BACKSPACE
      if (code === 127 || code === 8) {
        if (inputBuffer.length > 0) {
          inputBuffer = inputBuffer.slice(0, -1);
          term.write("\b \b");
        }
        return;
      }

      // Printable chars
      if (code >= 32 && code <= 126) {
        inputBuffer += data;
        term.write(data);
      }

    });
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-black rounded overflow-hidden"
      aria-label="Terminal Input Area"
      data-lpignore="true" 
      data-gramm="false"
    />
  );
}
