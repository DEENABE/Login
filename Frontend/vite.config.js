import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  theme:{
    extends:{
      fontFamily:{
        roboto:['Roboto', 'sans-serif'],
        opensans:['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    tailwindcss(), 
  ],
})