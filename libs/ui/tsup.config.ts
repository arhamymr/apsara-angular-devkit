import { defineConfig } from 'tsup';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['@angular/core', '@angular/common', '@angular/forms'],
  onSuccess: async () => {
    copyFileSync(resolve(__dirname, 'src/theme.css'), resolve(__dirname, 'dist/theme.css'));
  },
});
