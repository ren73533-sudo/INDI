import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = fileURLToPath(new URL('../research/obsidian/', import.meta.url));
function filesAt(path) {
  return readdirSync(path, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? filesAt(resolve(path, entry.name)) : [resolve(path, entry.name)]);
}
const files = filesAt(resolve(base, 'Ethereal')).sort().map(path => {
  const buffer = readFileSync(path);
  return { path: relative(base, path).replaceAll('\\', '/'), sha256: createHash('sha256').update(buffer).digest('hex'), bytes: buffer.length };
});
const content = JSON.stringify({ format: 'ethereal-obsidian-import-v1', root: 'Ethereal', created: '2026-10-27', files }, null, 2) + '\n';
const target = resolve(base, 'manifest.json');
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== content) throw new Error('Obsidian manifest is stale');
} else writeFileSync(target, content);
console.log(`Obsidian manifest ${process.argv.includes('--check') ? 'verified' : 'updated'}: ${files.length} files.`);
