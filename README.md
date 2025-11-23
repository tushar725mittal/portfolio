# Modern Portfolio Website

A beautiful, modern, and fully responsive portfolio website built with Next.js 14+, TypeScript, CSS Modules, and Framer Motion.

## Features

- 🎨 Modern and clean design with dark mode support
- 🚀 Built with Next.js 14+ App Router
- 💎 TypeScript for type safety
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🌙 Dark/Light mode toggle with system preference detection
- 📝 Blog system with dynamic routes
- 📧 Contact form with validation
- 🎯 SEO optimized
- ⚡ Performance optimized with Next.js Image component

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Email**: Resend (can be integrated)

## Project Structure

```
portfolio/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── skills/              # Skills page
│   ├── projects/            # Projects page
│   ├── experience/          # Experience page
│   ├── blog/                # Blog pages
│   │   └── [slug]/         # Dynamic blog post pages
│   ├── contact/             # Contact page
│   ├── api/                 # API routes
│   │   └── contact/        # Contact form API
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── DarkModeToggle.tsx
├── contexts/                # React contexts
│   └── ThemeContext.tsx    # Dark mode context
├── lib/                     # Utility functions
│   ├── data.ts             # Portfolio data
│   └── utils.ts            # Helper functions
├── styles/                  # CSS Module files
├── types/                   # TypeScript types
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:

\`\`\`bash
cd portfolio
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Information

Edit `lib/data.ts` to customize your portfolio content:

- **personalInfo**: Your name, title, bio, email, location, etc.
- **projects**: Your project portfolio
- **experiences**: Your work experience
- **skills**: Your technical skills
- **blogPosts**: Your blog posts
- **socialLinks**: Your social media links

### Styling

The project uses CSS variables for theming. Edit `app/globals.css` to customize:

- Colors (primary, secondary, accent)
- Fonts
- Spacing
- Shadows
- Border radius

### Images

Replace placeholder images in the `public/` directory with your own:

- Profile photo
- Project screenshots
- Blog post covers

## Email Integration

To enable the contact form to send emails:

1. Install Resend:

\`\`\`bash
npm install resend
\`\`\`

2. Get your API key from [resend.com](https://resend.com)

3. Add to `.env.local`:

\`\`\`
RESEND_API_KEY=your_api_key_here
\`\`\`

4. Uncomment the email sending code in `app/api/contact/route.ts`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables if using email functionality
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Google Cloud
- Railway
- Render

Build the project:

\`\`\`bash
npm run build
\`\`\`

Start the production server:

\`\`\`bash
npm start
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Adding Blog Posts

Blog posts are currently stored in `lib/data.ts`. For a production blog, consider:

1. **MDX**: Use `@next/mdx` to write posts in Markdown with JSX components
2. **Headless CMS**: Integrate with Contentful, Sanity, or Strapi
3. **Database**: Store posts in a database like PostgreSQL or MongoDB

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The portfolio is optimized for performance:

- Next.js App Router for efficient routing
- Image optimization with next/image
- Code splitting
- CSS Modules for scoped styling
- Lazy loading animations

## License

This project is open source and available under the MIT License.

## Contact

For questions or feedback, feel free to reach out through the contact form or connect on social media.

---

Built with ❤️ using Next.js, TypeScript, and Framer Motion.
