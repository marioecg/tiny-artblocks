import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.js";      

import { WebGLRenderer, PerspectiveCamera, Scene, Mesh, BoxGeometry, MeshNormalMaterial } from './util/three.module';

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('#000', 1);

  // Setup a camera
  const camera = new PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(2, 2, 4);

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new Scene();

  const mesh = new Mesh(
    new BoxGeometry(1),
    new MeshNormalMaterial()
  );
  
  scene.add(mesh);

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // And render events here
    render ({ time, deltaTime }) {
      mesh.rotation.y = time * (10 * Math.PI / 180);
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload () {
      renderer.dispose();
    }
  };
};