# 3D Analytical Geometry (3dAnAGeom)

A web-based 3D visualization tool for teaching analytical geometry and vector mathematics to students. Visualize points, vectors, lines, and planes in three-dimensional space using mathematical coordinate conventions from standard textbooks.

## Features

- ✨ **3D Point Visualization** - Display points with coordinate labels in (x/y/z) format
- 📐 **Mathematical Coordinate System** - Follows standard math textbook conventions
- 🎯 **Interactive Scene** - Rotate, zoom, and explore 3D geometry
- 🔴 **Coordinate Axes** - Color-coded axes (X=red, Y=green, Z=blue) with labels
- 📊 **Grid Reference** - Visual grid for spatial orientation

## Mathematical Coordinate System

This application uses a **left-handed coordinate system** specifically designed for mathematical education:

| Axis | Direction | Convention |
|------|-----------|-------------|
| **X** (1st value) | Toward/Away | Positive toward viewer, Negative away from viewer |
| **Y** (2nd value) | Left/Right | Positive right, Negative left |
| **Z** (3rd value) | Up/Down | Positive up, Negative down |

### Point Notation

Points are represented as `(x/y/z)` where each value corresponds to the respective axis.

**Examples:**
- `(1/2/3)` → 1 unit toward viewer, 2 units right, 3 units up
- `(-1/0/0)` → 1 unit away from viewer, at center
- `(0/-2/1)` → 2 units left, 1 unit up

**Important:** This coordinate system is maintained throughout the entire codebase. See [COORDINATE_SYSTEM.md](./COORDINATE_SYSTEM.md) for technical details.

## Getting Started

### Prerequisites

- Node.js 14+ and npm (for development)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Install dependencies
npm install

# Development server (with Vite)
npm run dev

# Build for production
npm run build
```

### Quick Start

1. Open the application in your browser
2. You'll see four example points displayed in 3D space:
   - Red point at (2/3/2)
   - Green point at (-2/1/3)
   - Blue point at (1/-2/1)
   - Orange point at (0/0/0) - the origin

## Project Structure

```
3dAnAGeom/
├── src/
│   ├── main.js                 # Application entry point
│   ├── Scene.js                # 3D scene management
│   ├── coordinateSystem.js     # Coordinate transformation utilities
│   └── geometry/
│       └── Point.js            # Point class for visualization
├── COORDINATE_SYSTEM.md        # Coordinate system documentation
├── package.json
└── index.html
```

## Usage

### Creating Points

```javascript
import { Point3D } from './geometry/Point.js';

// Create a red point at mathematical coordinates (2, 3, 1)
const point = new Point3D(2, 3, 1, {
  color: 0xff0000,      // Red (hex color)
  size: 0.15,           // Sphere size
  decimals: 1,          // Decimal places in label
  labelVisible: true    // Show coordinate label
});

// Add to scene
scene3d.addObjects(point.getObjects());
```

### Coordinate Transformation

```javascript
import { mathToThreeJs, formatCoordinateLabel } from './coordinateSystem.js';

// Convert mathematical coordinates to Three.js coordinates
const threeCoords = mathToThreeJs(2, 3, 1);

// Format coordinates as label
const label = formatCoordinateLabel(2, 3, 1, 2);  // Returns: "(2/3/1)"
```

## Development Guide

### Adding New Features

When extending this application:

1. **Always use mathematical coordinates** in user-facing code
2. **Use `formatCoordinateLabel()`** for displaying coordinates
3. **Use `mathToThreeJs()`** when positioning objects
4. **Document coordinate conventions** in new modules
5. **Test with multiple points** to verify axis directions

### Coordinate System Consistency

The mathematical convention (x/y/z) must be maintained throughout:
- User input should accept (x, y, z) in mathematical order
- Labels should display in (x/y/z) format
- Internal Three.js transformations should be transparent to the user

See [COORDINATE_SYSTEM.md](./COORDINATE_SYSTEM.md) for more details.

## Technologies Used

- **Three.js** - 3D graphics library
- **Vite** - Build tool and dev server
- **HTML5 Canvas** - For text labels in 3D space

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Open source project for educational use.

## Contributing

Contributions are welcome! Please ensure:
- Code follows the mathematical coordinate convention
- Comments explain the coordinate system being used
- New features are well-documented