import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Precisamos de trazer o React de volta!
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),      
    tailwindcss(), 
  ],
});