# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript check + production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

This is a React Three Fiber (R3F) portfolio/workshop site built with Vite, TypeScript, and Tailwind CSS. The codebase follows a **Feature-Sliced Design** structure:

```
src/
├── App/          # Application-level components (Header, global styles)
├── Page/         # Route pages (Main page with routing setup)
├── Widget/       # Feature widgets (SphereScene, CurveScene, VehicleScene, AppBar)
└── Shared/       # Shared utilities (shadcn/ui, libs, components)
```

### Path Aliases

- `@/*` maps to `src/*` (configured in vite.config.ts and tsconfig.json)

## 3D Scene Architecture

Each 3D scene widget follows a consistent pattern:

```
Widget/[SceneName]/
├── index.tsx              # Scene Canvas setup (camera, lighting, background)
├── ui/                    # Visual components
│   └── [Component]/
│       ├── index.tsx      # Component JSX (meshes, geometries)
│       └── model/         # Custom hooks for component logic
└── model/                 # Scene-level custom hooks
```

### Scene Component Pattern

**Scene components are prop-driven for reusability**. Example from `SphereScene/ui/Spheres`:

- Props control: count, colors, box size, center position, repel physics parameters
- Custom hooks separate concerns:
  - `useInitSpheres` - initial positions/colors
  - `useSphereMovement` - physics/bouncing within bounds
  - `useRayCasterEffect` - mouse interaction (repel effect)

### Key R3F Patterns

1. **Refs for Three.js objects**: Use `React.useRef<THREE.Group>(null!)` to access/manipulate meshes in `useFrame` hooks
2. **useFrame for animations**: Custom hooks wrap `useFrame` from `@react-three/fiber` for per-frame updates
3. **GSAP integration**: `Page/Main/model/useGsap.ts` shows ScrollTrigger integration with React refs

## Audio Integration

Background music is handled in `Widget/AppBar`:
- `useMusic` hook manages play/pause state with audio ref
- Audio element is hidden, controlled via menubar
- Music files in `public/music/`

## Styling

- **Tailwind CSS 4.x** with `@tailwindcss/vite` plugin
- **shadcn/ui** components in `Shared/shadcn/components/ui/`
- Utility functions in `Shared/shadcn/lib/utils.ts`

## Device Responsiveness

`Shared/lib/getIsDesktop.ts` provides viewport detection. Used to adjust:
- Sphere counts (60 desktop / 30 mobile)
- Canvas dimensions and camera positions
- Box sizes for physics boundaries
