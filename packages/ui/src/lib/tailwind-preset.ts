import { type Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  theme: {
    // ... 您现有的主题配置
  },
  plugins: [tailwindcssAnimate],
} satisfies Partial<Config>;
