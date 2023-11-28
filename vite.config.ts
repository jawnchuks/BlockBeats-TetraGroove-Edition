import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
	// registerType: "prompt",
  registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest : {
  theme_color: "#ffffff",
  background_color: "#000000",
  icons: [
    {
      "purpose": "maskable",
      "sizes": "512x512",
      "src": "/icon512_maskable.png",
      "type": "image/png"
    },
    {
      "purpose": "any",
      "sizes": "512x512",
      "src": "/icon512_rounded.png",
      "type": "image/png"
    }
  ],
  orientation: "portrait",
  display: "standalone",
  lang: "en-US",
  name: "Tetris_v1",
  short_name: "tetris",
  start_url: "/",
  scope: "/",
  description: "Play tetris game for free"
},
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
	plugins: [react(), VitePWA(manifestForPlugin)],
})
