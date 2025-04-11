# Rodelas Construction Services (RCS) Website

## Overview

This is the official website for Rodelas Construction Services, a construction company specializing in commercial and residential construction, renovation, and remodeling services.

## Features

- Responsive design for all device sizes
- Service showcase with detailed information
- Project portfolio with filtering capabilities
- Contact form with validation
- Interactive AI chatbot assistant
- Cost estimator for quick project quotes

## Security Features

This project implements several security best practices:

1. Content Security Policy (CSP) headers to prevent XSS attacks
2. Environment variables for storing sensitive API keys
3. Input sanitization to protect against injection attacks
4. Image path validation to prevent path traversal
5. Secure headers for protection against clickjacking and other attacks

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd rodelascons
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create environment file
   ```
   cp .env.example .env.local
   ```

4. Edit `.env.local` and add your API keys:
   ```
   VITE_GEMINI_API_KEY=your-gemini-api-key
   ```

### Development

Start the development server:
```
npm run dev
```

### Production Build

Build for production:
```
npm run build
```

Serve the production build:
```
npm run serve
```

## Security Configuration

Please refer to the [SECURITY.md](./SECURITY.md) file for detailed information about security features implemented in this project and best practices for developers.

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions and services

- `/public` - Static assets
  - `/images` - Images used throughout the site
    - `/projects` - Project images organized by category
    
- `/docs` - Documentation files

## License

All rights reserved. This code is proprietary and confidential.
