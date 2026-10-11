# OPTERA Implementation Plan

Goal: deliver a working Japanese website with four interactive CSS 3D scenes and honest consultation flow.
Architecture: Next.js server-rendered sections, small client hero/form/navigation islands, server-side contact route.
Spec: docs/design.md and supplied user brief.

- [x] 1. Scaffold application, preserve logo, define tokens. Write browser acceptance tests and observe failure before implementation.
- [x] 2. Build Hero, Showcase and Header. Verify four scenes, arrows, keyboard, drag/swipe, autoplay pause, reduced motion and mobile before expanding the homepage.
- [x] 3. Build data-driven curriculum, six project samples and remaining homepage sections, FAQ, footer.
- [x] 4. Build contact/privacy pages and validation API. Verify invalid data, missing backend and consent; never fabricate receipt.
- [x] 5. Add metadata, conditional sitemap/robots, analytics hooks, env setup, deployment README. Production build and browser QA at desktop/mobile widths.

Review focus: hidden tabs stop motion; keyboard form arrows remain native; rapid slide input remains consistent; oversized/malformed requests fail; unknown production domain must not create fictional URLs.

Ruling: proceed without intermediate approval gates because the supplied brief explicitly authorizes reasonable design/engineering decisions and end-to-end execution. No existing Git repository or application to isolate. Use native implementation.


## Final verification and redesign

- User requested a brighter first view referencing JAPAN AI and SHIFT AI, plus substantial curriculum diagrams. Updated HeroArtwork, Hero and Curriculum; added desktop/mobile LearningDiagram and redesign.css.
- Production build passed, TypeScript passed, 13 Playwright tests passed against production server http://127.0.0.1:3101 (Microsoft Edge).
- Viewports checked: 375/390, 768, 1440 CSS pixels. App console and network checks showed no errors. In-app browser updated and confirmed visually.
- Review fixes: local-only development form, touch gesture pause, same-origin host handling behind Next's internal URL, responsive mobile diagram labels, and no repeated entrance animation after scene transition.
- Backend delivery remains intentionally unconfigured; business/privacy information and destination credentials are still required before production intake.
