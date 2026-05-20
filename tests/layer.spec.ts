// tests/layer/layer.spec.ts
import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=test-layer--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-layer > *');
};

const CHILD_SIZE = 200;

const getChildRect = (page: Page) =>
  page.locator('.nws-layout-layer > *').first().evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    };
  });

const getChildRects = (page: Page) =>
  page.locator('.nws-layout-layer > *').evaluateAll((els) =>
    els.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    }),
  );

const getContainerRect = (page: Page) =>
  page.locator('.nws-layout-layer').evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    };
  });

// --- 重ね合わせ ---

test.describe('layer - 重ね合わせ', () => {
  test('全子要素が同じ位置に重なって配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'stacking');
    const rects = await getChildRects(page);
    const first = rects[0];
    rects.forEach((rect) => {
      expect(rect.left).toBeCloseTo(first.left, 0);
      expect(rect.top).toBeCloseTo(first.top, 0);
      expect(rect.width).toBeCloseTo(first.width, 0);
      expect(rect.height).toBeCloseTo(first.height, 0);
    });
  });
});

// --- alignX ---

test.describe('layer - alignX', () => {
  test('left: 子要素が左端に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-x-left');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.left).toBeCloseTo(container.left, 0);
  });

  test('center: 子要素が横方向で中央に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-x-center');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    const childMidX = (child.left + child.right) / 2;
    const containerMidX = (container.left + container.right) / 2;
    expect(childMidX).toBeCloseTo(containerMidX, 0);
  });

  test('right: 子要素が右端に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-x-right');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.right).toBeCloseTo(container.right, 0);
  });
});

// --- alignY ---

test.describe('layer - alignY', () => {
  test('top: 子要素が上端に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-y-top');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.top).toBeCloseTo(container.top, 0);
  });

  test('middle: 子要素が縦方向で中央に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-y-middle');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    const childMidY = (child.top + child.bottom) / 2;
    const containerMidY = (container.top + container.bottom) / 2;
    expect(childMidY).toBeCloseTo(containerMidY, 0);
  });

  test('bottom: 子要素が下端に配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'align-y-bottom');
    const child = await getChildRect(page);
    const container = await getContainerRect(page);
    expect(child.bottom).toBeCloseTo(container.bottom, 0);
  });
});

// --- adjustX ---

test.describe('layer - adjustX', () => {
  test.describe('grow', () => {
    test('親幅 > childSize: 親幅まで広がる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-x-grow');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.width).toBeGreaterThanOrEqual(CHILD_SIZE);
      expect(child.width).toBeCloseTo(container.width, 0);
    });

    test('親幅 < childSize: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 100, height: 600 });
      await gotoStory(page, 'adjust-x-grow');
      const child = await getChildRect(page);
      expect(child.width).toBeCloseTo(CHILD_SIZE, 0);
    });
  });

  test.describe('shrink', () => {
    test('親幅 > childSize: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-x-shrink');
      const child = await getChildRect(page);
      expect(child.width).toBeCloseTo(CHILD_SIZE, 0);
    });

    test('親幅 < childSize: 親幅に合わせて縮む', async ({ page }) => {
      await page.setViewportSize({ width: 100, height: 600 });
      await gotoStory(page, 'adjust-x-shrink');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.width).toBeLessThan(CHILD_SIZE);
      expect(child.width).toBeCloseTo(container.width, 0);
    });
  });

  test.describe('fit', () => {
    test('親幅 > childSize: 親幅まで広がる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-x-fit');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.width).toBeCloseTo(container.width, 0);
    });

    test('親幅 < childSize: 親幅に合わせて縮む', async ({ page }) => {
      await page.setViewportSize({ width: 100, height: 600 });
      await gotoStory(page, 'adjust-x-fit');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.width).toBeCloseTo(container.width, 0);
    });
  });
});

// --- adjustY ---

test.describe('layer - adjustY', () => {
  test.describe('grow', () => {
    test('親高さ > childSize: 親高さまで広がる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-y-grow');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.height).toBeGreaterThanOrEqual(CHILD_SIZE);
      expect(child.height).toBeCloseTo(container.height, 0);
    });

    test('親高さ < childSize: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 100 });
      await gotoStory(page, 'adjust-y-grow');
      const child = await getChildRect(page);
      expect(child.height).toBeCloseTo(CHILD_SIZE, 0);
    });
  });

  test.describe('shrink', () => {
    test('親高さ > childSize: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-y-shrink');
      const child = await getChildRect(page);
      expect(child.height).toBeCloseTo(CHILD_SIZE, 0);
    });

    test('親高さ < childSize: 親高さに合わせて縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 100 });
      await gotoStory(page, 'adjust-y-shrink');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.height).toBeLessThan(CHILD_SIZE);
      expect(child.height).toBeCloseTo(container.height, 0);
    });
  });

  test.describe('fit', () => {
    test('親高さ > childSize: 親高さまで広がる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await gotoStory(page, 'adjust-y-fit');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.height).toBeCloseTo(container.height, 0);
    });

    test('親高さ < childSize: 親高さに合わせて縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 100 });
      await gotoStory(page, 'adjust-y-fit');
      const child = await getChildRect(page);
      const container = await getContainerRect(page);
      expect(child.height).toBeCloseTo(container.height, 0);
    });
  });
});
