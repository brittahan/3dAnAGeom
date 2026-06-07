import * as THREE from 'three';

/**
 * Scene3D manages the Three.js scene, camera, and rendering
 * 
 * Sets up a 3D environment with coordinate axes for mathematical visualization
 */
export class Scene3D {
  constructor(containerElement, width = null, height = null) {
    // Use container dimensions or window size
    this.width = width || containerElement.clientWidth || window.innerWidth;
    this.height = height || containerElement.clientHeight || window.innerHeight;
    this.container = containerElement;

    // Create Three.js scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfafafa);

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.set(10, 8, 10);
    this.camera.lookAt(0, 0, 0);

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // Add lighting
    this._setupLighting();

    // Add coordinate axes
    this._setupAxes();

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Start animation loop
    this.animate();
  }

  /**
   * Sets up scene lighting
   * @private
   */
  _setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 15, 10);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
  }

  /**
   * Sets up coordinate axes visualization
   * Mathematical convention:
   * - X-axis (red): positive toward viewer, negative away
   * - Y-axis (green): positive right, negative left
   * - Z-axis (blue): positive up, negative down
   * 
   * @private
   */
  _setupAxes() {
    const axisLength = 10;
    const arrowSize = 0.5;

    // X-axis (red) - mapped to negative Three.js x (toward viewer)
    const xDirection = new THREE.Vector3(-1, 0, 0);
    const xArrow = new THREE.ArrowHelper(xDirection, new THREE.Vector3(0, 0, 0), axisLength, 0xff0000, arrowSize, arrowSize * 0.6);
    this.scene.add(xArrow);

    // Y-axis (green) - mapped to Three.js z (horizontal)
    const yDirection = new THREE.Vector3(0, 0, 1);
    const yArrow = new THREE.ArrowHelper(yDirection, new THREE.Vector3(0, 0, 0), axisLength, 0x00ff00, arrowSize, arrowSize * 0.6);
    this.scene.add(yArrow);

    // Z-axis (blue) - mapped to Three.js y (vertical)
    const zDirection = new THREE.Vector3(0, 1, 0);
    const zArrow = new THREE.ArrowHelper(zDirection, new THREE.Vector3(0, 0, 0), axisLength, 0x0000ff, arrowSize, arrowSize * 0.6);
    this.scene.add(zArrow);

    // Add axis labels
    this._addAxisLabels();

    // Add grid
    this._addGrid();
  }

  /**
   * Adds text labels for axes
   * @private
   */
  _addAxisLabels() {
    const labelDistance = 11;

    // Function to create a text label
    const createLabel = (text, position, color) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 256;

      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = 'bold 64px Arial';
      context.fillStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(position);
      sprite.scale.set(2, 2, 1);

      return sprite;
    };

    // X-axis label (toward viewer, so negative Three.js x)
    this.scene.add(createLabel('X', new THREE.Vector3(-labelDistance, 0, 0), 'rgb(255, 0, 0)'));

    // Y-axis label (right, so positive Three.js z)
    this.scene.add(createLabel('Y', new THREE.Vector3(0, 0, labelDistance), 'rgb(0, 255, 0)'));

    // Z-axis label (up, so positive Three.js y)
    this.scene.add(createLabel('Z', new THREE.Vector3(0, labelDistance, 0), 'rgb(0, 0, 255)'));
  }

  /**
   * Adds a ground grid for reference
   * @private
   */
  _addGrid() {
    const gridHelper = new THREE.GridHelper(20, 20, 0xcccccc, 0xeeeeee);
    // Move grid to match coordinate system (at z=0 in Three.js, which is y=0 in math coords)
    gridHelper.position.y = 0;
    this.scene.add(gridHelper);
  }

  /**
   * Adds 3D objects to the scene
   * 
   * @param {THREE.Object3D|THREE.Object3D[]} objects - Object or array of objects to add
   */
  addObjects(objects) {
    if (Array.isArray(objects)) {
      objects.forEach(obj => this.scene.add(obj));
    } else {
      this.scene.add(objects);
    }
  }

  /**
   * Removes 3D objects from the scene
   * 
   * @param {THREE.Object3D|THREE.Object3D[]} objects - Object or array of objects to remove
   */
  removeObjects(objects) {
    if (Array.isArray(objects)) {
      objects.forEach(obj => this.scene.remove(obj));
    } else {
      this.scene.remove(objects);
    }
  }

  /**
   * Handles window resize events
   */
  onWindowResize() {
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());

    // Slowly rotate camera around the origin for better visibility
    // You can modify or remove this as needed
    const time = Date.now() * 0.0001;
    this.camera.position.x = Math.cos(time) * 15;
    this.camera.position.z = Math.sin(time) * 15;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Gets the scene object
   * @returns {THREE.Scene}
   */
  getScene() {
    return this.scene;
  }

  /**
   * Gets the camera object
   * @returns {THREE.Camera}
   */
  getCamera() {
    return this.camera;
  }

  /**
   * Gets the renderer object
   * @returns {THREE.WebGLRenderer}
   */
  getRenderer() {
    return this.renderer;
  }
}
