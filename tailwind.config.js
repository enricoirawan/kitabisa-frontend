/** @type {import('tailwindcss').Config} */
import * as tailwindAnimate from "tailwindcss-animate"

module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			neutral: {
  				'0': '#ffffff',
  				'10': '#ebebeb',
  				'20': '#d3d3d3',
  				'30': '#bbbbbb',
  				'40': '#a3a3a3',
  				'50': '#929292',
  				'60': '#7c7c7c',
  				'70': '#666666',
  				'80': '#515151',
  				'90': '#3b3b3b',
  				'100': '#252525'
  			},
  			curelean: {
  				'10': '#e6f5fb',
  				'20': '#cfebf9',
  				'30': '#b1e0f4',
  				'50': '#10A8E5',
  				'60': '#09c7ec',
  				'70': '#0879a0'
  			},
  			cureleanGradient: {
  				'50': '#4FC0F5',
  				'100': '#004AEF'
  			},
  			razmatazz: {
  				'20': '#fbeaf0',
  				'30': '#f1b8b8',
  				'50': '#da3a68',
  				'60': '#ca2d49',
  				'80': '#982a3a'
  			},
  			mantis: {
  				'20': '#f0f9ed',
  				'30': '#b9f073',
  				'50': '#6cca51',
  				'60': '#619548',
  				'80': '#4b8138'
  			},
  			buttercup: {
  				'20': '#fff8e8',
  				'30': '#ffc4ac',
  				'50': '#ffb020',
  				'60': '#e5aa1c',
  				'80': '#b28316'
  			},
  			carrot: {
  				'20': '#fee8e8',
  				'30': '#ff7070',
  				'50': '#f65540',
  				'60': '#d04c45',
  				'80': '#ac3835'
  			},
  			mineshaft: {
  				'20': '#d3d3d3',
  				'30': '#989898',
  				'50': '#6a6a6a',
  				'60': '#444444',
  				'80': '#3a3a3a'
  			},
  			tundora: '#4A4A4A',
  			onyx: '#6A6A6A',
  			dustyGrey: '#909595',
  			davy: '#D1D0D0',
  			mercury: '#EBEBEB',
  			coal: '#F2F2F4',
  			skull: '#F8F8F8',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-sans)'
  			],
  			mono: [
  				'var(--font-mono)'
  			]
  		},
  	}
  },
  plugins: [
    "@tailwindcss/line-clamp",
    tailwindAnimate,
		require('tailwind-scrollbar-hide')
	],
}

