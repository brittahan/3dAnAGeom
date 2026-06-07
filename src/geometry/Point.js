import * as THREE from 'three';
import { mathToThreeJs, formatCoordinateLabel, isValidCoordinate } from '../coordinateSystem.js';

/**
 * Point3D represents a point in 3D mathematical space
 * 
 * Uses mathematical coordinates (x/y/z):
 * - x: positive toward viewer, negative away
 * - y: positive right, negative left
 * - z: positive up, negative down
 */
export class Point3D {
  constructor(mathX, mathY, mathZ, options = {}) {
    if (!isValidCoordinate(mathX, mathY, mathZ)) {
      throw new Error(`Invalid coordinates: (${mathX}, ${mathY}, ${mathZ})`);
    }

    // Store mathematical coordinates
    this.mathX = mathX;
    this.mathY = mathY;
    this.mathZ = mathZ;

    // Default options
    this.color = options.color || 0xff0000; // Red by default
    this.size = options.size || 0.1;
    this.decimals = options.decimals || 0;
    this.labelVisible = options.labelVisible !== false; // Show label by default

    // Three.js objects
    this.mesh = null;
    this.labelCanvas = null;
    this.labelTexture = null;
    this.labelSprite = null;

    this._createVisuals();
  }

  /**
   * Creates the visual representation of the point
   * @private
   */
  _createVisuals() {
    // Convert to Three.js coordinates
    const threeCoords = mathToThreeJs(this.mathX, this.mathY, this.mathZ);

    // Create sphere geometry for the point
    const geometry = new THREE.SphereGeometry(this.size, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(threeCoords.x, threeCoords.y, threeCoords.z);

    // Create label sprite
    if (this.labelVisible) {
      this._createLabel();
    }
  }

  /**
   * Creates a canvas-based text label for the point
   * @private
   */
  _createLabel() {
    const labelText = formatCoordinateLabel(this.mathX, this.mathY, this.mathZ, this.decimals);

    // Create canvas for text rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontSize = 32;

    canvas.width = 512;
    canvas.height = 256;

    // Clear canvas
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text background (white box)
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.fillRect(20, 60, 470, 140);

    // Draw text
    context.font = `bold ${fontSize}px Arial`;
    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(labelText, canvas.width / 2, canvas.height / 2);

    // Create texture and sprite
    this.labelTexture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: this.labelTexture });
    this.labelSprite = new THREE.Sprite(spriteMaterial);

    // Position label above the point
    const offset = this.size + 0.3;
    this.labelSprite.position.copy(this.mesh.position);
    this.labelSprite.position.y += offset;
    this.labelSprite.scale.set(2, 1, 1);
  }

  /**
   * Gets all Three.js objects for this point
   * @returns {THREE.Object3D[]} Array of mesh and label sprite
   */
  getObjects() {
    const objects = [this.mesh];
    if (this.labelSprite) {
      objects.push(this.labelSprite);
    }
    return objects;
  }

  /**
   * Updates the point's position (mathematical coordinates)
   * 
   * @param {number} newX - New x coordinate
   * @param {number} newY - New y coordinate
   * @param {number} newZ - New z coordinate
   */
  setPosition(newX, newY, newZ) {
    if (!isValidCoordinate(newX, newY, newZ)) {
      throw new Error(`Invalid coordinates: (${newX}, ${newY}, ${newZ})`);
    }

    this.mathX = newX;
    this.mathY = newY;
    this.mathZ = newZ;

    const threeCoords = mathToThreeJs(newX, newY, newZ);
    this.mesh.position.set(threeCoords.x, threeCoords.y, threeCoords.z);

    if (this.labelSprite) {
      const offset = this.size + 0.3;
      this.labelSprite.position.copy(this.mesh.position);
      this.labelSprite.position.y += offset;
      
      // Update label text
      this._updateLabelTexture();
    }
  }

  /**
   * Updates the label texture with new text
   * @private
   */
  _updateLabelTexture() {
    if (!this.labelTexture) return;

    const labelText = formatCoordinateLabel(this.mathX, this.mathY, this.mathZ, this.decimals);
    const canvas = this.labelTexture.image;
    const context = canvas.getContext('2d');
    const fontSize = 32;

    // Clear canvas
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.fillRect(20, 60, 470, 140);

    // Draw text
    context.font = `bold ${fontSize}px Arial`;
    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(labelText, canvas.width / 2, canvas.height / 2);

    this.labelTexture.needsUpdate = true;
  }

  /**
   * Changes the point's color
   * 
   * @param {number} hexColor - Color in hex format (e.g., 0xff0000 for red)
   */
  setColor(hexColor) {
    this.color = hexColor;
    if (this.mesh && this.mesh.material) {
      this.mesh.material.color.setHex(hexColor);
    }
  }

  /**
   * Gets the mathematical coordinates
   * @returns {Object} Coordinates as {x, y, z}
   */
  getCoordinates() {
    return { x: this.mathX, y: this.mathY, z: this.mathZ };
  }

  /**
   * Gets the label string
   * @returns {string} Formatted coordinate label
   */
  getLabel() {
    return formatCoordinateLabel(this.mathX, this.mathY, this.mathZ, this.decimals);
  }
}
