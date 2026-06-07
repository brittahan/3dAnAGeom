/**
 * Coordinate System Utilities
 * 
 * This module handles conversion between mathematical coordinates (x/y/z)
 * and Three.js rendering coordinates.
 * 
 * Mathematical Convention (from textbook):
 * - x: positive toward viewer, negative away from viewer
 * - y: positive right, negative left
 * - z: positive up, negative down
 */

/**
 * Converts mathematical coordinates to Three.js coordinates
 * 
 * @param {number} mathX - Mathematical x coordinate (depth toward/away)
 * @param {number} mathY - Mathematical y coordinate (horizontal left/right)
 * @param {number} mathZ - Mathematical z coordinate (vertical up/down)
 * @returns {Object} Three.js coordinates {x, y, z}
 */
export function mathToThreeJs(mathX, mathY, mathZ) {
  return {
    x: -mathX,  // Invert x for correct depth perception
    y: mathZ,   // Z becomes vertical in Three.js
    z: mathY    // Y becomes horizontal depth in Three.js
  };
}

/**
 * Converts Three.js coordinates back to mathematical coordinates
 * 
 * @param {number} threeX - Three.js x coordinate
 * @param {number} threeY - Three.js y coordinate
 * @param {number} threeZ - Three.js z coordinate
 * @returns {Object} Mathematical coordinates {x, y, z}
 */
export function threeJsToMath(threeX, threeY, threeZ) {
  return {
    x: -threeX,
    y: threeZ,
    z: threeY
  };
}

/**
 * Formats mathematical coordinates as a label string
 * 
 * @param {number} x - Mathematical x coordinate
 * @param {number} y - Mathematical y coordinate
 * @param {number} z - Mathematical z coordinate
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted label in (x/y/z) format
 */
export function formatCoordinateLabel(x, y, z, decimals = 0) {
  const round = (num) => parseFloat(num.toFixed(decimals));
  return `(${round(x)}/${round(y)}/${round(z)})`;
}

/**
 * Validates mathematical coordinates
 * 
 * @param {number} x - Mathematical x coordinate
 * @param {number} y - Mathematical y coordinate
 * @param {number} z - Mathematical z coordinate
 * @returns {boolean} True if all values are valid numbers
 */
export function isValidCoordinate(x, y, z) {
  return typeof x === 'number' && 
         typeof y === 'number' && 
         typeof z === 'number' &&
         isFinite(x) && 
         isFinite(y) && 
         isFinite(z);
}
