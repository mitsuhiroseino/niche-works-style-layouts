import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=test-pack--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-pack > *');
};

const CHILD_COUNT = 3;

const getChildRects = (page: Page) =>
  page.locator('.nws-layout-pack > *').evaluateAll((els) =>
    els.map((el) => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    }),
  );

const getContainerRect = (page: Page) =>
  page.locator('.nws-layout-pack').evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });

test.describe('pack - direction:x', () => {
  test('子要素の幅の合計が親幅と一致する', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 600 });
    await gotoStory(page, 'direction-x');
    const rects = await getChildRects(page);
    const container = await getContainerRect(page);
    const totalWidth = rects.reduce((sum, r) => sum + r.width, 0);
    expect(totalWidth).toBeCloseTo(container.width, 0);
  });

  test('子要素の幅が均等である', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 600 });
    await gotoStory(page, 'direction-x');
    const rects = await getChildRects(page);
    const firstWidth = rects[0].width;
    rects.forEach((r) => expect(r.width).toBeCloseTo(firstWidth, 0));
  });

  test('親幅が変わっても子要素の幅の合計が親幅と一致する', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 600 });
    await gotoStory(page, 'direction-x');
    const rects = await getChildRects(page);
    const container = await getContainerRect(page);
    const totalWidth = rects.reduce((sum, r) => sum + r.width, 0);
    expect(totalWidth).toBeCloseTo(container.width, 0);
  });
});

test.describe('pack - direction:y', () => {
  test('子要素の高さの合計が親高さと一致する', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 900 });
    await gotoStory(page, 'direction-y');
    const rects = await getChildRects(page);
    const container = await getContainerRect(page);
    const totalHeight = rects.reduce((sum, r) => sum + r.height, 0);
    expect(totalHeight).toBeCloseTo(container.height, 0);
  });

  test('子要素の高さが均等である', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 900 });
    await gotoStory(page, 'direction-y');
    const rects = await getChildRects(page);
    const firstHeight = rects[0].height;
    rects.forEach((r) => expect(r.height).toBeCloseTo(firstHeight, 0));
  });

  test('親高さが変わっても子要素の高さの合計が親高さと一致する', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y');
    const rects = await getChildRects(page);
    const container = await getContainerRect(page);
    const totalHeight = rects.reduce((sum, r) => sum + r.height, 0);
    expect(totalHeight).toBeCloseTo(container.height, 0);
  });
});
