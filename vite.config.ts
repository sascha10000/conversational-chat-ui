import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'S10kConversationalAgent',
      fileName: 's10k-conversational-agent',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
}); 