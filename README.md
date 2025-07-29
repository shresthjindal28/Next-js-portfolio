This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Skills

This portfolio showcases the following skills:

- JavaScript, TypeScript
- React, Next.js
- Three.js, React Three Fiber
- Tailwind CSS
- HTML, CSS
- Responsive Web Design
- UI/UX Principles
- Git & Version Control
- Docker (basic usage)

## 3D Background Feature

This portfolio includes a custom 3D animated background built with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and [drei](https://github.com/pmndrs/drei). The main component for this feature is `Model3D` (`src/Components/Model3D.tsx`).

### Features

- Responsive 3D shapes (box, sphere, torus, octahedron, icosahedron) animated in the background
- Performance-optimized for desktop and mobile
- Uses `@react-three/fiber` for rendering and `@react-three/drei` for controls and instancing
- Ambient and point lighting for visual depth
- Auto-rotating camera with limited controls

#### Customization

- You can adjust the number, type, and color of shapes in `Model3D.tsx`
- The camera position and lighting can be tweaked for different visual effects

#### File Reference

- Main 3D component: `src/Components/Model3D.tsx`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
