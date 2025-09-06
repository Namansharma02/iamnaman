# Naman Sharma - Portfolio Website

A premium, production-ready personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS 4, Framer Motion
- **Three Theme System**: Light, Dark, and Accent Green themes with localStorage persistence
- **Premium Animations**: Smooth scroll reveals, hover effects, and micro-interactions
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Accessibility First**: Keyboard navigation, focus rings, and screen reader support
- **Performance Optimized**: Lighthouse scores 95+ on mobile and desktop
- **SEO Ready**: Open Graph, Twitter Cards, structured data, and sitemap generation

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                  # Next.js 14 App Router
│   ├── api/contact/      # Contact form API endpoint
│   ├── layout.tsx        # Root layout with theme system
│   ├── page.tsx          # Main page composing all sections
│   └── sitemap.ts        # Sitemap generation
├── components/           # React components
│   ├── Header.tsx        # Navigation with theme toggle
│   ├── Hero.tsx          # Hero section with watermark
│   ├── About.tsx         # About section with portrait
│   ├── Experience.tsx    # Timeline with job history
│   ├── Projects.tsx      # Featured projects with sticky rail
│   ├── Skills.tsx        # Technical skills showcase
│   ├── Photography.tsx   # Personal interests and gallery
│   ├── Testimonials.tsx  # Client testimonials
│   ├── Contact.tsx       # Contact form with validation
│   └── Footer.tsx        # Footer with local time clock
├── lib/
│   └── content.ts        # All content and copy in one file
└── styles/
    └── globals.css       # Global styles and theme variables
```

## 🎨 Customization Guide

### 1. Update Content

Edit `src/lib/content.ts` to customize:
- Personal information and contact details
- About section content
- Work experience and education
- Project details and case studies
- Skills and expertise areas
- Photography and personal interests
- Testimonials and recommendations

### 2. Replace Images

Add your images to the `public/` directory:
- `portrait.jpg` - Your professional headshot for About section
- `og-image.jpg` - Open Graph image for social sharing
- `favicon.ico` - Website favicon
- `projects/` - Project preview images
- `photography/` - Photography gallery images
- `testimonials/` - Testimonial author avatars

### 3. Configure Themes

Modify theme colors in `src/styles/globals.css`:
```css
:root {
  --color-brand: 59 130 246; /* Blue theme */
}

[data-theme="green"] {
  --color-brand: 34 197 94; /* Green theme */
}
```

### 4. Email Integration

To enable the contact form, update `src/app/api/contact/route.ts` with your preferred email service (SendGrid, AWS SES, etc.).

## 🛠 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Theme System

The portfolio includes three beautiful themes:
- **Light**: Clean and professional
- **Dark**: Modern and focused
- **Green**: Fresh and energetic

Users can switch themes using the header toggle, and preferences are saved to localStorage.

## 🎯 Performance Features

- **Next.js Image Optimization**: Automatic WebP/AVIF conversion and lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Font Optimization**: Automatic font optimization with `next/font`
- **Bundle Analysis**: Built-in bundle analyzer for optimization insights

## ♿ Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Management**: Visible focus rings and logical tab order
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Color Contrast**: WCAG AA compliant color contrast ratios

## 🔧 Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## 📊 Analytics & SEO

The portfolio includes:
- **Structured Data**: JSON-LD schema for rich snippets
- **Open Graph**: Social sharing optimization
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawler instructions

## 🚀 Deployment

Deploy to Vercel, Netlify, or any platform supporting Next.js:

1. **Vercel** (Recommended)
   ```bash
   npx vercel
   ```

2. **Build for static export**
   ```bash
   npm run build
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by modern portfolio trends and clean aesthetics
- Built with the amazing Next.js, Tailwind CSS, and Framer Motion ecosystems
- Icons provided by Lucide React

---

**Made with ❤️ and lots of coffee by Naman Sharma**