# Requirements Document

## Introduction

This document specifies requirements for converting the FreshMart HTML template into a React Router v7 framework mode application with Tailwind CSS v4. The conversion must preserve pixel-perfect UI fidelity while replacing Bootstrap 5 classes with Tailwind CSS equivalents, implementing modern React patterns, server-side rendering, and file-based routing. The existing HTML template serves as the authoritative visual design reference, and all React components must match the original appearance exactly while using Tailwind CSS as the primary styling framework.

## Glossary

- **HTML_Template**: The existing static HTML files (index.html and related files) that use Bootstrap 5.3 and define FreshMart's visual design and structure
- **React_Router_V7**: React Router version 7 in framework mode (formerly Remix), providing file-based routing and server-side rendering
- **Tailwind_CSS_V4**: Tailwind CSS framework version 4.x used as the primary styling system for all converted components
- **Bootstrap_5**: Bootstrap CSS framework version 5.3 used in the HTML template source files (to be replaced with Tailwind equivalents)
- **Conversion_System**: The React Router v7 application being created from the HTML template with Tailwind CSS styling
- **Route_File**: A TypeScript file in app/routes/ that defines a URL endpoint, loader, action, and component
- **Loader**: A server-side function in React Router v7 that fetches data before rendering
- **Visual_Fidelity**: Requirement that React components match the exact visual appearance of HTML template despite using different CSS framework
- **Swiper**: Swiper.js version 9 carousel library used in the HTML template
- **SVG_Sprite**: Collection of inline SVG symbol definitions used for icons throughout the application
- **Layout_Component**: React components that wrap page content (Header, Footer, etc.)
- **Brand_Colors**: Custom color values from template: Primary (#6BB252 green), Secondary (#364127 dark green), Danger (#F95F09 orange), Success (#a3be4c light green)

## Requirements

### Requirement 1: Project Structure Initialization

**User Story:** As a developer, I want the React Router v7 project structure set up correctly with Tailwind CSS v4, so that I can begin component conversion with proper tooling and configuration.

#### Acceptance Criteria

1. THE Conversion_System SHALL use the existing frontend/ directory structure with app/routes/, app/components/, app/lib/, app/store/, and public/ subdirectories
2. THE Conversion_System SHALL install react-router version 7, @tailwindcss/vite version 4.x, tailwindcss version 4.x, and swiper version 9.x as dependencies
3. THE Conversion_System SHALL configure Tailwind CSS v4 in vite.config.ts using @tailwindcss/vite plugin
4. THE Conversion_System SHALL create tailwind.config.ts with custom Brand_Colors theme configuration
5. THE Conversion_System SHALL configure TypeScript with strict mode enabled in tsconfig.json
6. THE Conversion_System SHALL copy all images from root images/ directory to frontend/public/images/
7. THE Conversion_System SHALL copy the original HTML files to frontend/public/template/ as read-only reference files
8. THE Conversion_System SHALL extract custom CSS from root css/vendor.css and convert to Tailwind equivalents or CSS modules
9. THE Conversion_System SHALL NOT install Bootstrap CSS or Bootstrap JavaScript packages
10. WHERE Vite configuration exists, THE Conversion_System SHALL preserve existing React and TypeScript plugins

### Requirement 2: Root Application Shell

**User Story:** As a developer, I want the root.tsx file to establish the application shell, so that global styles, fonts, and page structure are loaded for every route.

#### Acceptance Criteria

1. THE Conversion_System SHALL create app/root.tsx that exports a Layout component and default App component
2. THE Layout component SHALL import Tailwind CSS using @import "tailwindcss" directive in app/index.css
3. THE Layout component SHALL import Google Fonts link for Inter font family in the head element
4. THE Layout component SHALL render the SVG_Sprite component as a hidden element in the body
5. THE Layout component SHALL render the preloader wrapper div with Tailwind utility classes
6. THE Layout component SHALL include Meta, Links, Scripts, and ScrollRestoration components from react-router
7. THE App component SHALL render the Outlet component to display child routes
8. THE Conversion_System SHALL NOT import Bootstrap CSS or Bootstrap JavaScript
9. THE Conversion_System SHALL configure CSS reset or normalize using Tailwind's base layer
10. WHERE custom fonts are referenced, THE Conversion_System SHALL use Tailwind's fontFamily configuration

### Requirement 3: File-Based Routing Structure

**User Story:** As a developer, I want all HTML pages converted to Route_Files, so that the application matches the original template's navigation structure.

#### Acceptance Criteria

1. THE Conversion_System SHALL create app/routes/_index.tsx that maps to the root URL path /
2. THE Conversion_System SHALL create app/routes/products._index.tsx that maps to URL path /products
3. THE Conversion_System SHALL create app/routes/products.$slug.tsx that maps to dynamic URL path /products/:slug
4. THE Conversion_System SHALL create app/routes/category.$slug.tsx that maps to dynamic URL path /category/:slug
5. THE Conversion_System SHALL create app/routes/cart.tsx that maps to URL path /cart
6. THE Conversion_System SHALL create app/routes/checkout.tsx that maps to URL path /checkout
7. THE Conversion_System SHALL create app/routes/auth.login.tsx that maps to URL path /auth/login
8. THE Conversion_System SHALL create app/routes/auth.register.tsx that maps to URL path /auth/register
9. THE Conversion_System SHALL create app/routes/orders._index.tsx that maps to URL path /orders
10. THE Conversion_System SHALL create app/routes/orders.$id.tsx that maps to dynamic URL path /orders/:id
11. THE Conversion_System SHALL create app/routes/account.tsx that maps to URL path /account
12. THE Conversion_System SHALL create app/routes/blog._index.tsx that maps to URL path /blog
13. THE Conversion_System SHALL create app/routes/blog.$slug.tsx that maps to dynamic URL path /blog/:slug
14. THE Conversion_System SHALL create app/routes/about.tsx that maps to URL path /about
15. THE Conversion_System SHALL create app/routes/contact.tsx that maps to URL path /contact
16. THE Conversion_System SHALL create app/routes/thank-you.tsx that maps to URL path /thank-you
17. THE Conversion_System SHALL create app/routes/$.tsx as a catch-all route for 404 pages
18. THE Conversion_System SHALL create admin route files in app/routes/admin/ subdirectory
19. WHEN a Route_File includes data fetching, THE Conversion_System SHALL export a loader function that runs server-side
20. WHEN a Route_File includes form handling, THE Conversion_System SHALL export an action function that runs server-side

### Requirement 4: Tailwind CSS Conversion Strategy

**User Story:** As a developer, I want all Bootstrap 5.3 classes from the HTML template converted to Tailwind CSS v4 equivalents, so that visual appearance matches exactly while using modern utility-first CSS.

#### Acceptance Criteria

1. THE Conversion_System SHALL replace all Bootstrap grid classes (container, row, col-*) with Tailwind grid or flex equivalents
2. THE Conversion_System SHALL replace all Bootstrap spacing classes (m-*, p-*, mx-*, my-*) with Tailwind spacing utilities (m-*, p-*, mx-*, my-*)
3. THE Conversion_System SHALL replace all Bootstrap display classes (d-flex, d-none, d-block) with Tailwind display utilities (flex, hidden, block)
4. THE Conversion_System SHALL replace all Bootstrap typography classes (text-*, fw-*, fs-*) with Tailwind text and font utilities
5. THE Conversion_System SHALL replace all Bootstrap color classes (bg-*, text-*) with Tailwind color utilities using Brand_Colors configuration
6. THE Conversion_System SHALL replace all Bootstrap component classes (btn, card, badge) with custom Tailwind component patterns
7. THE Conversion_System SHALL replace all Bootstrap responsive breakpoints (sm:, md:, lg:, xl:, xxl:) with Tailwind responsive prefixes
8. THE Conversion_System SHALL maintain exact spacing values by mapping Bootstrap spacing scale to Tailwind spacing scale
9. THE Conversion_System SHALL create Tailwind @apply directives for frequently repeated utility combinations
10. THE Conversion_System SHALL configure Tailwind theme to match Bootstrap custom CSS variables (--bs-primary: #6BB252, --bs-secondary: #364127, --bs-danger: #F95F09)
11. WHERE Bootstrap uses specific pixel values, THE Conversion_System SHALL use Tailwind arbitrary values [32px] syntax
12. WHERE Bootstrap offcanvas is used, THE Conversion_System SHALL implement equivalent drawer component using Tailwind and Headless UI or custom implementation

### Requirement 5: SVG Icon Sprite System

**User Story:** As a developer, I want all SVG icons converted to a React component, so that icons render consistently throughout the application.

#### Acceptance Criteria

1. THE Conversion_System SHALL create app/components/icons/SvgSprite.tsx component
2. THE SvgSprite component SHALL contain all symbol definitions from the HTML_Template SVG sprite
3. THE SvgSprite component SHALL render an svg element with display: none style
4. THE SvgSprite component SHALL include all icon IDs: facebook, twitter, youtube, instagram, amazon, menu, link, arrow-right, category, calendar, heart, plus, minus, cart, check, trash, search, close, package, secure, quality, savings, offers, delivery, organic, fresh, star-full, star-half, user, wishlist, shopping-bag, and all category icons
5. WHEN an icon is referenced in a component, THE Conversion_System SHALL use svg element with use element child
6. THE use element SHALL reference icon ID using href attribute not xlink:href
7. THE Conversion_System SHALL NOT use xlink:href as it is deprecated in React
8. WHERE an icon needs custom sizing, THE Conversion_System SHALL apply width and height attributes to the parent svg element

### Requirement 6: Header Component Conversion

**User Story:** As a developer, I want the HTML header converted to a React component with Tailwind CSS, so that navigation, search, and cart are accessible on all pages.

#### Acceptance Criteria

1. THE Conversion_System SHALL create app/components/layout/Header.tsx component
2. THE Header component SHALL preserve the exact HTML structure from HTML_Template header element
3. THE Header component SHALL convert all Bootstrap classes to Tailwind CSS equivalents while maintaining Visual_Fidelity
4. THE Header component SHALL replace all anchor tags with Link components from react-router
5. THE Header component SHALL include the top info bar with phone number and customer support link
6. THE Header component SHALL include the main navbar with logo, search bar, and action icons
7. THE Header component SHALL include the bottom navigation bar with category dropdown and page links
8. THE Header component SHALL implement offcanvas drawers for cart and navigation using Tailwind and state management
9. THE Header component SHALL include mobile-responsive classes using Tailwind responsive prefixes (sm:, md:, lg:)
10. WHEN a user clicks a navigation link, THE Header component SHALL trigger client-side navigation using Link component
11. WHEN search functionality is implemented, THE Header component SHALL submit to a search route action
12. WHERE Bootstrap navbar-toggler is used, THE Conversion_System SHALL implement hamburger menu using Tailwind and React state

### Requirement 7: Footer Component Conversion

**User Story:** As a developer, I want the HTML footer converted to a React component with Tailwind CSS, so that links, contact info, and social media are displayed consistently.

#### Acceptance Criteria

1. THE Conversion_System SHALL create app/components/layout/Footer.tsx component
2. THE Footer component SHALL preserve the exact HTML structure from HTML_Template footer element
3. THE Footer component SHALL convert all Bootstrap grid and spacing classes to Tailwind equivalents
4. THE Footer component SHALL replace all anchor tags with Link components for internal navigation
5. THE Footer component SHALL preserve external anchor tags for social media links
6. THE Footer component SHALL include all footer sections: logo and description, Quick Links, Help Center, and Contact Info
7. THE Footer component SHALL include the newsletter subscription form with email input using Tailwind form styles
8. THE Footer component SHALL include payment method icons in the bottom bar
9. THE Footer component SHALL include social media icon links with SVG icons
10. THE Footer component SHALL use Tailwind grid system for responsive layout matching Bootstrap breakpoints
11. WHEN the newsletter form is submitted, THE Footer component SHALL use Form component from react-router

### Requirement 8: Home Page Component Conversion

**User Story:** As a developer, I want the home page index.html converted to _index.tsx, so that the landing page displays correctly with all sections.

#### Acceptance Criteria

1. THE Conversion_System SHALL create app/routes/_index.tsx for the home page
2. THE home page SHALL render the HeroBanner component with background image, headline, CTA buttons, and stats
3. THE home page SHALL render the FeatureCards component with three cards for Fresh, Organic, and Free Delivery
4. THE home page SHALL render the CategoryCarousel component with Swiper integration
5. THE home page SHALL render the ProductGrid component displaying best selling products
6. THE home page SHALL render the BannerAds component with three promotional blocks
7. THE home page SHALL render the ProductCarousel component for featured products with Swiper integration
8. THE home page SHALL preserve the exact section order from index.html
9. THE home page loader function SHALL fetch categories data from the API endpoint /api/categories
10. THE home page loader function SHALL fetch products data from the API endpoints /api/products?featured=true and /api/products?bestseller=true
11. THE home page component SHALL receive loaderData as a typed prop using Route.ComponentProps
12. THE home page SHALL export a meta function that returns page title and description

### Requirement 9: Swiper Carousel Integration

**User Story:** As a developer, I want Swiper carousels converted to React Swiper components, so that product and category sliders work correctly.

#### Acceptance Criteria

1. THE Conversion_System SHALL import Swiper and SwiperSlide from swiper/react package
2. THE Conversion_System SHALL import Navigation module from swiper/modules package
3. THE Conversion_System SHALL import swiper/css and swiper/css/navigation stylesheets
4. THE CategoryCarousel component SHALL configure Swiper with slidesPerView: 8 at 1500px breakpoint
5. THE CategoryCarousel component SHALL configure breakpoints for 0: 2 slides, 768: 3 slides, 991: 5 slides, 1500: 8 slides
6. THE CategoryCarousel component SHALL configure spaceBetween: 30 pixels
7. THE ProductCarousel component SHALL configure Swiper with slidesPerView: 5 at 1500px breakpoint
8. THE ProductCarousel component SHALL configure breakpoints for 0: 1 slide, 768: 3 slides, 991: 4 slides, 1500: 5 slides
9. THE Swiper components SHALL configure custom navigation with nextEl and prevEl selectors matching HTML_Template
10. THE Swiper components SHALL pass modules prop including Navigation module
11. THE Conversion_System SHALL NOT use vanilla Swiper initialization as it breaks SSR
12. WHEN Swiper renders on the server, THE Conversion_System SHALL ensure no hydration mismatches occur

### Requirement 10: Product Card Component

**User Story:** As a developer, I want product cards converted to a reusable React component with Tailwind CSS, so that products display consistently across all pages.

#### Acceptance Criteria

1. THE Conversion_System SHALL create app/components/product/ProductCard.tsx component
2. THE ProductCard component SHALL accept product data as props including id, name, slug, price, comparePrice, images, ratingAvg, isOrganic, isVegan, isGlutenFree
3. THE ProductCard component SHALL convert all Bootstrap card classes to Tailwind equivalents while maintaining Visual_Fidelity
4. THE ProductCard component SHALL display product image with Link to product detail page
5. THE ProductCard component SHALL display product name with Link to product detail page
6. THE ProductCard component SHALL display current price and comparePrice with proper formatting using Tailwind typography utilities
7. THE ProductCard component SHALL display rating using star icons from SVG_Sprite
8. THE ProductCard component SHALL display badge elements for organic, vegan, and gluten-free attributes using Tailwind badge pattern
9. THE ProductCard component SHALL include quantity selector with plus and minus buttons styled with Tailwind
10. THE ProductCard component SHALL include Add to Cart button styled with Tailwind button pattern using Brand_Colors
11. THE ProductCard component SHALL include wishlist heart icon button
12. WHEN the Add to Cart button is clicked, THE ProductCard component SHALL submit to cart action using useFetcher from react-router
13. WHEN the wishlist button is clicked, THE ProductCard component SHALL submit to wishlist action using useFetcher from react-router
14. WHERE Bootstrap hover effects exist, THE Conversion_System SHALL implement using Tailwind hover: prefix and transition utilities

### Requirement 11: Navigation Link Conversion

**User Story:** As a developer, I want all internal links converted from anchor tags to React Router Link components, so that navigation is client-side and performant.

#### Acceptance Criteria

1. THE Conversion_System SHALL replace all internal href attributes with to props on Link components
2. THE Conversion_System SHALL preserve all CSS classes from anchor tags on Link components
3. THE Conversion_System SHALL preserve all data attributes from anchor tags on Link components
4. THE Conversion_System SHALL NOT replace external links with Link components
5. WHERE an anchor tag uses href="#", THE Conversion_System SHALL convert to button element with appropriate onClick handler
6. WHERE an anchor tag triggers a modal or offcanvas, THE Conversion_System SHALL preserve data-bs-toggle and data-bs-target attributes
7. THE Conversion_System SHALL import Link from react-router package not react-router-dom
8. WHEN a Link component requires active state styling, THE Conversion_System SHALL use NavLink component from react-router
9. WHEN programmatic navigation is required, THE Conversion_System SHALL use useNavigate hook from react-router

### Requirement 12: Form Component Conversion

**User Story:** As a developer, I want HTML forms converted to React Router Form components with Tailwind CSS styling, so that submissions trigger server actions correctly with consistent visual appearance.

#### Acceptance Criteria

1. THE Conversion_System SHALL replace all form elements with Form components from react-router
2. THE Form component SHALL convert all Bootstrap form classes to Tailwind form utilities
3. THE Form component SHALL set method prop to "post" for data mutations
4. THE Form component SHALL set action prop to the target route path when submitting to a different route
5. THE Conversion_System SHALL preserve all input, select, textarea, and button elements within forms
6. THE Conversion_System SHALL convert Bootstrap form-control classes to Tailwind input styling
7. THE Conversion_System SHALL convert Bootstrap button classes (btn, btn-primary, btn-secondary) to Tailwind button utilities using Brand_Colors
8. THE Conversion_System SHALL preserve all form validation attributes including required, pattern, min, max, minLength, maxLength
9. WHERE a form submission should not navigate away, THE Conversion_System SHALL use useFetcher and fetcher.Form from react-router
10. THE Conversion_System SHALL NOT use fetch or axios for form submissions in components
11. WHEN a form has errors, THE component SHALL display actionData.error using Tailwind alert patterns
12. WHEN a form is submitting, THE component SHALL read navigation.state or fetcher.state to show loading UI using Tailwind loading indicators

### Requirement 13: Loader Data Fetching

**User Story:** As a developer, I want server-side data fetching implemented in loader functions, so that pages render with data before hydration.

#### Acceptance Criteria

1. WHEN a Route_File requires data, THE Conversion_System SHALL export a loader function with Route.LoaderArgs parameter type
2. THE loader function SHALL fetch data from Express API endpoints using fetch or HTTP client
3. THE loader function SHALL run on the server before the component renders
4. THE loader function SHALL return data that becomes available as loaderData prop in the component
5. THE component SHALL receive loaderData through Route.ComponentProps type
6. THE Conversion_System SHALL NOT use useEffect for initial data fetching in components
7. THE Conversion_System SHALL NOT use useState for storing loader data in components
8. WHEN a loader needs URL parameters, THE loader SHALL access params from Route.LoaderArgs
9. WHEN a loader needs query parameters, THE loader SHALL parse request.url using URL constructor
10. IF a loader encounters an error, THE loader SHALL throw a Response object with appropriate status code

### Requirement 14: Type Safety Implementation

**User Story:** As a developer, I want TypeScript types enforced throughout the conversion, so that the codebase is maintainable and error-free.

#### Acceptance Criteria

1. THE Conversion_System SHALL import Route types from ./+types/[route-name] for each route file
2. THE loader function SHALL use Route.LoaderArgs as its parameter type
3. THE action function SHALL use Route.ActionArgs as its parameter type
4. THE component SHALL use Route.ComponentProps to type its props parameter
5. THE meta function SHALL use Route.MetaArgs as its parameter type
6. THE ErrorBoundary SHALL use Route.ErrorBoundaryProps as its parameter type
7. THE Conversion_System SHALL define TypeScript interfaces for all product, category, user, and order data structures
8. THE Conversion_System SHALL NOT use any type except for genuinely dynamic data
9. THE Conversion_System SHALL enable strict mode in tsconfig.json
10. THE Conversion_System SHALL resolve all TypeScript errors before considering conversion complete

### Requirement 15: Responsive Design Preservation

**User Story:** As a developer, I want all responsive breakpoints and mobile layouts converted to Tailwind responsive utilities, so that the React application works on all device sizes matching the original design.

#### Acceptance Criteria

1. THE Conversion_System SHALL convert all Bootstrap responsive utility classes to Tailwind responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
2. THE Conversion_System SHALL map Bootstrap breakpoints (sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px) to Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
3. THE Conversion_System SHALL preserve mobile navigation drawer structure using Tailwind and React state
4. THE Conversion_System SHALL convert mobile-specific elements with d-block d-md-none patterns to Tailwind block md:hidden patterns
5. THE Conversion_System SHALL convert desktop-specific elements with d-none d-md-block patterns to Tailwind hidden md:block patterns
6. THE Conversion_System SHALL test layouts at all major Tailwind breakpoints
7. WHERE Swiper breakpoints are configured, THE Conversion_System SHALL match HTML_Template responsive behavior
8. THE Conversion_System SHALL preserve mobile hamburger menu functionality using Tailwind and React state
9. THE Conversion_System SHALL preserve touch-friendly button and link sizes on mobile using Tailwind spacing utilities
10. THE Conversion_System SHALL preserve all viewport meta tags in root.tsx
11. IF Bootstrap breakpoint values differ significantly from Tailwind defaults, THE Conversion_System SHALL configure custom breakpoints in tailwind.config.ts to match Bootstrap values exactly

### Requirement 16: Static Asset Management

**User Story:** As a developer, I want all images and assets properly copied and referenced, so that the React application displays media correctly.

#### Acceptance Criteria

1. THE Conversion_System SHALL copy all files from root images/ directory to frontend/public/images/
2. THE Conversion_System SHALL copy any custom CSS that cannot be converted to Tailwind to frontend/app/styles/ as CSS modules
3. THE Conversion_System SHALL reference images using /images/ path prefix in React components
4. THE Conversion_System SHALL preserve all image alt attributes for accessibility
5. THE Conversion_System SHALL preserve all image dimensions using width and height attributes
6. WHERE background images are used via CSS, THE Conversion_System SHALL convert to Tailwind bg-[url()] syntax or CSS modules
7. THE Conversion_System SHALL copy favicon.svg and icons.svg to frontend/public/
8. THE Conversion_System SHALL NOT inline base64 images in components
9. THE Conversion_System SHALL NOT use import statements for public directory assets
10. THE Conversion_System SHALL NOT copy Bootstrap CSS or JavaScript files as they are not needed

### Requirement 17: Accessibility Compliance

**User Story:** As a developer, I want all accessibility attributes preserved from the HTML template, so that the React application remains WCAG compliant.

#### Acceptance Criteria

1. THE Conversion_System SHALL preserve all aria-* attributes from HTML_Template elements
2. THE Conversion_System SHALL preserve all role attributes from HTML_Template elements
3. THE Conversion_System SHALL preserve all alt attributes on img elements
4. THE Conversion_System SHALL preserve all aria-label attributes on buttons and links without visible text
5. THE Conversion_System SHALL preserve all aria-labelledby and aria-describedby references
6. THE Conversion_System SHALL preserve all aria-expanded attributes on collapsible elements
7. THE Conversion_System SHALL preserve all aria-hidden attributes on decorative elements
8. THE Conversion_System SHALL maintain semantic HTML structure with proper heading hierarchy
9. THE Conversion_System SHALL ensure all form inputs have associated label elements
10. THE Conversion_System SHALL ensure keyboard navigation works for all interactive elements

### Requirement 18: Performance Optimization

**User Story:** As a developer, I want the React application optimized for performance, so that page loads are fast and user experience is smooth.

#### Acceptance Criteria

1. THE Conversion_System SHALL enable server-side rendering in react-router.config.ts
2. THE Conversion_System SHALL use loader functions for data fetching instead of client-side useEffect
3. THE Conversion_System SHALL lazy load Bootstrap JavaScript using dynamic import in useEffect
4. THE Conversion_System SHALL use React.lazy for code-splitting large components where appropriate
5. THE Conversion_System SHALL preserve preconnect link tags for Google Fonts
6. THE Conversion_System SHALL NOT bundle large libraries that are not needed immediately
7. WHERE image dimensions are known, THE Conversion_System SHALL specify width and height attributes to prevent layout shift
8. THE Conversion_System SHALL use preload hints for critical CSS and fonts
9. THE Conversion_System SHALL minimize use of inline styles in favor of CSS classes
10. THE Conversion_System SHALL NOT perform redundant data fetching in nested components

### Requirement 19: Error Boundary Implementation

**User Story:** As a developer, I want error boundaries implemented for all routes with Tailwind styling, so that errors display gracefully without breaking the entire application.

#### Acceptance Criteria

1. WHEN a Route_File can throw errors, THE Conversion_System SHALL export an ErrorBoundary function
2. THE ErrorBoundary function SHALL receive Route.ErrorBoundaryProps as parameter type
3. THE ErrorBoundary SHALL render a user-friendly error message using Tailwind alert utilities
4. THE ErrorBoundary SHALL display different messages based on error status codes
5. THE ErrorBoundary SHALL include a link to return to the home page styled with Tailwind button utilities
6. THE ErrorBoundary SHALL use Tailwind color utilities for error states (bg-red-50, text-red-800, border-red-200)
7. WHERE loader functions throw HTTP Response objects, THE ErrorBoundary SHALL catch them
8. THE Conversion_System SHALL create a root-level ErrorBoundary in root.tsx
9. THE ErrorBoundary SHALL NOT expose sensitive error details to end users
10. THE ErrorBoundary SHALL log errors to console in development mode

### Requirement 20: SEO Meta Tags Implementation

**User Story:** As a developer, I want meta tags implemented for all pages, so that the React application is SEO-friendly and shareable.

#### Acceptance Criteria

1. WHEN a Route_File represents a page, THE Conversion_System SHALL export a meta function
2. THE meta function SHALL use Route.MetaArgs as its parameter type
3. THE meta function SHALL return an array of meta tag objects
4. THE meta function SHALL include title tag appropriate for the page content
5. THE meta function SHALL include description meta tag with relevant content
6. THE meta function SHALL include Open Graph tags for og:title, og:description, og:image where applicable
7. THE meta function SHALL use loaderData to dynamically generate meta tags for detail pages
8. WHERE product pages exist, THE meta function SHALL use product name in the title
9. WHERE category pages exist, THE meta function SHALL use category name in the title
10. THE Conversion_System SHALL set canonical meta tag to prevent duplicate content issues

### Requirement 21: Component Co-location

**User Story:** As a developer, I want loader, action, component, meta, and ErrorBoundary exports co-located in route files, so that code splitting works correctly.

#### Acceptance Criteria

1. THE Conversion_System SHALL place loader function in the same file as the route component
2. THE Conversion_System SHALL place action function in the same file as the route component
3. THE Conversion_System SHALL place meta function in the same file as the route component
4. THE Conversion_System SHALL place ErrorBoundary in the same file as the route component
5. THE Conversion_System SHALL place default export component in the same file as loader and action
6. THE Conversion_System SHALL NOT split route logic across multiple files
7. THE Conversion_System SHALL extract reusable UI components to app/components/ directory
8. THE Conversion_System SHALL extract reusable utility functions to app/lib/ directory
9. WHERE business logic is complex, THE Conversion_System MAY extract to service modules but keep route exports together
10. THE Conversion_System SHALL NOT create separate files for loader.ts, action.ts, component.tsx patterns

### Requirement 22: Documentation and Comments

**User Story:** As a developer, I want clear documentation in converted components, so that future developers understand the mapping from HTML to React with Tailwind CSS.

#### Acceptance Criteria

1. THE Conversion_System SHALL include a comment at the top of each route file indicating the source HTML_Template file
2. THE Conversion_System SHALL include comments for complex Tailwind class combinations explaining their purpose
3. THE Conversion_System SHALL document Swiper configuration values in comments
4. THE Conversion_System SHALL document loader and action function behavior in JSDoc comments
5. THE Conversion_System SHALL document TypeScript interface properties with JSDoc comments
6. WHERE HTML structure is non-obvious, THE Conversion_System SHALL include comments explaining the layout pattern
7. WHERE Bootstrap classes were converted to specific Tailwind patterns, THE Conversion_System SHALL comment the original Bootstrap class for reference
8. THE Conversion_System SHALL include README.md in frontend/ explaining the conversion approach and Tailwind configuration
9. THE Conversion_System SHALL document any deviations from HTML_Template in comments with justification
10. THE Conversion_System SHALL NOT over-comment obvious code patterns
11. THE Conversion_System SHALL document custom Tailwind theme values in tailwind.config.ts with comments explaining the Bootstrap equivalents

### Requirement 23: Tailwind Configuration and Theme Setup

**User Story:** As a developer, I want Tailwind CSS v4 properly configured with custom theme values matching the original Bootstrap design, so that brand colors and spacing match exactly.

#### Acceptance Criteria

1. THE Conversion_System SHALL create tailwind.config.ts in frontend/ directory
2. THE Tailwind configuration SHALL define custom colors matching Brand_Colors: primary (#6BB252), secondary (#364127), danger (#F95F09), success (#a3be4c)
3. THE Tailwind configuration SHALL define custom font family for Inter to match template's heading and body font
4. THE Tailwind configuration SHALL configure line height values to match Bootstrap's --bs-body-line-height: 2
5. THE Tailwind configuration SHALL configure custom spacing values if Bootstrap spacing scale differs from Tailwind defaults
6. THE Tailwind configuration SHALL extend Tailwind's default theme rather than replacing it completely
7. THE Tailwind configuration SHALL include @tailwindcss/vite plugin in vite.config.ts
8. THE Conversion_System SHALL create app/index.css that imports Tailwind with @import "tailwindcss" directive
9. THE Conversion_System SHALL use @layer components directive for reusable component patterns like buttons and cards
10. THE Conversion_System SHALL use @layer utilities directive for custom utility classes not provided by Tailwind
11. WHERE Bootstrap components use specific shadow values, THE Conversion_System SHALL configure custom boxShadow values in Tailwind theme
12. WHERE Bootstrap uses specific border-radius values, THE Conversion_System SHALL configure custom borderRadius values in Tailwind theme

### Requirement 24: Knowledge Base Documentation Updates

**User Story:** As a developer, I want project documentation updated to reflect Tailwind CSS as primary styling framework, so that future work follows correct patterns.

#### Acceptance Criteria

1. THE Conversion_System SHALL update .kb/02-tech-stack.md to change Bootstrap to Tailwind CSS v4 as primary frontend CSS framework
2. THE .kb/02-tech-stack.md update SHALL remove Bootstrap from the Frontend Packages table
3. THE .kb/02-tech-stack.md update SHALL add @tailwindcss/vite and tailwindcss version 4.x to Frontend Packages table
4. THE .kb/02-tech-stack.md update SHALL remove the "Notes on Bootstrap vs Tailwind" section
5. THE Conversion_System SHALL update .kb/03-architecture.md CSS/Styling Rules section to reference Tailwind instead of Bootstrap
6. THE .kb/03-architecture.md update SHALL replace CSS Variables section with Tailwind Theme Configuration section
7. THE .kb/03-architecture.md update SHALL update component mapping table to indicate Tailwind styling
8. THE Conversion_System SHALL update .kb/05-hallucination-traps.md to remove Bootstrap-specific traps
9. THE .kb/05-hallucination-traps.md update SHALL add new trap: "Do NOT install Bootstrap when Tailwind is primary CSS framework"
10. THE Conversion_System SHALL update .kb/08-change-log.md with entry documenting HTML to Tailwind React conversion completion
11. WHERE .kb files reference Bootstrap classes in examples, THE Conversion_System SHALL replace with Tailwind equivalents

### Requirement 25: Client State Management Setup

**User Story:** As a developer, I want Zustand stores configured for cart and authentication state, so that the application can manage client-side state efficiently while preparing for backend API integration.

#### Acceptance Criteria

1. THE Conversion_System SHALL install zustand as a dependency in frontend/
2. THE Conversion_System SHALL create app/store/cart.store.ts with Zustand store for cart management
3. THE cart store SHALL include state for cartItems array, totalItems count, and totalPrice
4. THE cart store SHALL include actions for addItem, removeItem, updateQuantity, clearCart
5. THE Conversion_System SHALL create app/store/auth.store.ts with Zustand store for authentication
6. THE auth store SHALL include state for user object, accessToken string, isAuthenticated boolean
7. THE auth store SHALL include actions for login, logout, setUser, setToken
8. THE auth store SHALL persist authentication state to localStorage using Zustand persist middleware
9. THE Conversion_System SHALL create app/lib/api.client.ts with axios instance configured for API calls
10. THE axios client SHALL include request interceptor to attach accessToken from auth store to Authorization header
11. THE axios client SHALL include response interceptor to handle 401 errors and trigger logout
12. THE Conversion_System SHALL configure axios baseURL from environment variable or default to localhost:3001
13. WHERE components need cart state, THE Conversion_System SHALL use useCartStore hook
14. WHERE components need auth state, THE Conversion_System SHALL use useAuthStore hook
