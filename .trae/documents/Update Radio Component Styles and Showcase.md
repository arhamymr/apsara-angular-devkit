I will update the `RadioComponent` to use the primary color from the theme and revamp the `RadioShowcaseComponent` to provide comprehensive usage examples similar to the `ButtonShowcaseComponent`.

### **1. Update Radio Component**
**File:** `libs/ui/src/components/radio/radio.component.ts`
- **Style Update:** Replace the hardcoded `blue` colors with the primary theme color.
  - Change `text-blue-600` to `text-[var(--primary)]`.
  - Change `focus:ring-blue-500` to `focus:ring-[var(--primary)]`.

### **2. Update Radio Showcase**
**File:** `apps/demo/app/features/components/radio-showcase.component.ts`
- **Structure:** Refactor the page to include multiple distinct sections with "Preview" and "Code" tabs, mirroring the `ButtonShowcaseComponent`.
- **New Sections:**
  1.  **Basic Usage:** Standard gender selection.
  2.  **Disabled States:**
      - Entire group disabled (using `isDisabled` input).
      - Individual option disabled (using `disabled` property in option object).
  3.  **Reactive Forms:** Example using `FormControl` (requires adding `ReactiveFormsModule` to imports).
  4.  **Layout & Customization:** Demonstrate horizontal layout using standard CSS classes on the host, mirroring the "Custom Class" section of the button showcase.
- **Props Table:** Ensure all properties (`name`, `options`, `legend`, `isDisabled`, `modelValue`) are documented.
- **Imports:** Add `ReactiveFormsModule` and `LucideAngularModule` (if icons are used for visual flair in headers).

### **3. Verification**
- **Manual Verification:** Verify the code structure, ensuring all imports are correct (especially `ReactiveFormsModule` and `FormsModule`) and that the syntax follows the project's Angular best practices (Signals, Standalone components).
