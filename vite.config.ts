import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	base: "https://fakhri112.github.io/fc-random-quote-generator/",
	plugins: [react()],
});
