// tests/tile/tile.spec.ts
import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=test-tile--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-tile > *');
};

const CHILD_SIZE = 200;

const getChildWidths = (page: Page) =>
  page
    .locator('.nws-layout-tile > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));

const getChildHeights = (page: Page) =>
  page
    .locator('.nws-layout-tile > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));

test.describe('tile - adjustX', () => {
  test.describe('grow', () => {
    test('親幅 > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE + 200, height: 800 });
      await gotoStory(page, 'adjust-x-grow-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThanOrEqual(CHILD_SIZE));
    });

    test('親幅 < childSize: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE - 50, height: 800 });
      await gotoStory(page, 'adjust-x-grow-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 > childSize: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE + 200, height: 800 });
      await gotoStory(page, 'adjust-x-shrink-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE - 50, height: 800 });
      await gotoStory(page, 'adjust-x-shrink-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE + 200, height: 800 });
      await gotoStory(page, 'adjust-x-fit-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThanOrEqual(CHILD_SIZE));
    });

    test('親幅 < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE - 50, height: 800 });
      await gotoStory(page, 'adjust-x-fit-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('none', () => {
    test('親幅 > childSize: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE + 200, height: 800 });
      await gotoStory(page, 'adjust-x-none-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < childSize: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE - 50, height: 800 });
      await gotoStory(page, 'adjust-x-none-with-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });
});

test.describe('tile - adjustY', () => {
  test.describe('grow', () => {
    test('親高さ > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE + 200 });
      await gotoStory(page, 'adjust-y-grow-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThanOrEqual(CHILD_SIZE));
    });

    test('親高さ < childSize: childSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE - 50 });
      await gotoStory(page, 'adjust-y-grow-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ > childSize: childSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE + 200 });
      await gotoStory(page, 'adjust-y-shrink-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親高さ < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE - 50 });
      await gotoStory(page, 'adjust-y-shrink-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親高さ > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE + 200 });
      await gotoStory(page, 'adjust-y-fit-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThanOrEqual(CHILD_SIZE));
    });

    test('親高さ < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE - 50 });
      await gotoStory(page, 'adjust-y-fit-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('none', () => {
    test('親高さ > childSize: childSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE + 200 });
      await gotoStory(page, 'adjust-y-none-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親高さ < childSize: childSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE - 50 });
      await gotoStory(page, 'adjust-y-none-with-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });
  });
});
