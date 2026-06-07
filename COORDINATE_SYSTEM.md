# Coordinate System Convention

## Mathematical Convention (Standard Math Textbook)

This application uses a **left-handed coordinate system** specifically designed for mathematical education:

### Axis Definitions

| Axis | 1st Value (x) | 2nd Value (y) | 3rd Value (z) |
|------|---------------|---------------|---------------|
| **Positive Direction** | Toward viewer | Right | Up |
| **Negative Direction** | Away from viewer | Left | Down |

### Point Notation

Points are represented as `(x/y/z)` where:
- **x**: First coordinate (depth: toward/away)
- **y**: Second coordinate (horizontal: left/right)
- **z**: Third coordinate (vertical: up/down)

### Example Points

- `(1/2/3)` → 1 unit toward viewer, 2 units right, 3 units up
- `(-1/0/0)` → 1 unit away from viewer, at origin height
- `(0/-2/1)` → 2 units left, 1 unit up

## Implementation Requirements

All code working with 3D coordinates must:

1. **Accept coordinates in (x/y/z) order** from user input
2. **Label points with (x/y/z) format** in the visualization
3. **Transform to Three.js coordinates** internally when rendering (Three.js uses different conventions)
4. **Document any transformations** between mathematical and rendering coordinates

## Three.js Coordinate Mapping

Internal Three.js coordinates are transformed as follows:

```
Mathematical (x, y, z) → Three.js (y, z, -x)
```

Where:
- Math x (depth) → Three.js -x (inverted for correct depth perception)
- Math y (horizontal) → Three.js y (horizontal)
- Math z (vertical) → Three.js z (vertical)

## When Adding New Features

- Use mathematical coordinates `(x, y, z)` in all user-facing code
- Use helper functions for coordinate transformation
- Always label with `(x/y/z)` format
- Test with multiple points to ensure correct axis directions
