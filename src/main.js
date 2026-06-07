import { Scene3D } from './Scene.js';
import { Point3D } from './geometry/Point.js';

/**
 * Main application for 3D Analytical Geometry visualization
 * 
 * Uses mathematical coordinate system:
 * - x: positive toward viewer, negative away
 * - y: positive right, negative left
 * - z: positive up, negative down
 */

// Initialize the 3D scene
const container = document.body;
const scene3d = new Scene3D(container);

// Create and add example points
const points = [
  new Point3D(2, 3, 2, { 
    color: 0xff0000,  // Red
    size: 0.15,
    labelVisible: true 
  }),
  new Point3D(-2, 1, 3, { 
    color: 0x00ff00,  // Green
    size: 0.15,
    labelVisible: true 
  }),
  new Point3D(1, -2, 1, { 
    color: 0x0000ff,  // Blue
    size: 0.15,
    labelVisible: true 
  }),
  new Point3D(0, 0, 0, { 
    color: 0xffa500,  // Orange (origin)
    size: 0.2,
    labelVisible: true 
  })
];

// Add points to scene
points.forEach(point => {
  scene3d.addObjects(point.getObjects());
});

// Log created points for debugging
console.log('Created points:');
points.forEach(point => {
  const coords = point.getCoordinates();
  console.log(`  ${point.getLabel()}`);
});