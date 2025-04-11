# Security Policy

## Security Features Implemented

This project includes the following security measures:

1. **Content Security Policy (CSP)**
   - Strict CSP headers to prevent XSS attacks
   - Resource loading restrictions
   - Frame restrictions

2. **Environment Variables for Sensitive Data**
   - API keys stored in environment variables
   - Proper .gitignore settings to prevent leaking secrets
   
3. **Input Sanitization**
   - All form inputs sanitized using DOMPurify
   - Protection against XSS attacks in user inputs
   
4. **Image Security**
   - Image path validation to prevent path traversal
   - Fallback images for error cases
   - Lazy loading of images for performance
   
5. **Secure Headers**
   - X-Content-Type-Options
   - X-Frame-Options
   - Referrer-Policy
   - Permissions-Policy

## Security Best Practices for Developers

1. **Environment Variables**
   - Never commit API keys or secrets to the repository
   - Use .env.local for local development (which is gitignored)
   - Follow the example in .env.example for required variables

2. **API Usage**
   - Use appropriate rate limiting for external APIs
   - Validate all API responses before processing
   - Handle API errors gracefully

3. **Form Handling**
   - Always sanitize user input before processing or storing
   - Validate form data on both client and server sides
   - Use CSRF protection for server-side form submissions

4. **Image and Asset Management**
   - Only load images from trusted sources
   - Validate all dynamic image paths
   - Use error handling for failed image loads

## Reporting Security Issues

If you discover a security vulnerability, please send an email to [security@example.com](mailto:security@example.com) rather than opening a public issue.

## Security Update Process

The security of this project is regularly evaluated and improved. Updates and patches are applied promptly when security issues are identified. 