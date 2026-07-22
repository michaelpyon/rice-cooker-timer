export async function scenario(page) {
  await page.waitForFunction(() => typeof startCooking === 'function');
  await page.click('#startBtn');

  const result = await page.evaluate(() => {
    const rotations = [];
    const streams = [];
    const grainsSeen = [];
    const originalRotate = ctx.rotate.bind(ctx);
    const originalStream = drawWaterStream;
    const originalSpawnGrain = spawnGrain;

    ctx.rotate = angle => {
      rotations.push(angle);
      return originalRotate(angle);
    };
    drawWaterStream = (x, y1, y2) => {
      streams.push({ x, y1, y2 });
      return originalStream(x, y1, y2);
    };
    spawnGrain = (x, y) => {
      grainsSeen.push({ x, y });
      return originalSpawnGrain(x, y);
    };

    animState = 'pour_rice';
    animStart = performance.now() - 1400;
    animFrame = 3;
    updateAnimation();
    draw();
    const rice = {
      state: animState,
      cupX,
      cupY,
      rotation: rotations.at(-1) || 0,
      grain: grainsSeen.at(-1) || null,
    };

    animState = 'pour_water';
    animStart = performance.now() - 1400;
    updateAnimation();
    draw();
    const water = {
      state: animState,
      jugX,
      jugY,
      rotation: rotations.at(-1) || 0,
      stream: streams.at(-1) || null,
    };

    ctx.rotate = originalRotate;
    drawWaterStream = originalStream;
    spawnGrain = originalSpawnGrain;
    return { rice, water };
  });

  if (result.rice.rotation < 0.8) {
    throw new Error(`Rice cup did not visibly tip: ${JSON.stringify(result.rice)}`);
  }
  if (!result.rice.grain || result.rice.grain.y >= result.rice.cupY + 8) {
    throw new Error(`Rice does not originate at the cup lip: ${JSON.stringify(result.rice)}`);
  }
  if (result.water.rotation < 0.8) {
    throw new Error(`Water jug did not visibly tip: ${JSON.stringify(result.water)}`);
  }
  if (!result.water.stream || result.water.stream.y1 >= result.water.jugY + 8) {
    throw new Error(`Water does not originate at the jug lip: ${JSON.stringify(result.water)}`);
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await page.waitForFunction(() => typeof startCooking === 'function');
  await page.click('#startBtn');
  const reduced = await page.evaluate(() => {
    const rotations = [];
    const originalRotate = ctx.rotate.bind(ctx);
    ctx.rotate = angle => {
      rotations.push(angle);
      return originalRotate(angle);
    };
    animState = 'pour_rice';
    animStart = performance.now() - 252;
    animFrame = 3;
    updateAnimation();
    draw();
    ctx.rotate = originalRotate;
    return { reducedMotion, rotation: rotations.at(-1) || 0 };
  });
  if (!reduced.reducedMotion || reduced.rotation < 0.8) {
    throw new Error(`Reduced-motion pour lost the tipped pose: ${JSON.stringify(reduced)}`);
  }

  return { ...result, reduced };
}
