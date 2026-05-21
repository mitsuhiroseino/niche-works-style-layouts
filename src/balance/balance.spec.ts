import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-balance--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-balance > *');
};

const CHILD_SIZE = 200;
const CHILD_COUNT = 3;
const CHILDREN_SIZE = CHILD_SIZE * CHILD_COUNT;
const GAP_SIZE = 20;

type Rect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

const getRects = (page: Page): Promise<{ container: Rect; children: Rect[] }> =>
  page.evaluate(() => {
    const toPlain = (
      r: DOMRect,
    ): {
      top: number;
      right: number;
      bottom: number;
      left: number;
      width: number;
      height: number;
    } => ({
      top: r.top,
      right: r.right,
      bottom: r.bottom,
      left: r.left,
      width: r.width,
      height: r.height,
    });
    const container = document.querySelector('.nws-layout-balance')!;
    const children = Array.from(container.querySelectorAll(':scope > *'));
    return {
      container: toPlain(container.getBoundingClientRect()),
      children: children.map((el) => toPlain(el.getBoundingClientRect())),
    };
  });

const getChildRects = (page: Page) =>
  page.locator('.nws-layout-balance > *').evaluateAll((els) =>
    els.map((el) => {
      const rect = el.getBoundingClientRect();
      return { left: rect.left, right: rect.right, width: rect.width };
    }),
  );

const getChildYRects = (page: Page) =>
  page.locator('.nws-layout-balance > *').evaluateAll((els) =>
    els.map((el) => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom, height: rect.height };
    }),
  );

const expectEvenlySpacedX = (
  rects: { left: number; right: number; width: number }[],
) => {
  if (rects.length < 2) return;
  const gaps = rects.slice(1).map((rect, i) => rect.left - rects[i].right);
  const firstGap = gaps[0];
  gaps.forEach((gap) => expect(gap).toBeCloseTo(firstGap, 0));
};

const expectEvenlySpacedY = (
  rects: { top: number; bottom: number; height: number }[],
) => {
  if (rects.length < 2) return;
  const gaps = rects.slice(1).map((rect, i) => rect.top - rects[i].bottom);
  const firstGap = gaps[0];
  gaps.forEach((gap) => expect(gap).toBeCloseTo(firstGap, 0));
};

// ===== direction:x adjustX =====

test.describe('balance - direction:x adjustX', () => {
  test.describe('none', () => {
    test('親幅 > 子合計: 子サイズ維持で均等配置', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 300, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const rects = await getChildRects(page);
      rects.forEach((r) => expect(r.width).toBeCloseTo(CHILD_SIZE, 0));
      expectEvenlySpacedX(rects);
    });

    test('親幅 < 子合計: はみ出す（子サイズ維持）', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const rects = await getChildRects(page);
      rects.forEach((r) => expect(r.width).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('grow', () => {
    test('親幅 > 子合計: 子サイズを伸ばして均等配置', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 300, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const rects = await getChildRects(page);
      rects.forEach((r) => expect(r.width).toBeGreaterThan(CHILD_SIZE));
      expectEvenlySpacedX(rects);
    });

    test('親幅 < 子合計: childSizeのまま均等配置', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const rects = await getChildRects(page);
      rects.forEach((r) => expect(r.width).toBeCloseTo(CHILD_SIZE, 0));
      expectEvenlySpacedX(rects);
    });
  });

  test.describe('shrink', () => {
    test('親幅 > 子合計: 子サイズ維持で均等配置', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 300, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const rects = await getChildRects(page);
      rects.forEach((r) => expect(r.width).toBeCloseTo(CHILD_SIZE, 0));
      expectEvenlySpacedX(rects);
    });

    test('親幅 < 子合計: 子サイズを縮めて均等配置', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const rects = await getChildRects(page);
      rects.forEach((r) => expect(r.width).toBeLessThan(CHILD_SIZE));
      expectEvenlySpacedX(rects);
    });
  });

  test.describe('fit', () => {
    test('親幅 > 子合計: 子サイズを伸ばして均等配置', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 300, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const rects = await getChildRects(page);
      rects.forEach((r) => expect(r.width).toBeGreaterThan(CHILD_SIZE));
      expectEvenlySpacedX(rects);
    });

    test('親幅 < 子合計: 子サイズを縮めて均等配置', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const rects = await getChildRects(page);
      rects.forEach((r) => expect(r.width).toBeLessThan(CHILD_SIZE));
      expectEvenlySpacedX(rects);
    });
  });
});

// ===== direction:y adjustY =====

test.describe('balance - direction:y adjustY', () => {
  test.describe('none', () => {
    test('親高さ > 子合計: 子サイズ維持で均等配置', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 300 });
      await gotoStory(page, 'direction-y-adjust-y-none');
      const rects = await getChildYRects(page);
      rects.forEach((r) => expect(r.height).toBeCloseTo(CHILD_SIZE, 0));
      expectEvenlySpacedY(rects);
    });

    test('親高さ < 子合計: はみ出す（子サイズ維持）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-none');
      const rects = await getChildYRects(page);
      rects.forEach((r) => expect(r.height).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('grow', () => {
    test('親高さ > 子合計: 子サイズを伸ばして均等配置', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 300 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const rects = await getChildYRects(page);
      rects.forEach((r) => expect(r.height).toBeGreaterThan(CHILD_SIZE));
      expectEvenlySpacedY(rects);
    });

    test('親高さ < 子合計: childSizeのまま均等配置', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const rects = await getChildYRects(page);
      rects.forEach((r) => expect(r.height).toBeCloseTo(CHILD_SIZE, 0));
      expectEvenlySpacedY(rects);
    });
  });

  test.describe('shrink', () => {
    test('親高さ > 子合計: 子サイズ維持で均等配置', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 300 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const rects = await getChildYRects(page);
      rects.forEach((r) => expect(r.height).toBeCloseTo(CHILD_SIZE, 0));
      expectEvenlySpacedY(rects);
    });

    test('親高さ < 子合計: 子サイズを縮めて均等配置', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const rects = await getChildYRects(page);
      rects.forEach((r) => expect(r.height).toBeLessThan(CHILD_SIZE));
      expectEvenlySpacedY(rects);
    });
  });

  test.describe('fit', () => {
    test('親高さ > 子合計: 子サイズを伸ばして均等配置', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 300 });
      await gotoStory(page, 'direction-y-adjust-y-fit');
      const rects = await getChildYRects(page);
      rects.forEach((r) => expect(r.height).toBeGreaterThan(CHILD_SIZE));
      expectEvenlySpacedY(rects);
    });

    test('親高さ < 子合計: 子サイズを縮めて均等配置', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-fit');
      const rects = await getChildYRects(page);
      rects.forEach((r) => expect(r.height).toBeLessThan(CHILD_SIZE));
      expectEvenlySpacedY(rects);
    });
  });
});

// ===== direction:x alignY（交差軸・個別アイテムの縦位置） =====

test.describe('balance - direction:x alignY', () => {
  test('top: 各子要素が上端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-y-top');
    const { container, children } = await getRects(page);
    children.forEach((c) => expect(c.top).toBeCloseTo(container.top, 0));
  });

  test('middle: 各子要素が縦方向中央に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-y-middle');
    const { container, children } = await getRects(page);
    children.forEach((c) => {
      const childMidY = (c.top + c.bottom) / 2;
      const containerMidY = (container.top + container.bottom) / 2;
      expect(Math.abs(childMidY - containerMidY)).toBeLessThan(2);
    });
  });

  test('bottom: 各子要素が下端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-y-bottom');
    const { container, children } = await getRects(page);
    children.forEach((c) => expect(c.bottom).toBeCloseTo(container.bottom, 0));
  });
});

// ===== direction:y alignX（交差軸・個別アイテムの横位置） =====

test.describe('balance - direction:y alignX', () => {
  test('left: 各子要素が左端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-align-x-left');
    const { container, children } = await getRects(page);
    children.forEach((c) => expect(c.left).toBeCloseTo(container.left, 0));
  });

  test('center: 各子要素が横方向中央に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-align-x-center');
    const { container, children } = await getRects(page);
    children.forEach((c) => {
      const childMidX = (c.left + c.right) / 2;
      const containerMidX = (container.left + container.right) / 2;
      expect(Math.abs(childMidX - containerMidX)).toBeLessThan(2);
    });
  });

  test('right: 各子要素が右端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-align-x-right');
    const { container, children } = await getRects(page);
    children.forEach((c) => expect(c.right).toBeCloseTo(container.right, 0));
  });
});

// ===== gap =====

test.describe('balance - gapX', () => {
  test('childSizeあり: 子要素がchildSizeを維持し余白が均等に配分される', async ({
    page,
  }) => {
    await page.setViewportSize({ width: CHILDREN_SIZE + 300, height: 800 });
    await gotoStory(page, 'direction-x-gap-x');
    const rects = await getChildRects(page);
    rects.forEach((r) => expect(r.width).toBeCloseTo(CHILD_SIZE, 0));
    expectEvenlySpacedX(rects);
  });

  test('childSizeなし: 隣接する子要素の横間隔が gapX と一致する', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-gap-x-without-size');
    const { children } = await getRects(page);
    for (let i = 1; i < children.length; i++) {
      const gap = children[i].left - children[i - 1].right;
      expect(gap).toBeCloseTo(GAP_SIZE, 0);
    }
  });
});

test.describe('balance - gapY', () => {
  test('childSizeあり: 子要素がchildSizeを維持し余白が均等に配分される', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 300 });
    await gotoStory(page, 'direction-y-gap-y');
    const rects = await getChildYRects(page);
    rects.forEach((r) => expect(r.height).toBeCloseTo(CHILD_SIZE, 0));
    expectEvenlySpacedY(rects);
  });

  test('childSizeなし: 隣接する子要素の縦間隔が gapY と一致する', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-gap-y-without-size');
    const { children } = await getRects(page);
    for (let i = 1; i < children.length; i++) {
      const gap = children[i].top - children[i - 1].bottom;
      expect(gap).toBeCloseTo(GAP_SIZE, 0);
    }
  });
});

// ===== childRatio =====

test.describe('balance - childRatio', () => {
  test('direction:x: childRatioX=1,childRatioY=1 のとき子要素が正方形になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-child-ratio');
    const { children } = await getRects(page);
    children.forEach((c) => expect(c.height / c.width).toBeCloseTo(1, 1));
  });
});
