import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  root: '.',
  srcDir: './src',
  integrations: [react()],
  output: 'static',
});

