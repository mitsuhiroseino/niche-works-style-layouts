import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.spec.ts',
  webServer: {
    command: 'pnpm storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:6006',
    viewport: { width: 1280, height: 800 },
  },
  workers: 1,
});
