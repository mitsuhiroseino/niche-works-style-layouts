// tests/stack/stack.spec.ts
import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=test-stack--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-stack > *');
};

const CHILD_SIZE = 200;
const CHILD_COUNT = 3;
const CHILDREN_SIZE = CHILD_SIZE * CHILD_COUNT;

const getChildWidths = (page: Page) =>
  page
    .locator('.nws-layout-stack > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));

const getChildHeights = (page: Page) =>
  page
    .locator('.nws-layout-stack > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));

test.describe('stack - direction:x 主軸(adjustX)', () => {
  test.describe('grow', () => {
    test('親幅 > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThanOrEqual(CHILD_SIZE));
    });

    test('親幅 < childSize: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親幅 > childSize: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親幅 > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(CHILD_SIZE));
    });

    test('親幅 < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-fit');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('none', () => {
    test('親幅 > childSize: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < childSize: childSizeのまま（縮まない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-none');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });
});

test.describe('stack - direction:x 交差軸(adjustY)', () => {
  test.describe('grow', () => {
    test('親高さ > 子要素の自然な高さ: 親高さに合わせて伸びる', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: 400 });
      await gotoStory(page, 'direction-x-adjust-y-grow');
      const heights = await getChildHeights(page);
      // 全子要素の高さが揃っていることを確認
      const first = heights[0];
      heights.forEach((h) => expect(h).toBeCloseTo(first, 0));
      expect(first).toBeGreaterThan(0);
    });
  });

  test.describe('shrink', () => {
    test('親高さ < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE - 50 });
      await gotoStory(page, 'direction-x-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThanOrEqual(CHILD_SIZE));
    });

    test('親高さ > childSize: childSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-x-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('fit', () => {
    test('親高さに合わせて伸縮する', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 400 });
      await gotoStory(page, 'direction-x-adjust-y-fit');
      const heights = await getChildHeights(page);
      const first = heights[0];
      heights.forEach((h) => expect(h).toBeCloseTo(first, 0));
      expect(first).toBeGreaterThan(0);
    });
  });

  test.describe('none', () => {
    test('親高さに関わらず子要素の自然な高さのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-x-adjust-y-none');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });
  });
});

test.describe('stack - direction:y 主軸(adjustY) 代表パターン', () => {
  test.describe('grow', () => {
    test('親高さ > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThanOrEqual(CHILD_SIZE));
    });

    test('親高さ < childSize: childSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });
  });

  test.describe('shrink', () => {
    test('親高さ > childSize: childSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親高さ < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThanOrEqual(CHILD_SIZE));
    });
  });
});
