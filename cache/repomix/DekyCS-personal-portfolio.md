This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
.gitignore
components.json
eslint.config.js
index.html
jsconfig.json
package.json
public/vite.svg
README.md
src/App.css
src/App.jsx
src/components/awards-card.jsx
src/components/back-to-blog.jsx
src/components/footer.jsx
src/components/icon-button.jsx
src/components/navbar.jsx
src/components/place-info.jsx
src/components/post-card.jsx
src/components/project-card.jsx
src/components/section-title.jsx
src/components/theme-button.jsx
src/components/theme-provider.jsx
src/components/ui/aspect-ratio.jsx
src/components/ui/avatar.jsx
src/components/ui/badge.jsx
src/components/ui/button.jsx
src/components/ui/card.jsx
src/components/ui/carousel.jsx
src/components/ui/input.jsx
src/components/ui/separator.jsx
src/components/ui/tabs.jsx
src/components/ui/textarea.jsx
src/components/view-more.jsx
src/index.css
src/lib/utils.js
src/main.jsx
src/pages/blog.jsx
src/pages/blog/making-planit.jsx
src/pages/contact.jsx
src/pages/home.jsx
src/pages/projects.jsx
vercel.json
vite.config.js
```

# Files

## File: .gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## File: components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/App.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## File: eslint.config.js
```javascript
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
```

## File: index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Calistoga&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="/src/assets/favicon.ico">
    <title>Omar's Portfolio</title>

    <meta property="og:title" content="Omar's Portfolio">
    <meta property="og:description" content="Full-stack developer and CS student at John Abbott College. Skilled in Flutter, React, Python, and Firebase. Creator of PlanIt app and FaceIt security extension.">
    <meta property="og:image" content="https://www.omarlahloumimi.com/assets/face-LLCnEin1.jpeg">
    <meta property="og:url" content="https://omarlahloumimi.com">
    <meta property="og:type" content="website">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## File: jsconfig.json
```json
{
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
```

## File: package.json
```json
{
  "name": "portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-aspect-ratio": "^1.1.2",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.3",
    "@tailwindcss/vite": "^4.0.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "embla-carousel-react": "^8.5.2",
    "lucide-react": "^0.475.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.5",
    "tailwind-merge": "^3.0.1",
    "tailwindcss": "^4.0.6",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.19.0",
    "@types/node": "^22.13.1",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "eslint": "^9.19.0",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.18",
    "globals": "^15.14.0",
    "vite": "^6.1.0"
  }
}
```

## File: public/vite.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>
```

## File: README.md
```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
```

## File: src/App.css
```css
@import "tailwindcss";

@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 3.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(0 0% 3.9%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(0 0% 3.9%);
  --primary: hsl(0 0% 9%);
  --primary-foreground: hsl(0 0% 98%);
  --secondary: hsl(0 0% 96.1%);
  --secondary-foreground: hsl(0 0% 9%);
  --muted: hsl(0 0% 96.1%);
  --muted-foreground: hsl(0 0% 45.1%);
  --accent: hsl(0 0% 96.1%);
  --accent-foreground: hsl(0 0% 9%);
  --destructive: hsl(0 84.2% 60.2%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(0 0% 89.8%);
  --input: hsl(0 0% 89.8%);
  --ring: hsl(0 0% 3.9%);
  --chart-1: hsl(12 76% 61%);
  --chart-2: hsl(173 58% 39%);
  --chart-3: hsl(197 37% 24%);
  --chart-4: hsl(43 74% 66%);
  --chart-5: hsl(27 87% 67%);
  --radius: 0.6rem;
}

.dark {
  --background: hsl(0 0% 3.9%);
  --foreground: hsl(0 0% 98%);
  --card: hsl(0 0% 3.9%);
  --card-foreground: hsl(0 0% 98%);
  --popover: hsl(0 0% 3.9%);
  --popover-foreground: hsl(0 0% 98%);
  --primary: hsl(0 0% 98%);
  --primary-foreground: hsl(0 0% 9%);
  --secondary: hsl(0 0% 14.9%);
  --secondary-foreground: hsl(0 0% 98%);
  --muted: hsl(0 0% 14.9%);
  --muted-foreground: hsl(0 0% 63.9%);
  --accent: hsl(0 0% 14.9%);
  --accent-foreground: hsl(0 0% 98%);
  --destructive: hsl(0 62.8% 30.6%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(0 0% 14.9%);
  --input: hsl(0 0% 14.9%);
  --ring: hsl(0 0% 83.1%);
  --chart-1: hsl(220 70% 50%);
  --chart-2: hsl(160 60% 45%);
  --chart-3: hsl(30 80% 55%);
  --chart-4: hsl(280 65% 60%);
  --chart-5: hsl(340 75% 55%);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## File: src/App.jsx
```javascript
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Projects from './pages/projects'
import Blog from './pages/blog'
import Contact from './pages/contact'
import MakingPlanIt from './pages/blog/making-planit'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/blog/making-planit" element={<MakingPlanIt />}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </Router>
  )
}

export default App
```

## File: src/components/awards-card.jsx
```javascript
import * as React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react';

export default function AwardCard({ project }) {
    return (
        <Card className='w-31/64 max-sm:w-full'>
            <CardHeader>
                <AspectRatio ratio={16/9}>
                    <img 
                    src={project.image}
                    alt={project.title}
                    className='rounded-sm object-cover w-full h-full'/>
                </AspectRatio>
                <CardTitle className='pt-4'>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Button className='w-26 h-8 text-xs cursor-pointer'>
                    <BookOpen /> Read More
                </Button>
            </CardContent>
        </Card>
    );
}
```

## File: src/components/back-to-blog.jsx
```javascript
import * as React from "react"
import { ArrowLeft } from 'lucide-react';

export default function BackToBlog() {
    return (
        <a className='opacity-50 flex items-center gap-2 font-light hover:opacity-90 py-8' href="/blog">
            <ArrowLeft />
            back to blog
        </a>
    );
}
```

## File: src/components/footer.jsx
```javascript
import * as React from "react"
import { Mail, Github, Linkedin } from 'lucide-react';
import IconButton from '@/components/icon-button'


export default function Footer() {
    return (
        <footer className="pt-18 pb-32 flex justify-between items-center max-sm:flex-col-reverse gap-y-8 mt-auto">
          <p className="text-gray-400 text-xs">
              © 2025 <a className="hover:text-gray-700" href="https://omarlahloumimi.com">omarlahloumimi.com</a>
          </p>
          <div className='flex flex-row gap-8'>
            <IconButton Icon={Linkedin} size={18} link="https://www.linkedin.com/in/omar-lahlou-mimi-000988251/"></IconButton>
            <IconButton Icon={Github} size={18} link="https://github.com/DekyCS"></IconButton>
            <IconButton Icon={Mail} size={18} link="mailto:omarlahmimi@gmail.com"></IconButton>
          </div>
        </footer>
    );
}
```

## File: src/components/icon-button.jsx
```javascript
import * as React from "react"

export default function IconButton({ Icon, link, size = 24 }) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Icon size={size} className='opacity-60 hover:opacity-90' />
        </a>
    );
}
```

## File: src/components/navbar.jsx
```javascript
import * as React from "react";
import { ThemeButton } from '@/components/theme-button'

export default function Navbar() {
    return (
        <nav className='sticky top-0 bg-white/75 dark:bg-[#0a0a0a]/70 backdrop-blur-md z-50'>
            <div className='flex items-center justify-between py-6'>
            <div className='flex gap-8 max-sm:gap-4'>
                <a className="opacity-60 hover:opacity-90" href="/">home</a>
                <a className="opacity-60 hover:opacity-90" href="/projects">projects</a>
                <a className="opacity-60 hover:opacity-90" href="/blog">blog</a>
                <a className="opacity-60 hover:opacity-90" href="/contact">contact</a>
            </div>

            <ThemeButton />
            </div>
        </nav>
    );
}
```

## File: src/components/place-info.jsx
```javascript
import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PlaceInfo({ place }) {
    return (
        <div className="flex flex-row gap-4">
            <Avatar className="h-14 w-14 border">
                <AvatarImage 
                    src={place.imgSource} 
                    alt={place.company}
                    className="object-cover"
                />
                <AvatarFallback>{place.company[0]}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm opacity-50">{place.time}</p>
                <p className="font-bold">{place.company}</p>
                <p className="text-base opacity-50">{place.title}</p>
                <ul className="list-disc pl-4 text-base opacity-75">
                    {place.descriptions.map((description, index) => (
                        <li className="max-w-lg" key={index}>{description}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
```

## File: src/components/post-card.jsx
```javascript
import * as React from "react"

export default function PostCard({ post }) {
    return (
        <div className='flex flex-row items-center justify-between p-6 max-sm:flex-col gap-y-2'>
            <div>
                <h1 className='text-lg font-semibold'>{post.title}</h1>
                <p className='text-sm opacity-60 line-clamp-2'>{post.description}</p>
            </div>
            <p className='text-sm whitespace-nowrap max-sm:self-end'>{post.date}</p>
        </div>
    )
}
```

## File: src/components/project-card.jsx
```javascript
import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { Github, FlaskConical } from 'lucide-react';

export default function ProjectCard({ project }) {
    return (
        <Card className='w-full'>
            <CardHeader>
                <AspectRatio ratio={16/9}>
                    <a href={project.imageLink} target="_blank" rel="noopener noreferrer">
                        <img 
                        src={project.image}
                        alt={project.title}
                        className='rounded-sm object-cover w-full h-full'/>
                    </a>
                </AspectRatio>
                <CardTitle className='pt-4'>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                    <Badge variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <div>
                <div className="flex flex-wrap gap-2">
                    {project.buttons.map((button) => (
                        <Button className='mt-4 h-8 text-xs cursor-pointer'>
                            {button.type === "github" ? (
                                <a href={button.link} target="_blank" rel="noopener noreferrer" className="flex">
                                    <Github className="mr-2" />
                                    Source
                                </a>
                                ) : button.type === "testflight" ? (
                                    <a href={button.link} target="_blank" rel="noopener noreferrer" className="flex">
                                    <FlaskConical className="mr-2" />
                                    TestFlight
                                </a>
                                ) : null
                            }
                        </Button>
                    ))}
                </div>
                </div>
            </CardContent>
        </Card>
    );
}
```

## File: src/components/section-title.jsx
```javascript
import * as React from "react"
import ViewMore from "./view-more";

export default function SectionTitle({ title, link }) {
    return (
        <div className='flex justify-between pb-8'>
            <h1 className='text-3xl calistoga-regular max-sm:text-2xl'>{title}</h1>
            {link && <ViewMore link={link}/>}
        </div>
    );
}
```

## File: src/components/theme-button.jsx
```javascript
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from '@/components/theme-provider'

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="ghost" className="cursor-pointer" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? (
        <Sun />
      ) : (
        <Moon />
      )}
    </Button>
  )
}
```

## File: src/components/theme-provider.jsx
```javascript
import { createContext, useContext, useEffect, useState } from "react"

const initialState = {
  theme: "light",
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    // Temporarily disable transitions
    root.classList.add('disable-transitions')
    
    // Remove existing themes
    root.classList.remove("light", "dark")
    
    // Add new theme
    root.classList.add(theme)
    
    // Re-enable transitions after theme change
    setTimeout(() => {
      root.classList.remove('disable-transitions')
    }, 0)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    localStorage.setItem(storageKey, newTheme)
    setTheme(newTheme)
  }

  const value = {
    theme,
    toggleTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
```

## File: src/components/ui/aspect-ratio.jsx
```javascript
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }
```

## File: src/components/ui/avatar.jsx
```javascript
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props} />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

## File: src/components/ui/badge.jsx
```javascript
import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
```

## File: src/components/ui/button.jsx
```javascript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
```

## File: src/components/ui/card.jsx
```javascript
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## File: src/components/ui/carousel.jsx
```javascript
import * as React from "react"
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef((
  {
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  },
  ref
) => {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    };
  }, [api, onSelect])

  return (
    (<CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}>
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}>
        {children}
      </div>
    </CarouselContext.Provider>)
  );
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    (<div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props} />
    </div>)
  );
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    (<div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props} />)
  );
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    (<Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute  h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-left-12 top-1/2 -translate-y-1/2"
        : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>)
  );
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    (<Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-right-12 top-1/2 -translate-y-1/2"
        : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}>
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>)
  );
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
```

## File: src/components/ui/input.jsx
```javascript
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    (<input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props} />)
  );
}

export { Input }
```

## File: src/components/ui/separator.jsx
```javascript
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef((
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props} />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

## File: src/components/ui/tabs.jsx
```javascript
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

## File: src/components/ui/textarea.jsx
```javascript
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    (<textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />)
  );
}

export { Textarea }
```

## File: src/components/view-more.jsx
```javascript
import * as React from "react"
import { ArrowRight } from 'lucide-react';

export default function ViewMore({ link }) {
    return (
        <a className='opacity-50 flex items-center gap-2 font-light hover:opacity-90' href={link}>
            view more
            <ArrowRight />
        </a>
    );
}
```

## File: src/index.css
```css
@import "tailwindcss";

body {
    font-family: "Inter", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}

.calistoga-regular {
    font-family: "Calistoga", serif;
    font-weight: 400;
    font-style: normal;
}

.disable-transitions * {
    transition: none !important;
  }
```

## File: src/lib/utils.js
```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

## File: src/main.jsx
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## File: src/pages/blog.jsx
```javascript
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import * as React from "react"

export default function Blog() {
    return (
        <ThemeProvider defaultTheme="light">
            <div className='min-h-screen flex flex-col max-w-3xl mx-auto text-lg px-8'>

            {/* Navbar */}

            <Navbar />

            <h1 className='text-5xl calistoga-regular pt-8'>my blog.</h1>

            {/* Footer */}
            
            <Footer />

            </div>
        </ThemeProvider>

    )
}
```

## File: src/pages/blog/making-planit.jsx
```javascript
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import * as React from "react"
import BackToBlog from "@/components/back-to-blog";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

/* Images */
import planit from '@/assets/planit.jpg'
import planit1 from '@/assets/planit1.jpg'
import planit2 from '@/assets/planit2.jpg'
import planit3 from '@/assets/planit3.jpg'
import planit4 from '@/assets/planit4.jpg'

export default function MakingPlanIt() {
    
    const carouselImages = [planit, planit1, planit2, planit3, planit4];

    return (
        <ThemeProvider defaultTheme="light">
            <div className='min-h-screen flex flex-col max-w-3xl mx-auto text-lg px-8'>

            {/* Navbar */}

            <Navbar />

            <BackToBlog />

            {/* Image */}

            <div className="flex justify-center">
            <Carousel className="">
                <CarouselContent>
                    {carouselImages.map((image) => (
                        <CarouselItem className="flex justify-center">
                            <div className="p-2 max-w-fit">
                                <Card>
                                    <CardContent className="flex items-center justify-center p-4 h-96">
                                    <img 
                                    src={image}
                                    alt={"planit"}
                                    className='rounded-sm object-cover w-full h-full'/>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            </div>

            {/* Title */}

            {/* Content */}

            {/* Footer */}
            
            <Footer />

            </div>
        </ThemeProvider>

    )
}
```

## File: src/pages/contact.jsx
```javascript
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"
import { SendHorizontal } from 'lucide-react';

export default function Contact() {
    return (
        <ThemeProvider defaultTheme="light">
            <div className='min-h-screen flex flex-col max-w-3xl mx-auto text-lg px-8'>

            {/* Navbar */}

            <Navbar />

            <h1 className='text-5xl calistoga-regular py-8'>contact me.</h1>

            <form className="flex flex-col gap-y-4">
            <div className="flex flex-row gap-4 max-sm:flex-col">
                <Input type="name" placeholder="Name" />
                <Input type="email" placeholder="Email" />
            </div>
            <Textarea type="text" className="h-25 resize-none" placeholder="Leave feedback about the site, career opportunities or just to say hello etc." />

            <Button type="submit" className="cursor-pointer">
                Send Message <SendHorizontal />
            </Button>
            </form>

            {/* Footer */}
            
            <Footer />

            </div>
        </ThemeProvider>

    )
}
```

## File: src/pages/home.jsx
```javascript
import * as React from "react"
import { Button } from '@/components/ui/button'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IconButton from '@/components/icon-button'
import PlaceInfo from '@/components/place-info'
import SectionTitle from '@/components/section-title'
import ProjectCard from '@/components/project-card'
import { Card } from "@/components/ui/card"
import { FileDown, Mail, Github, Linkedin } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar'
import { Separator } from "@/components/ui/separator"
import Footer from '@/components/footer'
import PostCard from "@/components/post-card"
import AwardCard from "@/components/awards-card"

/* Images */

import face from '@/assets/face.jpeg'
import planit from '@/assets/planit.jpg'
import bellWinner from "@/assets/bell_winner.jpg"
import vanierProjectWinner from "@/assets/vanierproject_winner.jpg"
import vanierHacksWinner from "@/assets/vanierhacks-winner.jpg"
import faceit from '@/assets/faceit.png'
import cv from '@/assets/omar_cv.pdf'


export default function Home() {

    const jobs = [
        {
          "imgSource": "https://assets.grenier.qc.ca/cdn-cgi/image/q=90,format=webp,fit=pad,w=200,h=200/uploads/images/Logo-ITHQ-Marine-rgb-154839.png",
          "time": "Summer 2024",
          "company": "Institut de tourisme et d'hôtellerie du Québec",
          "title": "Research Assistant (Intern)",
          "descriptions": [
            "Developed a Python desktop application with Tkinter for project organization and building a system to automatically sort and classify documents",
            "Built web scraping solutions using BeautifulSoup and APIs to analyze pet policies across 100+ hotels, creating reports on industry standards"
          ]
        }
      ];
      
      const educations = [
        {
          "imgSource": "https://catholicmontreal.ca/wp-content/uploads/cache/images/jac-t/jac-t-564307454.png",
          "time": "August 2023 - May 2026",
          "company": "John Abbott College CEGEP",
          "title": "Computer Science Technical Program",
          "descriptions": []
        }
      ];
      
      const featuredProjects = [
        {
          "image": planit,
          "title": "PlanIt Mobile App",
          "description": "Smart group planning app that makes organizing hangouts easy by matching everyone's schedules and preferences, taking the hassle out of making plans",
          "tags": ["Flutter", "Dart", "Firebase", "Places API", "Xcode"],
          "imageLink": "https://github.com/SaidBecerra/planit",
          "buttons": [
            {
              "type": "github",
              "link": "https://github.com/SaidBecerra/planit"
            },
            {
              "type": "testflight",
              "link": "https://testflight.apple.com/join/5EPuyFGF"
            }
          ]
        },
        {
          "image": faceit,
          "title": "FaceIt",
          "description": "\"Fake\" browser extension that merges facial recognition with autofill for secure, password-free logins, protecting your accounts even if your device is stolen",
          "tags": ["Flask", "Python", "SQLite", "Face Recognition"],
          "imageLink": "https://github.com/DekyCS/geekfest",
          "buttons": [
            {
              "type": "github",
              "link": "https://github.com/DekyCS/geekfest"
            }
          ]
        }
      ];

      const featuredAwards = [
        {
          "image": bellWinner,
          "title": "2nd Place Hackathon Winner at Bell GeekFest",
          "source": "https://github.com/tedawf/tradingview-telegram-alerts"
        },
        {
          "image": vanierHacksWinner,
          "title": "2nd Place CTF Hackathon Winner at VanierHacks CSSA",
          "source": "https://github.com/tedawf/tradingview-telegram-alerts"
        },
        {
          "image": vanierProjectWinner,
          "title": "Most Creative Project at Vanier College",
          "source": "https://github.com/tedawf/tradingview-telegram-alerts"
        }
      ];
      
      const recentPosts = [
        {
          "title": "Blog is coming soon!",
          "description": "I am still writing my blogs are the moment",
          "date": "February 1, 2024",
          "source": ""
        },
      ];

    return (
        <ThemeProvider defaultTheme="light">
          <div className='min-h-screen flex flex-col max-w-3xl mx-auto text-lg px-8'>
    
            {/* Navbar */}
    
            <Navbar />
    
            {/* Heading */}
    
            <header className='flex flex-row items-center justify-between gap-12 pt-8 max-md:flex-col-reverse max-md:items-start'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-5xl calistoga-regular pb-4 max-sm:text-[42px]'>hi omar here 👋</h1>
                <p className='font-light'>19-year-old computer science student from Montreal 🇨🇦</p>
                <p className='font-light pb-4'>I like to develop full stack websites, mobile applications and eat korean bbq</p>
                <div className='flex flex-row gap-8 items-center'>
                  <Button variant="outline">
                    <a href={cv} className="flex flex-row gap-2 items-center" target="_blank" rel="noopener noreferrer">
                      Resume <FileDown />
                    </a>
                  </Button>
                  
                  <IconButton Icon={Linkedin} link="https://www.linkedin.com/in/omar-lahlou-mimi-000988251/"></IconButton>
                  <IconButton Icon={Github} link="https://github.com/DekyCS"></IconButton>
                  <IconButton Icon={Mail} link="mailto:omarlahmimi@gmail.com"></IconButton>
                </div>
              </div>
              <div className='flex-shrink-0 w-44'>
                <AspectRatio ratio={1}>
                  <img 
                  src={face}
                  alt="Omar's photo"
                  className='rounded-md object-cover w-full h-full'/>
                </AspectRatio>
              </div>
            </header>
    
            {/* Work / Education */}
    
            <div className='pt-18'>
              <Tabs defaultValue="Work" className='w-full'>
                <TabsList className='w-full'>
                  <TabsTrigger className='flex-1 cursor-pointer' value="Work">Work</TabsTrigger>
                  <TabsTrigger className='flex-1 cursor-pointer' value="Education">Education</TabsTrigger>
                </TabsList>
                <TabsContent value="Work">
                  <Card className="flex flex-col gap-y-8 pt-4 pb-4 pl-6 pr-6">
                    <PlaceInfo place={jobs[0]}/>
                  </Card>
                </TabsContent>
                <TabsContent value="Education">
                  <Card className="flex flex-col gap-y-8 pt-4 pb-4 pl-8 pr-16">
                    <PlaceInfo place={educations[0]}/>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
    
            {/* Featured Projects */}
    
            <div className='pt-18'>
              <SectionTitle title="featured projects" link="/projects" />
              
              <div className='flex flex-row gap-x-4 justify-between max-sm:flex-col gap-y-4'>
                {featuredProjects.map((project) => (
                  <ProjectCard project={project} />
                ))}
              </div>
              
            </div>
    
            {/* Featued Awards */}
    
            <div className='pt-18'>
              <SectionTitle title="featured awards" />

              <div className='flex flex-row flex-wrap gap-x-4 justify-between max-sm:flex-col gap-y-4'>
                {featuredAwards.map((project) => (
                  <AwardCard project={project} />
                ))}
              </div>
            </div>
    
            {/* Recent Posts */}
    
            <div className='pt-18'>
              <SectionTitle title="recent posts" link="/blog" />
    
              <Card>
                <PostCard post={recentPosts[0]} />
                {/* 
                <Separator />
                <PostCard post={recentPosts[1]} />
                */}
              </Card>
            </div>
    
            {/* Footer */}
    
            <Footer />
    
          </div>
        </ThemeProvider>
      );
}
```

## File: src/pages/projects.jsx
```javascript
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import * as React from "react"

/* Images */

import planit from '@/assets/planit.jpg'
import faceit from '@/assets/faceit.png'
import ProjectCard from "@/components/project-card"

export default function Projects() {
    const featuredProjects = [
    {
        "image": planit,
        "title": "PlanIt Mobile App",
        "description": "Smart group planning app that makes organizing hangouts easy by matching everyone's schedules and preferences, taking the hassle out of making plans",
        "tags": ["Flutter", "Dart", "Firebase", "Places API", "Xcode"],
        "imageLink": "https://github.com/SaidBecerra/planit",
        "buttons": [
        {
            "type": "github",
            "link": "https://github.com/SaidBecerra/planit"
        },
        {
            "type": "testflight",
            "link": "https://testflight.apple.com/join/5EPuyFGF"
        }
        ]
    },
    {
        "image": faceit,
        "title": "FaceIt",
        "description": "\"Fake\" browser extension that merges facial recognition with autofill for secure, password-free logins, protecting your accounts even if your device is stolen",
        "tags": ["Flask", "Python", "SQLite", "Face Recognition"],
        "imageLink": "https://github.com/DekyCS/geekfest",
        "buttons": [
        {
            "type": "github",
            "link": "https://github.com/DekyCS/geekfest"
        }
        ]
    }
    ];

    return (
        <ThemeProvider defaultTheme="light">
            <div className='min-h-screen flex flex-col max-w-3xl mx-auto text-lg px-8'>

            {/* Navbar */}

            <Navbar />

            <h1 className='text-5xl calistoga-regular py-8'>my projects.</h1>

            {/* Projects */}

            <div className='flex flex-row gap-x-4 justify-between max-sm:flex-col gap-y-4'>
                {featuredProjects.map((project) => (
                    <ProjectCard project={project} />
                ))}
            </div>

            {/* Footer */}

            <Footer />

            </div>
        </ThemeProvider>

    )
}
```

## File: vercel.json
```json
{
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
```

## File: vite.config.js
```javascript
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```
