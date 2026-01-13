import path from 'path';
import fs from 'fs';

export function getAvailableComponents(componentsPath: string): string[] {
  if (!fs.existsSync(componentsPath)) {
    return [];
  }

  const entries = fs.readdirSync(componentsPath, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}
