# Hosting Guide for davidepedone.com

This document provides instructions for hosting your portfolio website on different affordable platforms.

## Quick Setup with Git and Vercel (Recommended)

For the easiest deployment process, use the provided setup script:

```bash
./setup-git-vercel.sh
```

This script will:
1. Initialize a Git repository (if not already initialized)
2. Help you connect to GitHub
3. Install and configure Vercel CLI
4. Deploy your site to Vercel
5. Set up your custom domain (davidepedone.com)

The entire process takes about 5-10 minutes and provides the best performance with minimal cost.

## Manual Setup Options

If you prefer to set things up manually, here are your options:

### Option 1: Vercel

#### Benefits
- Free tier available
- Fast CDN
- Automatic HTTPS
- Continuous deployment from git
- Great for front-end projects

#### Manual Steps
1. Create an account at [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Navigate to your project directory in the terminal
4. Run `vercel` and follow the prompts
5. Set up your custom domain in the Vercel dashboard:
   - Go to your project settings
   - Click "Domains"
   - Add your domain (davidepedone.com)
   - Follow the DNS configuration instructions

#### Estimated Cost
- Free tier is sufficient for portfolio sites
- Custom domain cost: Your existing domain cost only

### Option 2: Netlify

#### Benefits
- Free tier available
- Extremely fast CDN
- Automatic HTTPS
- Continuous deployment from git
- Simple setup

#### Steps
1. Create an account at [Netlify](https://netlify.com)
2. Choose "Deploy manually" option
3. Drag and drop your entire website folder to the upload area
4. Once deployed, go to "Domain settings" and add your custom domain (davidepedone.com)
5. Follow the instructions to set up your DNS records with your domain registrar

#### Estimated Cost
- Free tier is sufficient for portfolio sites
- Custom domain cost: Your existing domain cost only

### Option 3: GitHub Pages

#### Benefits
- Completely free
- Simple setup
- Perfect for static sites

#### Steps
1. Create a GitHub repository
2. Push your website files to the repository
3. Go to repository settings > Pages
4. Set source to your main branch
5. Configure your custom domain in the settings

#### Estimated Cost
- Free
- Custom domain cost: Your existing domain cost only

## DNS Configuration

Regardless of the hosting provider you choose, you'll need to configure your domain (davidepedone.com) to point to your hosting provider. This typically involves:

1. Setting up an A record or CNAME record with your domain registrar
2. Following the specific instructions provided by your chosen hosting platform
3. Waiting for DNS propagation (can take up to 48 hours)

## Font Usage Note

Remember that you need to purchase and upload the PP Neue Montreal font or use a font service that provides it. Alternatively, you can substitute it with a free alternative font in the CSS file. 