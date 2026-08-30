# semantic-space-3d

<div align="center">

[![npm version](https://img.shields.io/npm/v/semantic-space-3d.svg?style=flat-square)](https://www.npmjs.com/package/semantic-space-3d)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![CI](https://github.com/NaoyaRuike/semantic-space-3d/actions/workflows/ci.yml/badge.svg)](https://github.com/NaoyaRuike/semantic-space-3d/actions/workflows/ci.yml)

**Interactive 3D space visualization library for multidimensional and semantic data using React Three Fiber (R3F).**

[English](README.md) | [日本語 (Japanese)](README.ja.md)

</div>

---

## Features

- 🌌 **2D & 3D Space Support**: Provides `VisualizationScene` (Orthographic) for top-down 2D views and `VisualizationScene3D` (Perspective) for immersive 3D exploration.
- 🎨 **Deeply Customizable**: Freely configure card dimensions, colors, hover glow effects, scene themes, lighting, background grid, coordinate axes, and starry skies.
- 🛠️ **Custom Renderers**: Completely replace cards with custom React Three Fiber 3D meshes using `renderCard`.
- 🧩 **Extensible Canvas**: Inject custom lights, 3D models, UI overlays, or effects directly via `children`.
- ⚡ **Optimized Performance**: Built on top of Three.js and `@react-three/fiber` for smooth rendering.

---

## Installation

```bash
# Using pnpm
pnpm add semantic-space-3d @react-three/fiber @react-three/drei three

# Using npm
npm install semantic-space-3d @react-three/fiber @react-three/drei three

# Using yarn
yarn add semantic-space-3d @react-three/fiber @react-three/drei three
```

---

## Quick Start

### 3D Visualization Scene (`VisualizationScene3D`)

```tsx
import React from 'react'
import { VisualizationScene3D } from 'semantic-space-3d'

interface DataItem {
  id: string
  title: string
  imageUrl: string
  x: number
  y: number
  z: number
}

const data: DataItem[] = [
  { id: '1', title: 'Node 1', imageUrl: 'https://example.com/1.jpg', x: 0, y: 0, z: 0 },
  { id: '2', title: 'Node 2', imageUrl: 'https://example.com/2.jpg', x: 5, y: 3, z: -2 },
]

export function SemanticSpaceApp() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <VisualizationScene3D
        data={data}
        getPosition={(item) => [item.x, item.y, item.z]}
        getCardData={(item) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.imageUrl,
        })}
        xAxisLabel="Category"
        yAxisLabel="Popularity"
        zAxisLabel="Timeline"
        cardScale={1}
        onNodeClick={(item) => console.log('Selected item:', item)}
      />
    </div>
  )
}
```

---

## Customization

### 1. Card Styling (`cardStyle`)

Customize dimensions, colors, hover effects, and typography for card items:

```tsx
<VisualizationScene3D
  data={data}
  getPosition={(item) => [item.x, item.y, item.z]}
  getCardData={(item) => item}
  xAxisLabel="X"
  yAxisLabel="Y"
  zAxisLabel="Z"
  cardScale={1}
  cardStyle={{
    // Dimensions
    width: 1.8,                  // Card width (default: 1.5)
    height: 2.4,                 // Card height (default: 2.1)
    hoverScaleMultiplier: 1.4,   // Hover scale magnification (default: 1.5)

    // Colors
    bgColor: '#1e293b',          // Card background color
    bgHoverColor: '#334155',     // Card hover background color
    textColor: '#f8fafc',        // Title text color
    borderColor: '#475569',      // Border stroke color
    borderHoverColor: '#38bdf8', // Border stroke color on hover

    // Glow effect & typography
    glowColor: '#0ea5e9',        // Hover glow color
    glowOpacity: 0.3,            // Glow opacity (0.0 - 1.0)
    showGlow: true,              // Enable/disable glow effect
    showTitle: true,             // Enable/disable title overlay
    fontSize: 0.1,               // Font size
  }}
/>
```

---

### 2. Scene Environment & Theme (`theme`)

Change background colors, environment maps, coordinate axes, grids, and starfields:

```tsx
<VisualizationScene3D
  data={data}
  getPosition={(item) => [item.x, item.y, item.z]}
  getCardData={(item) => item}
  xAxisLabel="X"
  yAxisLabel="Y"
  zAxisLabel="Z"
  cardScale={1}
  theme={{
    // Environment & background
    backgroundColor: '#090d16',   // Scene canvas background color
    environmentPreset: 'sunset',  // Drei environment preset ('night' | 'city' | 'sunset' etc.)
    ambientLightIntensity: 0.4,   // Ambient light intensity
    pointLightIntensity: 1.0,     // Point light intensity

    // Starfield effect
    showStars: true,
    starsConfig: {
      count: 3000,
      factor: 5,
      speed: 0.5,
    },

    // Coordinate axes & labels
    showAxes: true,
    axisLength: 15,
    axisColor: '#93c5fd',         // Axis labels font color

    // Ground & wall grids
    showGrid: true,
    gridSize: 30,                 // Grid dimension
    gridColorCenter: '#334155',   // Grid center line color
    gridColorGrid: '#1e293b',     // Grid line color
  }}
/>
```

---

### 3. Custom Card Renderer (`renderCard`)

Provide your own 3D component or mesh for complete rendering freedom:

```tsx
<VisualizationScene3D
  data={data}
  getPosition={(item) => [item.x, item.y, item.z]}
  getCardData={(item) => item}
  xAxisLabel="X"
  yAxisLabel="Y"
  zAxisLabel="Z"
  cardScale={1}
  renderCard={({ node, position, isHovered, onHover, onClick }) => (
    <group
      position={position}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
      onClick={onClick}
    >
      <mesh scale={isHovered ? 1.2 : 1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={isHovered ? 'hotpink' : 'orange'} />
      </mesh>
    </group>
  )}
/>
```

---

## API Reference

### `Card3DStyle`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number` | `1.5` | Card mesh width |
| `height` | `number` | `2.1` | Card mesh height |
| `hoverScaleMultiplier` | `number` | `1.5` | Magnification factor on hover |
| `bgColor` | `string` | Theme-dependent | Card background color |
| `bgHoverColor` | `string` | Theme-dependent | Card background color on hover |
| `textColor` | `string` | Theme-dependent | Title text color |
| `borderColor` | `string` | Theme-dependent | Border stroke color |
| `borderHoverColor` | `string` | `'#3b82f6'` | Border stroke color on hover |
| `glowColor` | `string` | `'#3b82f6'` | Hover glow color |
| `glowOpacity` | `number` | `0.2` | Glow opacity (0.0 to 1.0) |
| `fontSize` | `number` | `0.08` | Title font size |
| `showTitle` | `boolean` | `true` | Whether to display title overlay |
| `showGlow` | `boolean` | `true` | Whether to enable glow effect on hover |
| `titleBgColor` | `string` | `'#333333'` | Background color for title strip |
| `titleBgOpacity` | `number` | `0.5` | Opacity for title strip |

### `SceneTheme`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `backgroundColor` | `string` | `undefined` | Canvas background CSS color |
| `environmentPreset` | `string` | `isDark ? 'night' : 'city'` | Environment preset name |
| `ambientLightIntensity` | `number` | `0.2` - `0.5` | Ambient light intensity |
| `pointLightIntensity` | `number` | `0.8` - `1.2` | Point light intensity |
| `spotLightIntensity` | `number` | `1.0` | Spotlight intensity (3D only) |
| `showStars` | `boolean` | `isDark` | Show starry background (3D only) |
| `starsConfig` | `object` | - | Customization options for stars |
| `showAxes` | `boolean` | `true` | Show axes lines and labels (3D only) |
| `axisLength` | `number` | `12` | Coordinate axis length (3D only) |
| `axisColor` | `string` | Theme-dependent | Color of axis labels (3D only) |
| `showGrid` | `boolean` | `true` | Show spatial grid |
| `gridSize` | `number` | `20` (2D) / `24` (3D) | Size of spatial grid |
| `gridDivisions` | `number` | `20` (2D) / `12` (3D) | Number of subdivisions for grid |
| `gridColorCenter` | `string \| number` | Theme-dependent | Color of grid center axes |
| `gridColorGrid` | `string \| number` | Theme-dependent | Color of grid lines |

---

## Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/NaoyaRuike/semantic-space-3d/issues). See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

---

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 [Naoya Ruike](https://github.com/NaoyaRuike).
