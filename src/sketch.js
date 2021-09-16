import * as random from "./util/random";

import { Renderer } from 'https://cdn.jsdelivr.net/npm/ogl@0.0.76/src/index.mjs';

export default (hash) => {
  // You may want to remove this line for production
  console.log(hash);

  // set the shared PRNG to new seed
  random.set_seed(hash);

  console.log(Renderer);

  return (context, width, height) => {
    const dim = Math.min(width, height);

    // 'contain' fit mode
    let scale = 1 >= width / height ? width : height;

    // 'cover' fit mode
    // let scale = 1 < width / height ? width : height;
  };
};
