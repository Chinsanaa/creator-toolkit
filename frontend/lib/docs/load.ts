import fs from 'fs';
import path from 'path';

export function loadDocMarkdown(slug: string): string {
  const filePath = path.join(process.cwd(), 'content', 'docs', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Doc not found: ${slug}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}
