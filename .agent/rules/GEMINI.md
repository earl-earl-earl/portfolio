---
trigger: always_on
---

## 🛠️ Strict Engineering & Code Quality Rules

*   **Type Safety:** Always avoid the `any` type. Explicitly define interfaces, types, or use generics to maintain strict TypeScript compilation.
*   **Component Structure:** Favor small, decoupled, and reusable functional components. Separate complex business logic or animation hooks from pure presentational layout markup.
*   **Animation Efficiency:** Never mix Framer Motion animations with heavy layout re-renders. Use `layoutId` only when necessary for shared element transitions, and prefer `transform` and `opacity` properties over shifting properties like `width`, `height`, `top`, or `left` to keep transitions running at a fluid 60fps.
*   **Styling Consistency:** Utilize Tailwind CSS utility classes exclusively. Avoid inline style objects unless explicitly passing dynamic, runtime-calculated values (e.g., custom scroll tracking positions) into a Framer Motion component.
*   **Shadcn/ui Best Practices:** When initializing or overriding shadcn components, modify the underlying Tailwind components inside the `components/ui` folder directly rather than piling messy wrapper classes on top of them.