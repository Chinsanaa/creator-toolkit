#!/usr/bin/env node
/**
 * Start frontend and backend dev servers in one terminal.
 * Usage: npm run dev (from repo root)
 */

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function prefixStream(stream, label, writer) {
  let buffer = '';
  stream.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      if (line.length) writer(`[${label}] ${line}\n`);
    }
  });
  stream.on('end', () => {
    if (buffer.length) writer(`[${label}] ${buffer}\n`);
  });
}

function start(name, cwd) {
  const child = spawn('npm', ['run', 'dev'], {
    cwd,
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe'],
    env: process.env,
  });

  prefixStream(child.stdout, name, (text) => process.stdout.write(text));
  prefixStream(child.stderr, name, (text) => process.stderr.write(text));

  child.on('exit', (code, signal) => {
    if (signal) {
      console.log(`[${name}] stopped (${signal})`);
      return;
    }
    console.log(`[${name}] exited with code ${code ?? 0}`);
    if (code && code !== 0) {
      process.exit(code);
    }
  });

  return child;
}

console.log('Starting Earnio dev servers…');
console.log('  Frontend → http://localhost:3000');
console.log('  Backend  → http://localhost:3001');
console.log('Press Ctrl+C to stop both.\n');

const backend = start('backend', path.join(repoRoot, 'backend'));
const frontend = start('frontend', path.join(repoRoot, 'frontend'));

function shutdown() {
  backend.kill();
  frontend.kill();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
