/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      height: {
        'half-screen': 'calc(50vh - 3.5rem)',
        '3/4-screen': 'calc(75vh - 3.5rem)',
        'full-screen': 'calc(100vh - 3.5rem)',
      },
      colors: {
        arbovirus: "hsl(var(--arbo))",
        arbovirusHover: "hsl(var(--arbo-hover))",
        sc2virus: "hsl(var(--sc2))",
        sc2virusHover: "hsl(var(--sc2-hover))",
        denv: "#FFADAD",
        zikv: "#A0C4FF",
        chikv: "#9BF6FF",
        wnv: "#CAFFBF",
        yf: "#FFD6A5",
        mayv: "#c5a3ff",
        link: "#0000EE",
        "linkedin-icon": "#007ebb",
        "email-icon": "#495057",
        "twitter-icon": "#1d9bf0",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        backgroundHover: "hsl(var(--background-hover))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "expand-downwards": {
          from: {
            height: 0
          },
          to: {
            height: "var(--radix-navigation-menu-viewport-height)"
          }
        },
        "collapse-upwards": {
          from: {
            height: "var(--radix-navigation-menu-viewport-height)",
          },
          to: {
            height: 0
          }
        },
        "toast-hide": {
          from: {
            opacity: 1
          },
          to: {
            opacity: 0
          }
          // "0%": { opacity: 1 },
          // "100%": { opacity: 0 },
        },
        "toast-slide-in-right": {
          // "0%": { transform: `translateX(calc(100% + 1rem))` },
          // "100%": { transform: "translateX(0)" },
          from: {
            transform: 'translateX(calc(100% + 1rem))'
          },
          to: {
            transform: "translateX(0)"
          }
        },
        "toast-slide-in-bottom": {
          // "0%": { transform: `translateY(calc(100% + 1rem))` },
          // "100%": { transform: "translateY(0)" },
          from: {
            transform: 'translateY(calc(100% + 1rem))'
          },
          to: {
            transform: "translateY(0)"
          }
        },
        "toast-swipe-out-x": {
          // "0%": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          // "100%": {
          //   transform: `translateX(calc(100% + 1rem))`,
          // },
          from: {
            transform: "translateX(25px)"
          },
          to: {
            transform: `translateX(calc(100% + 1rem))`,
          },
        },
        "toast-swipe-out-y": {
          // "0%": { transform: "translateY(var(--radix-toast-swipe-end-y))" },
          // "100%": {
          //   transform: `translateY(calc(100% + 1rem))`,
          // },
          from: {
            transform: "translateY(25px)"
          },
          to: {
            transform: "translateY(calc(100% + 1rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "expand-downwards": "expand-downwards 0.4s forwards",
        "collapse-upwards": "collapse-upwards 0.4s forwards",
        "toast-hide": "toast-hide 100ms ease-in forwards",
        "toast-slide-in-right":
          "toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-slide-in-bottom":
          "toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-swipe-out-x": "toast-swipe-out-x 100ms ease-out forwards",
        "toast-swipe-out-y": "toast-swipe-out-y 100ms ease-out forwards",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '60%',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            h1: {
              fontWeight: '700',
              FontSize: '2.25rem',
              lineHeight: '2.5rem',
            },
            h2: {
              fontWeight: '700',
              FontSize: '1.875rem',
              lineHeight: '2.25rem',
            }
          },
        },
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
}