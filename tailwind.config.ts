import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exo: ['Exo', 'sans-serif'],
      },
      colors: {
        primary: "#7e2cd4",      
        background: "#1b1622",   
        text: "#ffffff", 
        gray: "#E2E4FB",         
        green: "#22f3d0",      
        red: "#aa2625", 
        darkSlate: "#202329"       
      },
      boxShadow: {
        insetWhiteGlow: "inset rgba(255, 255, 255, 0.25) 4px -3px 6px 0px, inset rgba(255, 255, 255, 0.25) -5px -2px 6px 0px",
        insetDarkGlow: "rgba(0, 0, 0, 0.5) -3px 3px 6px 0px inset",
      },      
    },
  },
  plugins: [],
} satisfies Config;
