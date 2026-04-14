# Design System Strategy: The Academic Atelier

## 1. Overview & Creative North Star
The North Star for this design system is **"The Academic Atelier."** 

Standard educational dashboards often feel like cold, utilitarian spreadsheets. We are moving away from the "industrial" feel toward a "curated studio" aesthetic. This design system treats information as high-end editorial content. We achieve this through **Intentional Asymmetry**—where the layout feels balanced but not perfectly mirrored—and **Atmospheric Depth**, utilizing the color palette to create a sense of physical space and calm. By prioritizing whitespace as a functional tool rather than a void, we transform a complex management system into a premium, low-cognitive-load experience.

---

## 2. Colors & Tonal Architecture
The palette is rooted in soft blues and architectural grays. To maintain a premium feel, we strictly follow a **"No-Line" Rule**.

### The "No-Line" Rule
Traditional 1px borders are prohibited for sectioning. Structural boundaries must be defined solely through background color shifts or tonal transitions.
*   **Context:** A side-navigation menu should not be separated by a line; instead, use `surface-container-low` for the nav against a `surface` background.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers. 
*   **Base Layer:** `surface` (#f7f9fb)
*   **Secondary Sectioning:** `surface-container-low` (#f0f4f7)
*   **Interactive/Content Containers:** `surface-container-lowest` (#ffffff) for maximum "pop" and clarity.
*   **Nesting Logic:** An inner card (like a student profile snippet) should sit at a different tier than its parent container to create "natural" depth without needing a shadow.

### The Glass & Gradient Rule
To move beyond "standard" admin looks:
*   **Glassmorphism:** Use `surface-container-lowest` with a 70% opacity and a `20px` backdrop-blur for floating modals or sticky headers.
*   **Signature Textures:** For primary actions (e.g., "Create New Course"), use a subtle linear gradient from `primary` (#3755c3) to `primary_dim` (#2848b7) at a 135° angle. This adds "soul" and a tactile, premium weight.

---

## 3. Typography: Editorial Authority
We utilize a dual-font approach to balance personality with utility.

*   **Display & Headline (Manrope):** We use Manrope for large-scale type. Its geometric yet warm character provides an authoritative, editorial feel. Use `headline-lg` for dashboard summaries to make data feel like a headline, not just a number.
*   **Body & Labels (Inter):** Inter is our workhorse. It is optimized for readability in dense data environments.
*   **Hierarchy Note:** To create the "Atelier" look, exaggerate the scale difference. Pair a `display-sm` (36px) title with `body-sm` (12px) metadata. This high-contrast scale communicates importance instantly.

---

## 4. Elevation & Depth: Tonal Layering
Hierarchy is achieved through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. The contrast between the pure white and the soft gray creates a "lifted" effect that is cleaner than a shadow.
*   **Ambient Shadows:** For floating elements (Modals, Popovers), use a "Long Shadow" approach: `0px 20px 40px rgba(42, 52, 57, 0.06)`. The shadow color is a tinted version of `on-surface`, making it feel like ambient light in a room rather than a digital artifact.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in input fields, use `outline-variant` (#a9b4b9) at **20% opacity**. It should be a hint of a line, never a hard boundary.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary_dim`. `md` (12px) roundedness. No border.
*   **Secondary:** `secondary_container` background with `on_secondary_container` text.
*   **Interaction:** On hover, increase the elevation using an **Ambient Shadow**, rather than changing the color.

### Input Fields
*   **Style:** Minimalist. No solid bottom line. Use `surface-container-high` as a subtle background fill with `sm` (4px) roundedness.
*   **States:** On focus, transition the background to `surface-container-lowest` and add a 1px "Ghost Border" using `primary`.

### Cards & Lists
*   **The Divider Ban:** Strictly forbid 1px horizontal dividers. 
*   **Separation:** Separate list items using `16px` of vertical whitespace or a subtle background toggle (Alternating `surface` and `surface-container-low`).
*   **Education Specifics:** Grade chips should use `tertiary_container` with `on_tertiary_container` text for a sophisticated "soft-tonal" look that isn't as aggressive as red/green.

### Additional Components: The "Focus Plate"
Specifically for educational management, use a **Focus Plate** for student records. This is a large `surface-container-lowest` container with a `xl` (24px) corner radius, acting as a "stage" for the most critical information, surrounded by generous `surface` whitespace.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Generous Whitespace:** If you think there is enough space, add 20% more.
*   **Nesting Surfaces:** Use `surface-container-highest` for the most interactive elements like "Save" bars or search anchors.
*   **Text over Lines:** Use font weight (`title-sm` bold) to separate sections instead of a line.

### Don’t:
*   **Don't use Pure Black:** Never use #000000. Use `on_surface` (#2a3439) for all "black" text to maintain the soft, premium feel.
*   **Don't use Sharp Corners:** Avoid `none` or `sm` roundedness for large containers. Stick to `lg` (16px) or `xl` (24px) to keep the "Soft Minimalist" promise.
*   **Don't use High-Contrast Borders:** If a container isn't visible against the background, change the background color of the page, don't add a border to the container.