import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=test-matrix--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-matrix > *');
};

const CHILD_SIZE = 200;
const CHILD_COUNT = 3;
const TOTAL_SIZE = CHILD_SIZE * CHILD_COUNT; // 600px

const getChildWidths = (page: Page) =>
  page
    .locator('.nws-layout-matrix > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));

const CHILD_SIZE_Y = 200;
const CHILD_COUNT_Y = 3;
const TOTAL_SIZE_Y = CHILD_SIZE_Y * CHILD_COUNT_Y; // 600px

const getChildHeights = (page: Page) =>
  page
    .locator('.nws-layout-matrix > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));

const SPACING = 10;
const TOTAL_SIZE_X_WITH_SPACING =
  CHILD_SIZE * CHILD_COUNT + SPACING * (CHILD_COUNT - 1); // 620px
const TOTAL_SIZE_Y_WITH_SPACING =
  CHILD_SIZE_Y * CHILD_COUNT_Y + SPACING * (CHILD_COUNT_Y - 1); // 620px

test.describe('matrix - adjustX', () => {
  test.describe('grow', () => {
    test('親幅 = 子合計: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE, height: 600 });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 > 子合計: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE + 300, height: 600 });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(CHILD_SIZE));
    });

    test('親幅 < 子合計: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE - 300, height: 600 });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 = 子合計: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE, height: 600 });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 > 子合計: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE + 300, height: 600 });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < 子合計: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE - 300, height: 600 });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 = 子合計: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE, height: 600 });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 > 子合計: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE + 300, height: 600 });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(CHILD_SIZE));
    });

    test('親幅 < 子合計: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE - 300, height: 600 });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('none', () => {
    test('親幅 > 子合計: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE + 300, height: 600 });
      await gotoStory(page, 'adjust-x-none-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < 子合計: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: TOTAL_SIZE - 300, height: 600 });
      await gotoStory(page, 'adjust-x-none-with-count-and-size');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });
});

test.describe('matrix - adjustY', () => {
  test.describe('grow', () => {
    test('親高さ = 子合計: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });

    test('親高さ > 子合計: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y + 300 });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(CHILD_SIZE_Y));
    });

    test('親高さ < 子合計: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y - 300 });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ = 子合計: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });

    test('親高さ > 子合計: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y + 300 });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });

    test('親高さ < 子合計: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y - 300 });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(CHILD_SIZE_Y));
    });
  });

  test.describe('fit', () => {
    test('親高さ = 子合計: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });

    test('親高さ > 子合計: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y + 300 });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(CHILD_SIZE_Y));
    });

    test('親高さ < 子合計: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y - 300 });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(CHILD_SIZE_Y));
    });
  });

  test.describe('none', () => {
    test('親高さ > 子合計: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y + 300 });
      await gotoStory(page, 'adjust-y-none-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });

    test('親高さ < 子合計: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: TOTAL_SIZE_Y - 300 });
      await gotoStory(page, 'adjust-y-none-with-count-and-size');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });
  });
});

test.describe('matrix - adjustX with spacing', () => {
  test.describe('grow', () => {
    test('親幅 = 子合計 + spacing: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_X_WITH_SPACING,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size-and-spacing');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 > 子合計 + spacing: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_X_WITH_SPACING + 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size-and-spacing');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(CHILD_SIZE));
    });

    test('親幅 < 子合計 + spacing: childSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_X_WITH_SPACING - 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-grow-with-count-and-size-and-spacing');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 = 子合計 + spacing: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_X_WITH_SPACING,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size-and-spacing');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 > 子合計 + spacing: childSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_X_WITH_SPACING + 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size-and-spacing');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < 子合計 + spacing: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_X_WITH_SPACING - 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-shrink-with-count-and-size-and-spacing');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 = 子合計 + spacing: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_X_WITH_SPACING,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size-and-spacing');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 > 子合計 + spacing: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_X_WITH_SPACING + 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size-and-spacing');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(CHILD_SIZE));
    });

    test('親幅 < 子合計 + spacing: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({
        width: TOTAL_SIZE_X_WITH_SPACING - 300,
        height: 800,
      });
      await gotoStory(page, 'adjust-x-fit-with-count-and-size-and-spacing');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });
});

test.describe('matrix - adjustY with spacing', () => {
  test.describe('grow', () => {
    test('親高さ = 子合計 + spacing: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_Y_WITH_SPACING,
      });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size-and-spacing');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });

    test('親高さ > 子合計 + spacing: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_Y_WITH_SPACING + 300,
      });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size-and-spacing');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(CHILD_SIZE_Y));
    });

    test('親高さ < 子合計 + spacing: childSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_Y_WITH_SPACING - 300,
      });
      await gotoStory(page, 'adjust-y-grow-with-count-and-size-and-spacing');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ = 子合計 + spacing: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_Y_WITH_SPACING,
      });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size-and-spacing');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });

    test('親高さ > 子合計 + spacing: childSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_Y_WITH_SPACING + 300,
      });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size-and-spacing');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });

    test('親高さ < 子合計 + spacing: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_Y_WITH_SPACING - 300,
      });
      await gotoStory(page, 'adjust-y-shrink-with-count-and-size-and-spacing');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(CHILD_SIZE_Y));
    });
  });

  test.describe('fit', () => {
    test('親高さ = 子合計 + spacing: childSizeのまま', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_Y_WITH_SPACING,
      });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size-and-spacing');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE_Y, 0));
    });

    test('親高さ > 子合計 + spacing: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_Y_WITH_SPACING + 300,
      });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size-and-spacing');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(CHILD_SIZE_Y));
    });

    test('親高さ < 子合計 + spacing: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({
        width: 800,
        height: TOTAL_SIZE_Y_WITH_SPACING - 300,
      });
      await gotoStory(page, 'adjust-y-fit-with-count-and-size-and-spacing');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(CHILD_SIZE_Y));
    });
  });
});
