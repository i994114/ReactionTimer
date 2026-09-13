import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/ReactionTimer/',

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: '反応トレーニング',
        short_name: '反応トレ',
        start_url: '/ReactionTimer/',
        scope: '/ReactionTimer/',
        display: 'standalone',
        background_color: '#F8FAFC',
        theme_color: '#2563EB',

        icons: [
          {
            src: '/ReactionTimer/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/ReactionTimer/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})