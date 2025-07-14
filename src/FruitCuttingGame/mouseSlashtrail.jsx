import { Assets, MeshRope, Point } from 'pixi.js';
import { bladSlashSound } from './audio';

const createMouseTrail = async (app) => {
  const trailTexture = await Assets.load('https://pixijs.com/assets/trail.png');

  const historyX = [];
  const historyY = [];

  const historySize = 20;// historySize determines how long the trail will be.
  const ropeSize = 100;// ropeSize determines how smooth the trail will be.
  const points = [];

  // Create history array.
  for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
  }

  // Create rope points.
  for (let i = 0; i < ropeSize; i++) {
    points.push(new Point(0, 0));
  }

  // Create the rope
  const rope = new MeshRope({ texture: trailTexture, points });
  rope.blendmode = 'add'; // Set the blendmode
  app.stage.addChild(rope);

  let mouseDown = false;
  let mousePosition = { x: 0, y: 0 };

  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  app.stage.on('pointerdown', (e) => {
    mouseDown = true;
    mousePosition.x = e.global.x;
    mousePosition.y = e.global.y;

    // reset trail history so trail appears immediately at start
    for (let i = 0; i < historySize; i++) {
      historyX[i] = mousePosition.x;
      historyY[i] = mousePosition.y;
    }
  });

  app.stage.on('pointerup', () => {
    mouseDown = false;
    // Optionally, clear trail on release
    for (let i = 0; i < ropeSize; i++) {
      points[i].x = -9999;
      points[i].y = -9999;
    }
  });

app.stage.on('pointermove', (event) => {
  if (!mouseDown) return;

  // Play blade sound only during drag
  if (!bladSlashSound.playing()) {
    bladSlashSound.play();
  }

  mousePosition.x = event.global.x;
  mousePosition.y = event.global.y;
});

  app.ticker.add(() => {
    if (!mouseDown) return;

    historyX.pop();
    historyX.unshift(mousePosition.x);
    historyY.pop();
    historyY.unshift(mousePosition.y);

    for (let i = 0; i < ropeSize; i++) {
      const p = points[i];
      const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
      const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);
      p.x = ix;
      p.y = iy;
    }
  });

  function clipInput(k, arr) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
  }

  function getTangent(k, factor, array) {
    return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;
  }

  function cubicInterpolation(array, t, tangentFactor = 1) {
    const k = Math.floor(t);
    const m = [
      getTangent(k, tangentFactor, array),
      getTangent(k + 1, tangentFactor, array)
    ];
    const p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (
      (2 * t3 - 3 * t2 + 1) * p[0] +
      (t3 - 2 * t2 + t) * m[0] +
      (-2 * t3 + 3 * t2) * p[1] +
      (t3 - t2) * m[1]
    );
  }
}
export default createMouseTrail
