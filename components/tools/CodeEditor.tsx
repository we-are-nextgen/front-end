"use client";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language = "javascript" }) {
  return (
    <div className="relative border border-gray-700 rounded-md overflow-hidden">
      <Editor
        height="250px"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(v) => setCode(v || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 12,
          lineNumbers: "on",
        }}
      />

      {/* Status bar */}
      <div className="w-full bg-gray-800 text-gray-300 text-xs px-2 py-1 border-t border-gray-700 flex justify-end">
        <span>{language.toUpperCase()}</span>
      </div>
    </div>
  );
}


enum Language {
  APEX = 'apex',
  AZCLI = 'azcli',
  BAT = 'bat',
  C = 'c',
  CLOJURE = 'clojure',
  COFFEESCRIPT = 'coffeescript',
  CPP = 'cpp',
  CSHARP = 'csharp',
  CSP = 'csp',
  CSS = 'css',
  DOCKERFILE = 'dockerfile',
  FSHARP = 'fsharp',
  GO = 'go',
  GRAPHQL = 'graphql',
  HANDLEBARS = 'handlebars',
  HTML = 'html',
  INI = 'ini',
  JAVA = 'java',
  JAVASCRIPT = 'javascript',
  JSON = 'json',
  KOTLIN = 'kotlin',
  LESS = 'less',
  LUA = 'lua',
  MARKDOWN = 'markdown',
  MSDAX = 'msdax',
  MYSQL = 'mysql',
  OBJECTIVE_C = 'objective-c',
  PASCAL = 'pascal',
  PERL = 'perl',
  PGSQL = 'pgsql',
  PHP = 'php',
  PLAINTEXT = 'plaintext',
  POSTIATS = 'postiats',
  POWERQUERY = 'powerquery',
  POWERSHELL = 'powershell',
  PUG = 'pug',
  PYTHON = 'python',
  R = 'r',
  RAZOR = 'razor',
  REDIS = 'redis',
  REDSHIFT = 'redshift',
  RUBY = 'ruby',
  RUST = 'rust',
  SB = 'sb',
  SCHEME = 'scheme',
  SCSS = 'scss',
  SHELL = 'shell',
  SOL = 'sol',
  SQL = 'sql',
  ST = 'st',
  SWIFT = 'swift',
  TCL = 'tcl',
  TYPESCRIPT = 'typescript',
  VB = 'vb',
  XML = 'xml',
  YAML = 'yaml',
}

// language values 
// https://www.npmjs.com/package/@monaco-editor/react
/* 
languages that have rich IntelliSense and validation
TypeScript
JavaScript
CSS
LESS
SCSS
JSON
HTML
languages with only basic syntax colorization
XML
PHP
C#
C++
Razor
Markdown
Diff
Java
VB
CoffeeScript
Handlebars
Batch
Pug
F#
Lua
Powershell
Python
Ruby
SASS
R
Objective-C */