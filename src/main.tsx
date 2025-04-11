import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Protect against code exposure in production
if (import.meta.env.PROD || import.meta.env.VITE_ENV === 'production') {
  // Block console output
  const noop = () => {};
  
  // Store original console methods for error reporting only
  const originalError = console.error;
  
  // Remove source maps if found (additional protection)
  const sourceMaps = document.querySelectorAll('link[rel="prefetch"][as="script"]');
  sourceMaps.forEach(el => el.remove());
  
  // Replace console methods
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
  console.trace = noop;
  console.dir = noop;
  console.dirxml = noop;
  console.group = noop;
  console.groupCollapsed = noop;
  console.groupEnd = noop;
  console.time = noop;
  console.timeLog = noop;
  console.timeEnd = noop;
  console.count = noop;
  console.countReset = noop;
  console.table = noop;
  console.clear = noop;
  console.assert = noop;
  
  // Keep error for critical issues but sanitize output
  console.error = (...args) => {
    // Filter out sensitive information before logging
    const sanitizedArgs = args.map(arg => {
      if (typeof arg === 'string') {
        // Remove potential API keys or sensitive data patterns
        return arg.replace(/key=[\w-]*/gi, 'key=[REDACTED]')
                 .replace(/api[kK]ey\s*[:=]\s*["']?\w+["']?/gi, 'apiKey: [REDACTED]')
                 .replace(/token\s*[:=]\s*["']?\w+["']?/gi, 'token: [REDACTED]')
                 .replace(/password\s*[:=]\s*["']?\w+["']?/gi, 'password: [REDACTED]')
                 .replace(/secret\s*[:=]\s*["']?\w+["']?/gi, 'secret: [REDACTED]');
      }
      return arg;
    });
    
    // Only log to console in production if it's a critical error
    originalError.apply(console, sanitizedArgs);
  };
  
  // Disable developer tools detection
  if (import.meta.env.VITE_DISABLE_DEVTOOLS === 'true') {
    // Use alternative approach to make debugging more difficult
    try {
      // Make it harder to debug by patching common debugging hooks
      Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
        get: function() { return { isDisabled: true }; },
        set: function() {}
      });
      
      // Detect DevTools opening via window size
      const devToolsDetector = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if (widthThreshold || heightThreshold) {
          // DevTools may be open
          document.body.innerHTML = `
            <div style="text-align: center; padding: 50px;">
              <h1>Access Restricted</h1>
              <p>Developer tools are not permitted on this site for security reasons.</p>
              <button onclick="location.reload()">Reload Page</button>
            </div>
          `;
        }
      };
      
      window.addEventListener('resize', devToolsDetector);
      setInterval(devToolsDetector, 1000);
    } catch (e) {
      // Silently fail if protection cannot be applied
    }
  }
}

createRoot(document.getElementById("root")!).render(<App />);
