# Security Overview
This outlines the security decisions, configurations, and practices for the Impound Api
---

## 1. Environment Separation

### Development Environment
I use a development enviroment when buidling the api to bypass my security restrictions for ease of use.

### Production Environment
The actual production enviroment has ORIGIN parameters and restrictions. 
---

## 2. CORS Configuration

### Allowed Origins
Resticting to allowed origins puts up a barrier of saftey from attacks that would otherwise come from malictious enviroments

### HTTPS Enforcement
Only `https://` origins are accepted.
HTTPS garentees that the header is authentic and has not been tampered with, intercepted, or spoofed by a "man-in-the-middle" attacker.

### Allowed Methods & Headers
"GET", "POST", "PUT", "DELETE" are the only allowed methods.
Since our Api has no use for other methods, restricting to those methods only limits vulrabilites.

### Cors Sources
https://portswigger.net/web-security/cors
https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS

---

## 3. Helmet Security Configuration

### Disabled Policies (and why)
- `referrerPolicy`
    - prevents attackers from knowing our app is an express app, which prevents them from using express specific attacks
- `crossOriginOpenerPolicy`
    - disabling avoids breaking legitimate API clients

### HSTS Configuration
- `maxAge`
    - This protects users on insecure networks (public WiFi, hotels, airports) because it refuses to connect for the entire duration
- `includeSubDomains`
    - It ensures full domain HTTPS enforcement, not just the root domain because it applies hsts to the subdomains
- `preload`
    - Browsers will only connect via HTTPS even on the very first visit, eliminates the “first request vulnerability” where HSTS isnt active yet.

# Helmet Sources

https://helmetjs.github.io/
https://github.com/helmetjs/helmet?tab=readme-ov-file

https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Referer_header:_privacy_and_security_concerns
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy

## 11. Secrets Management

### Env 
I use an env file to hide secrets and keys. though currently its just a dummy env





