# 🚀 Guía de Despliegue - Deploy de Aplicaciones React

## 🎯 Propósito

Esta guía cubre todos los aspectos del despliegue de aplicaciones React, desde la preparación del build hasta el deploy en diferentes plataformas, optimización y configuración de producción.

---

## 📋 Índice

- [🏗️ Preparación para Producción](#🏗️-preparación-para-producción)
- [📦 Build de Producción](#📦-build-de-producción)
- [🌐 Plataformas de Deploy](#🌐-plataformas-de-deploy)
- [🔧 Configuración Avanzada](#🔧-configuración-avanzada)
- [⚡ Optimización](#⚡-optimización)
- [🔒 Seguridad](#🔒-seguridad)
- [📊 Monitoreo](#📊-monitoreo)

---

## 🏗️ Preparación para Producción

### **Checklist Pre-Deploy**

```bash
# ✅ 1. Verificar que no hay errores ni warnings
npm run build

# ✅ 2. Revisar console.logs
# Buscar y remover console.log de producción
grep -r "console.log" src/

# ✅ 3. Verificar variables de entorno
# Crear archivo .env.production
REACT_APP_API_URL=https://api.miapp.com
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=1.0.0

# ✅ 4. Optimizar imágenes
# Comprimir imágenes en src/assets/images/

# ✅ 5. Revisar dependencias
npm audit
npm audit fix

# ✅ 6. Tests pasan
npm test -- --coverage --watchAll=false
```

### **Configuración de Entornos**

```javascript
// src/config/environment.js
const config = {
  development: {
    API_URL: 'http://localhost:3001/api',
    DEBUG: true,
    ANALYTICS_ID: null,
  },
  production: {
    API_URL: 'https://api.miapp.com',
    DEBUG: false,
    ANALYTICS_ID: 'GA-XXXXXXXXX',
  },
};

const environment = process.env.NODE_ENV || 'development';
export default config[environment];

// Uso en componentes
import config from '../config/environment';

const api = {
  baseURL: config.API_URL,
  timeout: 5000,
};

// Conditional logging
const log = (...args) => {
  if (config.DEBUG) {
    console.log(...args);
  }
};
```

### **Limpieza de Código**

```javascript
// ✅ Remover código de debug
// eslint-disable-next-line
const debugInfo = process.env.NODE_ENV === 'development' ?
  { user, cart, filters } : {};

// ✅ Lazy loading para optimización
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}

// ✅ Service Worker para PWA (opcional)
// public/sw.js
const CACHE_NAME = 'mi-app-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

---

## 📦 Build de Producción

### **Proceso de Build**

```bash
# 1. Build básico
npm run build

# 2. Analizar bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js

# 3. Build con variables específicas
REACT_APP_ENVIRONMENT=production npm run build

# 4. Verificar build localmente
npx serve -s build -l 3000
```

### **Configuración de package.json**

```json
{
  "scripts": {
    "build": "react-scripts build",
    "build:analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js",
    "build:production": "REACT_APP_ENVIRONMENT=production npm run build",
    "preview": "npx serve -s build -l 3000",
    "deploy:netlify": "npm run build && npx netlify deploy --prod --dir=build",
    "deploy:vercel": "npm run build && npx vercel --prod"
  },
  "homepage": "https://miapp.com"
}
```

### **Optimización del Build**

```javascript
// craco.config.js (para configuración avanzada)
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Optimizar bundle splitting
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };

      // Resolver aliases
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
      };

      return webpackConfig;
    },
  },
};

// Uso de aliases
import Button from '@components/UI/Button';
import { useCart } from '@hooks/useCart';
```

---

## 🌐 Plataformas de Deploy

### **Netlify (Recomendado para principiantes)**

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Deploy manual
npm run build
netlify deploy --dir=build --prod

# 4. Deploy automático con Git
# En netlify.toml
[build]
  publish = "build"
  command = "npm run build"

[build.environment]
  REACT_APP_API_URL = "https://api.miapp.com"

# 5. Redirects para SPA
# public/_redirects
/*    /index.html   200

# Headers de seguridad
# public/_headers
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### **Vercel**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Deploy producción
vercel --prod

# 4. Configuración en vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": { "cache-control": "s-maxage=31536000,immutable" },
      "dest": "/static/$1"
    },
    { "src": "/(.*)", "dest": "/index.html" }
  ],
  "env": {
    "REACT_APP_API_URL": "https://api.miapp.com"
  }
}
```

### **GitHub Pages**

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Configurar package.json
{
  "homepage": "https://usuario.github.io/nombre-repo",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

# 3. Deploy
npm run deploy

# 4. Para custom domain
# public/CNAME
miapp.com
```

### **Heroku**

```bash
# 1. Crear app en Heroku
heroku create mi-app-react

# 2. Configurar buildpack
heroku buildpacks:set https://github.com/mars/create-react-app-buildpack.git

# 3. Variables de entorno
heroku config:set REACT_APP_API_URL=https://api.miapp.com

# 4. Deploy
git push heroku main

# 5. Configurar para SPA
# static.json en root
{
  "root": "build/",
  "routes": {
    "/**": "index.html"
  },
  "headers": {
    "/**": {
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block"
    }
  }
}
```

### **Firebase Hosting**

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login y init
firebase login
firebase init hosting

# 3. Configurar firebase.json
{
  "hosting": {
    "public": "build",
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
    ],
    "headers": [
      {
        "source": "/static/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}

# 4. Deploy
npm run build
firebase deploy
```

---

## 🔧 Configuración Avanzada

### **Custom Domain y HTTPS**

```bash
# Netlify
# 1. Agregar dominio en dashboard
# 2. Configurar DNS records
# A record: @ -> 104.198.14.52
# CNAME: www -> mi-app.netlify.app

# Vercel
# 1. Agregar dominio en dashboard
# 2. Configurar DNS
# A record: @ -> 76.76.19.61
# CNAME: www -> cname.vercel-dns.com

# Verificar SSL
curl -I https://miapp.com
```

### **Environment Variables**

```javascript
// ✅ Configuración segura de env vars

// .env.local (nunca commitear)
REACT_APP_API_KEY=abc123
REACT_APP_STRIPE_KEY=pk_live_xxx

// .env.production
REACT_APP_API_URL=https://api.miapp.com
REACT_APP_ENVIRONMENT=production

// .env.development
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development

// src/config/index.js
const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  apiKey: process.env.REACT_APP_API_KEY,
  environment: process.env.REACT_APP_ENVIRONMENT,
};

// Validación de variables requeridas
const requiredEnvVars = ['REACT_APP_API_URL', 'REACT_APP_ENVIRONMENT'];
const missingVars = requiredEnvVars.filter(
  varName => !process.env[varName]
);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}`
  );
}

export default config;
```

### **CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test -- --coverage --watchAll=false

    - name: Build
      run: npm run build
      env:
        REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
        REACT_APP_ENVIRONMENT: production

    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './build'
        production-branch: main
        production-deploy: true
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## ⚡ Optimización

### **Performance Optimization**

```javascript
// ✅ Code splitting por rutas
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Cart = lazy(() => import('./pages/Cart'));

// ✅ Preload de recursos críticos
// public/index.html
<link rel="preload" href="/api/products" as="fetch" crossorigin="anonymous">
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

// ✅ Service Worker
// src/serviceWorkerRegistration.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// ✅ Image optimization
const OptimizedImage = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState(`${src}?w=10&blur=10`); // placeholder
  const [imageRef, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      const img = new Image();
      img.onload = () => setImageSrc(src);
      img.src = src;
    }
  }, [isIntersecting, src]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
};
```

### **Bundle Analysis**

```javascript
// Analizar imports pesados
// webpack-bundle-analyzer config

// ✅ Identificar dependencias pesadas
import { format } from 'date-fns'; // ❌ Importa toda la librería
import format from 'date-fns/format'; // ✅ Solo la función necesaria

// ✅ Tree shaking
import { debounce } from 'lodash'; // ❌
import debounce from 'lodash/debounce'; // ✅

// ✅ Dynamic imports
const loadChartLibrary = async () => {
  const { Chart } = await import('chart.js');
  return Chart;
};
```

---

## 🔒 Seguridad

### **Security Headers**

```javascript
// Netlify - _headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# Cache static assets
/static/*
  Cache-Control: public, max-age=31536000, immutable
```

### **Content Security Policy**

```html
<!-- public/index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.miapp.com;
">
```

### **Environment Security**

```javascript
// ✅ Nunca exponer secrets en cliente
// ❌ MAL
const API_SECRET = process.env.REACT_APP_API_SECRET; // Visible en cliente

// ✅ BIEN - Solo APIs públicas
const API_URL = process.env.REACT_APP_API_URL;
const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

// ✅ Validación en runtime
const validateConfig = () => {
  const requiredVars = [
    'REACT_APP_API_URL',
    'REACT_APP_ENVIRONMENT'
  ];

  const missing = requiredVars.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
};

validateConfig();
```

---

## 📊 Monitoreo

### **Error Tracking**

```javascript
// Error boundary con reporting
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // En producción, enviar a servicio de logging
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
  }

  reportError = async (error, errorInfo) => {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.toString(),
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };
}
```

### **Performance Monitoring**

```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric) => {
  // Enviar a Google Analytics, etc.
  console.log(metric);
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Custom performance tracking
const trackPageLoad = () => {
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime}ms`);

    // Reportar métricas
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/metrics', {
        method: 'POST',
        body: JSON.stringify({
          loadTime,
          timestamp: Date.now(),
          page: window.location.pathname,
        }),
      });
    }
  });
};
```

---

## 📋 Checklist Final de Deploy

### **Pre-Deploy**
- [ ] ✅ Tests pasan (`npm test`)
- [ ] ✅ Build exitoso (`npm run build`)
- [ ] ✅ No hay console.logs
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Imágenes optimizadas
- [ ] ✅ Bundle size aceptable
- [ ] ✅ Error boundaries implementados

### **Deploy**
- [ ] ✅ Domain configurado
- [ ] ✅ HTTPS funcionando
- [ ] ✅ Redirects para SPA
- [ ] ✅ Security headers
- [ ] ✅ CDN configurado
- [ ] ✅ Cache policies

### **Post-Deploy**
- [ ] ✅ Site load test
- [ ] ✅ Mobile responsiveness
- [ ] ✅ Cross-browser testing
- [ ] ✅ Error monitoring activo
- [ ] ✅ Analytics configurado
- [ ] ✅ Performance monitoring

---

<div align="center">

**📅 Actualizado:** Enero 2025
**🏫 Curso:** Inadaptados React 2025
**👨‍💻 Instructor:** Rodrigo Leaños Bermejo

</div>