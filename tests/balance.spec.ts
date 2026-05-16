// tests/balance/balance.spec.ts
import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=test-balance--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-balance > *');
};

const CHILD_SIZE = 200;
const CHILD_COUNT = 3;
const CHILDREN_SIZE = CHILD_SIZE * CHILD_COUNT;

type Rect = { left: number; right: number; width: number };

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

const expectEvenlySpacedX = (rects: Rect[]) => {
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

test.describe('balance - direction:y adjustY 代表パターン', () => {
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
});
