import * as random from "./util/random";
import { Lch } from "./util/color";

import { Renderer, Program, Camera, Orbit, Transform, Mesh, Plane } from './util/ogl';

export default (hash) => {
  // You may want to remove this line for production
  console.log(hash);

  // set the shared PRNG to new seed
  random.set_seed(hash);

  return (context, width, height) => {
    const dim = Math.min(width, height);

    const renderer = new Renderer({ canvas: context.canvas });    
    renderer.setSize(width, height);

    const camera = new Camera(context, { fov: 35 });
    camera.position.set(0, 0, 5);    
    const controls = new Orbit(camera);

    const scene = new Transform();

    const geometry = new Plane(context);

    const program = new Program(context, {
      vertex: /* glsl */`
        attribute vec2 uv;
        attribute vec3 position;
        attribute vec3 normal;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normal;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }        
      `,

      fragment: /* glsl */`
        precision highp float;
        
        varying vec3 vNormal;
        
        void main() {
          vec3 normal = normalize(vNormal);
          float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));

          gl_FragColor.rgb = vec3(0.2, 0.8, 1.0) + lighting * 0.1;
          gl_FragColor.a = 1.0;
        }      
      `,

      uniforms: {
        uTime: { value: 0 },
      },
    }); 
    
    const mesh = new Mesh(context, { geometry, program });
    mesh.setParent(scene);

    const resize = (width, height) => {
      renderer.setSize(width, height);
      
      this.camera.perspective({
        aspect: context.canvas.width / context.canvas.height,
      });
    }

    const update = () => {
      requestAnimationFrame(update);

      controls.update();
      
      renderer.render({ scene, camera });
    }    
    requestAnimationFrame(update);
  };
};
