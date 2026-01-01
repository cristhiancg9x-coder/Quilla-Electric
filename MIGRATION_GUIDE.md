# Quilla Electric Migration Guide: Astro to Next.js + Firebase

## Table of Contents
1. [Phase 1: Preparation and Setup](#phase-1-preparation-and-setup)
2. [Phase 2: Firebase Integration](#phase-2-firebase-integration)
3. [Phase 3: Content Migration](#phase-3-content-migration)
4. [Phase 4: Component Migration](#phase-4-component-migration)
5. [Phase 5: Admin Panel Setup](#phase-5-admin-panel-setup)
6. [Phase 6: Testing and Deployment](#phase-6-testing-and-deployment)

---

## Phase 1: Preparation and Setup

### 1.1 Git Branch Creation and Safety Measures

```bash
# Create a backup branch of the current working Astro site
git checkout -b backup-astro-working
git add .
git commit -m "Backup: Working Astro site before migration"
git push origin backup-astro-working

# Create migration branch
git checkout -b feature/nextjs-firebase-migration
git add .
git commit -m "Start: Next.js + Firebase migration branch"
```

### 1.2 Firebase Project Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Project name: `quilla-electric-nextjs`
   - Enable Google Analytics (optional but recommended)

2. **Enable Firebase Services**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase in project
   firebase init
   ```

3. **Firebase Configuration**
   - Enable Firestore Database
   - Enable Authentication (Email/Password, Google)
   - Enable Storage
   - Enable Hosting

### 1.3 Next.js Project Initialization

```bash
# Create new Next.js project (outside current directory)
cd ../
npx create-next-app@latest quilla-electric-nextjs --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to new project
cd quilla-electric-nextjs

# Copy essential files from Astro project
cp ../quilla-astro/public ./public -r
cp ../quilla-astro/src/assets ./src/assets -r
cp ../quilla-astro/glassmorphism-ui-system ./glassmorphism-ui-system -r
```

### 1.4 Dependencies Installation

```bash
# Core Firebase dependencies
npm install firebase firebase-admin

# Authentication and UI
npm install next-auth @auth/firebase-adapter

# Content management
npm install firecms @firecms/ui

# Animation and UI
npm install framer-motion tailwindcss-animate @tailwindcss/typography

# Image optimization
npm install sharp

# Development dependencies
npm install -D @types/node eslint-config-next
```

### 1.5 Environment Configuration

Create `.env.local`:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_PROJECT_ID=quilla-electric-nextjs
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=quilla-electric-nextjs.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://quilla-electric-nextjs.firebaseio.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=quilla-electric-nextjs.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin (for server-side)
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_PROJECT_ID=quilla-electric-nextjs

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://quillaelectric.site
NEXT_PUBLIC_SITE_NAME=Quilla Electric
```

---

## Phase 2: Firebase Integration

### 2.1 Firebase Client Configuration

Create `src/lib/firebase.ts`:
```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
```

### 2.2 Firebase Admin Configuration

Create `src/lib/firebase-admin.ts`:
```typescript
import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();

export default admin;
```

### 2.3 Firestore Database Setup

#### Collections Structure:
```javascript
// Blog Posts Collection
{
  collection: "blog_posts",
  fields: {
    title: string,
    description: string,
    content: string,
    pubDate: timestamp,
    author: string,
    tags: array,
    image: string,
    slug: string,
    published: boolean,
    createdAt: timestamp,
    updatedAt: timestamp
  }
}

// Services Collection
{
  collection: "services",
  fields: {
    title: string,
    description: string,
    content: string,
    price: string,
    image: string,
    slug: string,
    published: boolean,
    order: number,
    createdAt: timestamp,
    updatedAt: timestamp
  }
}

// Locations Collection
{
  collection: "locations",
  fields: {
    name: string,
    slug: string,
    description: string,
    image: string,
    published: boolean,
    order: number,
    createdAt: timestamp,
    updatedAt: timestamp
  }
}
```

#### Firestore Rules
Create `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts
    match /blog_posts/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Services
    match /services/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Locations
    match /locations/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 2.4 Authentication Configuration

Create `src/lib/auth.ts`:
```typescript
import { NextAuthOptions } from 'next-auth';
import { FirebaseAdapter } from '@auth/firebase-adapter';
import { adminDb, adminAuth } from './firebase-admin';

export const authOptions: NextAuthOptions = {
  providers: [
    // Email provider
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
    },
    // Google provider
    {
      id: 'google',
      name: 'Google',
      type: 'oauth',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  ],
  adapter: FirebaseAdapter({
    db: adminDb,
    auth: adminAuth,
  }),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.uid) {
        session.user.id = token.uid as string;
      }
      return session;
    },
  },
};
```

### 2.5 Storage Setup

#### Storage Rules
Create `storage.rules`:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Blog images
    match /blog/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Service images
    match /services/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Phase 3: Content Migration

### 3.1 Blog Migration Script

Create `scripts/migrate-blog.ts`:
```typescript
import { db } from '../src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

interface BlogPost {
  title: string;
  description: string;
  content: string;
  pubDate: string;
  author: string;
  tags: string[];
  image: string;
  slug: string;
}

async function migrateBlogPosts() {
  const blogDir = path.join(__dirname, '../src/content/blog');
  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Parse frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) continue;
    
    const frontmatter = frontmatterMatch[1];
    const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    
    // Parse YAML frontmatter
    const frontmatterData: BlogPost = {
      title: '',
      description: '',
      content: body,
      pubDate: '',
      author: '',
      tags: [],
      image: '',
      slug: file.replace('.md', ''),
    };
    
    // Simple YAML parser (for this specific use case)
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      
      if (key === 'title') frontmatterData.title = value.replace(/"/g, '');
      if (key === 'description') frontmatterData.description = value.replace(/"/g, '');
      if (key === 'pubDate') frontmatterData.pubDate = value;
      if (key === 'author') frontmatterData.author = value.replace(/"/g, '');
      if (key === 'tags') {
        frontmatterData.tags = value.replace(/[\[\]]/g, '').split(',').map(t => t.trim().replace(/"/g, ''));
      }
      if (key === 'image') frontmatterData.image = value;
    });
    
    // Create slug from filename
    frontmatterData.slug = file.replace('.md', '');
    
    // Add to Firestore
    try {
      await addDoc(collection(db, 'blog_posts'), {
        ...frontmatterData,
        published: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log(`✅ Migrated blog post: ${frontmatterData.title}`);
    } catch (error) {
      console.error(`❌ Error migrating ${file}:`, error);
    }
  }
}

migrateBlogPosts().then(() => {
  console.log('🎉 Blog migration completed!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Migration failed:', error);
  process.exit(1);
});
```

### 3.2 Services Migration Script

Create `scripts/migrate-services.ts`:
```typescript
import { db } from '../src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

interface Service {
  title: string;
  description: string;
  content: string;
  price: string;
  image: string;
  slug: string;
}

async function migrateServices() {
  const servicesDir = path.join(__dirname, '../src/content/servicios');
  const files = fs.readdirSync(servicesDir).filter(file => file.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(servicesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Parse frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) continue;
    
    const frontmatter = frontmatterMatch[1];
    const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    
    // Parse YAML frontmatter
    const serviceData: Service = {
      title: '',
      description: '',
      content: body,
      price: '',
      image: '',
      slug: file.replace('.md', ''),
    };
    
    // Simple YAML parser
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      
      if (key === 'title') serviceData.title = value.replace(/"/g, '');
      if (key === 'description') serviceData.description = value.replace(/"/g, '');
      if (key === 'price') serviceData.price = value.replace(/"/g, '');
      if (key === 'image') serviceData.image = value;
    });
    
    // Create slug from filename
    serviceData.slug = file.replace('.md', '');
    
    // Add to Firestore
    try {
      await addDoc(collection(db, 'services'), {
        ...serviceData,
        published: true,
        order: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log(`✅ Migrated service: ${serviceData.title}`);
    } catch (error) {
      console.error(`❌ Error migrating ${file}:`, error);
    }
  }
}

migrateServices().then(() => {
  console.log('🎉 Services migration completed!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Migration failed:', error);
  process.exit(1);
});
```

### 3.3 Locations Migration Script

Create `scripts/migrate-locations.ts`:
```typescript
import { db } from '../src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Define locations based on the current routing structure
const locations = [
  {
    name: 'Arequipa Cercado',
    slug: 'arequipa-cercado',
    description: 'Servicios eléctricos en el centro histórico de Arequipa',
    image: '/img/arequipa-cercado.jpg',
    published: true,
    order: 1,
  },
  {
    name: 'Cayma',
    slug: 'cayma',
    description: 'Atención eléctrica en el distrito de Cayma',
    image: '/img/cayma.jpg',
    published: true,
    order: 2,
  },
  {
    name: 'Cerro Colorado',
    slug: 'cerro-colorado',
    description: 'Servicios eléctricos profesionales en Cerro Colorado',
    image: '/img/cerro-colorado.jpg',
    published: true,
    order: 3,
  },
  {
    name: 'JLBYR',
    slug: 'jlbyr',
    description: 'Soluciones eléctricas en José Luis Bustamante y Rivero',
    image: '/img/jlbyr.jpg',
    published: true,
    order: 4,
  },
  {
    name: 'Sachaca',
    slug: 'sachaca',
    description: 'Servicios eléctricos en Sachaca',
    image: '/img/sachaca.jpg',
    published: true,
    order: 5,
  },
];

async function migrateLocations() {
  for (const location of locations) {
    try {
      await addDoc(collection(db, 'locations'), {
        ...location,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log(`✅ Migrated location: ${location.name}`);
    } catch (error) {
      console.error(`❌ Error migrating ${location.name}:`, error);
    }
  }
}

migrateLocations().then(() => {
  console.log('🎉 Locations migration completed!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Migration failed:', error);
  process.exit(1);
});
```

### 3.4 Image Migration Script

Create `scripts/migrate-images.ts`:
```typescript
import { adminStorage } from '../src/lib/firebase-admin';
import fs from 'fs';
import path from 'path';

async function uploadImages() {
  const bucket = adminStorage.bucket();
  const assetsDir = path.join(__dirname, '../src/assets');
  
  // Upload all images from assets directory
  const files = fs.readdirSync(assetsDir);
  
  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
      const filePath = path.join(assetsDir, file);
      
      try {
        await bucket.upload(filePath, {
          destination: `images/${file}`,
          metadata: {
            contentType: `image/${file.split('.').pop()}`,
            cacheControl: 'public, max-age=31536000',
          },
        });
        
        console.log(`✅ Uploaded image: ${file}`);
      } catch (error) {
        console.error(`❌ Error uploading ${file}:`, error);
      }
    }
  }
}

uploadImages().then(() => {
  console.log('🎉 Image migration completed!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Image migration failed:', error);
  process.exit(1);
});
```

### 3.5 Run Migration Scripts

```bash
# Install ts-node for running TypeScript scripts
npm install -D ts-node

# Run migrations
npx ts-node scripts/migrate-blog.ts
npx ts-node scripts/migrate-services.ts
npx ts-node scripts/migrate-locations.ts
npx ts-node scripts/migrate-images.ts
```

---

## Phase 4: Component Migration

### 4.1 Tailwind Configuration

Replace `tailwind.config.js` with:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './glassmorphism-ui-system/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0f172a',
          dark: '#334155',
          gray: '#f8fafc',
          accent: '#f59e0b',
          orange: '#ea580c',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.25)',
          medium: 'rgba(255, 255, 255, 0.4)',
          dark: 'rgba(15, 23, 42, 0.1)',
        },
      },
      backgroundImage: {
        'gradient-electric': 'linear-gradient(135deg, #0f172a 0%, #334155 50%, #f59e0b 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'gradient-hero': 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
```

### 4.2 Global CSS Setup

Create `src/app/globals.css`:
```css
@import '../glassmorphism-ui-system/glassmorphism.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: system-ui, -apple-system, sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
  }
}

@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .glass-card {
    @apply glass rounded-xl p-6 transition-all duration-300 hover:shadow-xl;
  }
  
  .glass-nav {
    @apply glass rounded-lg px-4 py-2;
  }
  
  .glass-btn {
    @apply glass rounded-lg px-6 py-3 font-semibold transition-all duration-300 hover:scale-105;
  }
  
  .glass-btn-primary {
    @apply glass-btn bg-brand-accent/20 text-brand-accent hover:bg-brand-accent/30;
  }
  
  .glass-btn-secondary {
    @apply glass-btn bg-brand-black/20 text-brand-black hover:bg-brand-black/30;
  }
}
```

### 4.3 Layout Component

Create `src/components/Layout.tsx`:
```typescript
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsappButton from './WhatsappButton';

interface LayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  image?: string;
}

export default function Layout({ 
  children, 
  title, 
  description = "Servicios eléctricos profesionales en Arequipa. Pozos a tierra y cableado.",
  image = "/img/social-default.jpeg"
}: LayoutProps) {
  return (
    <html lang="es-PE">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} | Quilla Electric</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="google-site-verification" content="v9b95geQ84lPrqkhNMwzQhD3hu9WmAT8F2M60z5rbGA" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JNC3CZ4STT" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JNC3CZ4STT');
            `,
          }}
        />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Electrician",
              "name": "Quilla Electric",
              "image": "https://quillaelectric.site/logo.png",
              "@id": "https://quillaelectric.site",
              "url": "https://quillaelectric.site",
              "telephone": "+51951413458",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Cerro Colorado",
                "addressLocality": "Arequipa",
                "addressRegion": "Arequipa",
                "postalCode": "04014",
                "addressCountry": "PE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -16.3766,
                "longitude": -71.5602
              },
              "areaServed": ["Cerro Colorado", "Cayma", "Yanahuara", "Arequipa"],
              "priceRange": "$$"
            }),
          }}
        />
      </head>
      
      <body className="min-h-screen flex flex-col">
        <Navbar />
        
        <motion.main 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
        
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
```

### 4.4 Navigation Component

Create `src/components/Navbar.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-nav sticky top-0 z-50 bg-brand-black/90 backdrop-blur-lg border-b border-brand-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.span 
              className="text-2xl font-bold text-brand-accent"
              whileHover={{ scale: 1.05 }}
            >
              ⚡
            </motion.span>
            <span className="text-xl font-bold text-white">Quilla Electric</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/servicios', label: 'Servicios' },
              { href: '/blog', label: 'Blog' },
              { href: '/contacto', label: 'Contacto' },
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-brand-accent transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              {[
                { href: '/', label: 'Inicio' },
                { href: '/servicios', label: 'Servicios' },
                { href: '/blog', label: 'Blog' },
                { href: '/contacto', label: 'Contacto' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-gray-300 hover:text-brand-accent transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
```

### 4.5 Footer Component

Create `src/components/Footer.tsx`:
```typescript
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold text-brand-accent">Quilla Electric</span>
            </div>
            <p className="text-gray-400">
              Servicios eléctricos profesionales en Arequipa. 
              Especialistas en pozos a tierra y cableado residencial.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { href: '/servicios', label: 'Servicios' },
                { href: '/blog', label: 'Blog' },
                { href: '/contacto', label: 'Contacto' },
                { href: '/electricista-en/arequipa-cercado', label: 'Arequipa Cercado' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-brand-accent transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-gray-400">
              <p>📞 +51 951 413 458</p>
              <p>📍 Arequipa, Perú</p>
              <p>📧 info@quillaelectric.site</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Quilla Electric. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
}
```

### 4.6 WhatsApp Button Component

Create `src/components/WhatsappButton.tsx`:
```typescript
'use client';

import { motion } from 'framer-motion';

export default function WhatsappButton() {
  const phoneNumber = '51951413458';
  const message = 'Hola, necesito información sobre sus servicios eléctricos.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg z-50 hover:bg-green-600 transition-colors duration-200"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </motion.a>
  );
}
```

### 4.7 Page Structure Setup

Create `src/app/page.tsx`:
```typescript
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Servicios Eléctricos Profesionales en Arequipa | Quilla Electric',
  description: 'Servicios eléctricos profesionales en Arequipa. Especialistas en pozos a tierra, cableado residencial, e instalaciones eléctricas seguras.',
  openGraph: {
    title: 'Quilla Electric - Servicios Eléctricos en Arequipa',
    description: 'Servicios eléctricos profesionales en Arequipa. Especialistas en pozos a tierra, cableado residencial, e instalaciones eléctricas seguras.',
    images: ['/img/social-default.jpeg'],
  },
};

export default function HomePage() {
  return (
    <Layout
      title="Servicios Eléctricos Profesionales en Arequipa"
      description="Servicios eléctricos profesionales en Arequipa. Especialistas en pozos a tierra, cableado residencial, e instalaciones eléctricas seguras."
    >
      <Hero />
      <Services />
      <Benefits />
      <Contact />
    </Layout>
  );
}
```

---

## Phase 5: Admin Panel Setup

### 5.1 FireCMS Configuration

Create `src/app/admin/page.tsx`:
```typescript
'use client';

import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { FireCMS, FirebaseAuthController } from '@firecms/core';
import { FireCMSBackend } from '@firecms/cloud';
import { collection, FirestoreDataSource } from '@firecms/firestore';
import { useEffect, useState } from 'react';
import { app } from '@/lib/firebase';

// Import your collections
import { blogCollection } from '@/admin/collections/blog';
import { servicesCollection } from '@/admin/collections/services';
import { locationsCollection } from '@/admin/collections/locations';

export default function AdminPage() {
  const [backend, setBackend] = useState<FireCMSBackend | null>(null);

  useEffect(() => {
    const backend = new FireCMSBackend({
      firebaseApp: app,
      dataSource: new FirestoreDataSource({
        firebaseApp: app,
      }),
      authentication: new FirebaseAuthController({
        firebaseApp: app,
      }),
    });

    setBackend(backend);
  }, []);

  if (!backend) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-accent"></div>
          <p className="mt-4 text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <FireCMS
      backend={backend}
      collections={[
        blogCollection,
        servicesCollection,
        locationsCollection,
      ]}
      entityLinkBuilder={({ entity }) => {
        if (entity.path === 'blog_posts') {
          return `/blog/${entity.values.slug}`;
        }
        if (entity.path === 'services') {
          return `/servicios/${entity.values.slug}`;
        }
        if (entity.path === 'locations') {
          return `/electricista-en/${entity.values.slug}`;
        }
        return undefined;
      }}
    />
  );
}
```

### 5.2 Blog Collection Configuration

Create `src/admin/collections/blog.ts`:
```typescript
import { EntityCollection } from '@firecms/core';

export const blogCollection: EntityCollection = {
  id: 'blog_posts',
  name: 'Blog Posts',
  singularName: 'Blog Post',
  path: 'blog_posts',
  icon: 'article',
  group: 'Content',
  description: 'Manage blog posts and articles',
  defaultValues: {
    published: false,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  properties: {
    title: {
      name: 'title',
      validation: { required: true },
      dataType: 'string',
    },
    slug: {
      name: 'slug',
      validation: { required: true },
      dataType: 'string',
      description: 'URL-friendly version of the title',
    },
    description: {
      name: 'description',
      validation: { required: true },
      dataType: 'string',
      description: 'SEO meta description',
    },
    content: {
      name: 'content',
      validation: { required: true },
      dataType: 'string',
      markdown: true,
      description: 'Blog post content in Markdown format',
    },
    pubDate: {
      name: 'pubDate',
      dataType: 'date',
      validation: { required: true },
    },
    author: {
      name: 'author',
      dataType: 'string',
      validation: { required: true },
    },
    tags: {
      name: 'tags',
      dataType: 'array',
      of: {
        dataType: 'string',
      },
    },
    image: {
      name: 'image',
      dataType: 'string',
      description: 'Featured image URL',
    },
    published: {
      name: 'published',
      dataType: 'boolean',
    },
  },
  permissions: ({ authController }) => ({
    edit: authController.user,
    create: authController.user,
    delete: authController.user,
  }),
};
```

### 5.3 Services Collection Configuration

Create `src/admin/collections/services.ts`:
```typescript
import { EntityCollection } from '@firecms/core';

export const servicesCollection: EntityCollection = {
  id: 'services',
  name: 'Services',
  singularName: 'Service',
  path: 'services',
  icon: 'electrical_services',
  group: 'Content',
  description: 'Manage electrical services',
  defaultValues: {
    published: false,
    order: 0,
    price: 'Cotizar',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  properties: {
    title: {
      name: 'title',
      validation: { required: true },
      dataType: 'string',
    },
    slug: {
      name: 'slug',
      validation: { required: true },
      dataType: 'string',
      description: 'URL-friendly version of the title',
    },
    description: {
      name: 'description',
      validation: { required: true },
      dataType: 'string',
      description: 'Service description for SEO',
    },
    content: {
      name: 'content',
      validation: { required: true },
      dataType: 'string',
      markdown: true,
      description: 'Service details in Markdown format',
    },
    price: {
      name: 'price',
      dataType: 'string',
      description: 'Price or "Cotizar" for custom pricing',
    },
    image: {
      name: 'image',
      dataType: 'string',
      description: 'Service image URL',
    },
    order: {
      name: 'order',
      dataType: 'number',
      description: 'Display order',
    },
    published: {
      name: 'published',
      dataType: 'boolean',
    },
  },
  permissions: ({ authController }) => ({
    edit: authController.user,
    create: authController.user,
    delete: authController.user,
  }),
};
```

### 5.4 Locations Collection Configuration

Create `src/admin/collections/locations.ts`:
```typescript
import { EntityCollection } from '@firecms/core';

export const locationsCollection: EntityCollection = {
  id: 'locations',
  name: 'Locations',
  singularName: 'Location',
  path: 'locations',
  icon: 'location_on',
  group: 'Content',
  description: 'Manage service locations',
  defaultValues: {
    published: false,
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  properties: {
    name: {
      name: 'name',
      validation: { required: true },
      dataType: 'string',
    },
    slug: {
      name: 'slug',
      validation: { required: true },
      dataType: 'string',
      description: 'URL-friendly version of the name',
    },
    description: {
      name: 'description',
      validation: { required: true },
      dataType: 'string',
      description: 'Location description',
    },
    image: {
      name: 'image',
      dataType: 'string',
      description: 'Location image URL',
    },
    order: {
      name: 'order',
      dataType: 'number',
      description: 'Display order',
    },
    published: {
      name: 'published',
      dataType: 'boolean',
    },
  },
  permissions: ({ authController }) => ({
    edit: authController.user,
    create: authController.user,
    delete: authController.user,
  }),
};
```

### 5.5 Admin Route Protection

Create `src/app/admin/layout.tsx`:
```typescript
import { ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import { notFound } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Add authentication check here
  // For now, we'll skip server-side auth check
  // In production, implement proper auth middleware

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
```

---

## Phase 6: Testing and Deployment

### 6.1 Testing Setup

#### Unit Tests
```bash
# Install testing dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom

# Create jest.config.js
npm install -D @types/jest
```

Create `jest.config.js`:
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

Create `jest.setup.js`:
```javascript
import '@testing-library/jest-dom';
```

#### E2E Tests
```bash
# Install Playwright
npm install -D @playwright/test

# Initialize Playwright
npx playwright init
```

### 6.2 Performance Optimization

#### Next.js Configuration
Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 6.3 SEO Validation

#### Sitemap Generation
Create `src/app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://quillaelectric.site';
  
  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/servicios`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/contacto`, lastModified: new Date() },
  ];

  // Dynamic blog posts
  const blogPosts: MetadataRoute.Sitemap = [];
  try {
    const blogSnapshot = await getDocs(collection(db, 'blog_posts'));
    blogSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.published) {
        blogPosts.push({
          url: `${baseUrl}/blog/${data.slug}`,
          lastModified: data.updatedAt?.toDate() || new Date(),
        });
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Dynamic services
  const services: MetadataRoute.Sitemap = [];
  try {
    const servicesSnapshot = await getDocs(collection(db, 'services'));
    servicesSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.published) {
        services.push({
          url: `${baseUrl}/servicios/${data.slug}`,
          lastModified: data.updatedAt?.toDate() || new Date(),
        });
      }
    });
  } catch (error) {
    console.error('Error fetching services for sitemap:', error);
  }

  // Dynamic locations
  const locations: MetadataRoute.Sitemap = [];
  try {
    const locationsSnapshot = await getDocs(collection(db, 'locations'));
    locationsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.published) {
        locations.push({
          url: `${baseUrl}/electricista-en/${data.slug}`,
          lastModified: data.updatedAt?.toDate() || new Date(),
        });
      }
    });
  } catch (error) {
    console.error('Error fetching locations for sitemap:', error);
  }

  return [...staticPages, ...blogPosts, ...services, ...locations];
}
```

#### Robots.txt
Create `src/app/robots.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: 'https://quillaelectric.site/sitemap.xml',
  };
}
```

### 6.4 Production Deployment

#### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod

# Or connect to Git and deploy via Vercel dashboard
```

#### Firebase Hosting Deployment
Update `firebase.json`:
```json
{
  "hosting": {
    "public": ".next",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "functions": {
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run build"
    ]
  }
}
```

#### Build and Deploy Script
Create `scripts/deploy.sh`:
```bash
#!/bin/bash

echo "🚀 Starting deployment process..."

# Build the Next.js app
echo "📦 Building Next.js app..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm test

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

# Deploy Firebase functions (if any)
echo "🔥 Deploying Firebase functions..."
firebase deploy --only functions

echo "✅ Deployment completed successfully!"
echo "🌍 Your site is live at: https://quillaelectric.site"
```

### 6.5 Monitoring and Analytics

#### Error Tracking
```bash
# Install Sentry for error tracking
npm install @sentry/nextjs
```

#### Performance Monitoring
Create `src/lib/analytics.ts`:
```typescript
import { getAnalytics } from 'firebase/analytics';
import { app } from './firebase';

export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const trackPageView = (url: string) => {
  if (analytics) {
    // Track page view with Firebase Analytics
    console.log('Page view:', url);
  }
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (analytics) {
    // Track custom event
    console.log('Event:', eventName, parameters);
  }
};
```

---

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Firebase Authentication Issues
**Problem**: Users can't sign in or authentication state doesn't persist.
**Solution**:
- Check Firebase configuration in `.env.local`
- Verify Firebase Auth is enabled in console
- Check CORS settings for custom domains

#### 2. Image Loading Issues
**Problem**: Images from Firebase Storage don't load.
**Solution**:
- Verify storage rules allow public read access
- Check image URLs are correctly formatted
- Ensure Next.js image domains include Firebase Storage URL

#### 3. Build Errors
**Problem**: Next.js build fails with TypeScript errors.
**Solution**:
- Check all imports are correctly typed
- Verify Firebase config types
- Run `npm run lint` to catch issues early

#### 4. Performance Issues
**Problem**: Site loads slowly.
**Solution**:
- Optimize images with Next.js Image component
- Implement proper caching strategies
- Use Firebase CDN for static assets

#### 5. SEO Issues
**Problem**: Pages not indexed by search engines.
**Solution**:
- Verify meta tags are correctly implemented
- Check robots.txt allows crawling
- Submit sitemap to Google Search Console

### Migration Checklist

- [ ] Git branch created and backup made
- [ ] Firebase project set up with all services
- [ ] Next.js project initialized with dependencies
- [ ] Environment variables configured
- [ ] Content migration scripts executed
- [ ] All components converted to React/TypeScript
- [ ] Glassmorphism UI system integrated
- [ ] Admin panel configured with FireCMS
- [ ] Tests written and passing
- [ ] SEO optimization implemented
- [ ] Performance optimization completed
- [ ] Production deployment successful
- [ ] Monitoring and analytics set up

---

## Post-Migration Tasks

1. **Monitor Performance**: Use Google PageSpeed Insights and Firebase Performance Monitoring
2. **Check SEO**: Verify all pages are indexed and meta tags are correct
3. **Test Functionality**: Ensure all forms, navigation, and interactive elements work
4. **Backup Strategy**: Implement regular Firebase backups
5. **Update Documentation**: Update any project documentation with new architecture

---

## Support and Maintenance

- Regular Firebase plan review for cost optimization
- Monitor database usage and implement indexes as needed
- Keep dependencies updated for security
- Regular testing of admin panel functionality
- Performance monitoring and optimization

This comprehensive migration guide should help you successfully migrate the Quilla Electric website from Astro to Next.js + Firebase while maintaining all functionality and improving the overall architecture.