import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=test-flow--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-flow > *');
};

const CHILD_SIZE = 200;
const CHILD_COUNT = 3;
const CHILDREN_SIZE = CHILD_SIZE * CHILD_COUNT;

const getChildWidths = (page: Page) =>
  page
    .locator('.nws-layout-flow > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));

const getChildHeights = (page: Page) =>
  page
    .locator('.nws-layout-flow > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));

test.describe('flow - direction:x 主軸(adjustX)', () => {
  test.describe('grow', () => {
    test('親幅 > 子合計: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThanOrEqual(CHILD_SIZE));
    });

    test('親幅 < childSize: 折り返し後もchildSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: CHILD_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 > 子合計: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 > 子合計: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(CHILD_SIZE));
    });

    test('親幅 < childSize: 折り返し後にchildSizeより縮む', async ({
      page,
    }) => {
      await page.setViewportSize({ width: CHILD_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('none', () => {
    test('親幅 > 子合計: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < childSize: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });
});

test.describe('flow - direction:x 交差軸', () => {
  test('childSizeあり: 子要素の高さがchildSizeのまま', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-cross-axis-with-size');
    const heights = await getChildHeights(page);
    heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
  });

  test('childSizeなし: 子要素の高さがコンテンツ高さのまま', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-cross-axis-without-size');
    const heights = await getChildHeights(page);
    heights.forEach((h) => {
      expect(h).toBeGreaterThan(0);
      expect(h).toBeLessThan(CHILD_SIZE);
    });
  });
});

test.describe('flow - direction:y 主軸(adjustY) 代表パターン', () => {
  test.describe('grow', () => {
    test('親高さ > 子合計: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThanOrEqual(CHILD_SIZE));
    });

    test('親高さ < childSize: 折り返し後もchildSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ > 子合計: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親高さ < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThanOrEqual(CHILD_SIZE));
    });
  });
});
