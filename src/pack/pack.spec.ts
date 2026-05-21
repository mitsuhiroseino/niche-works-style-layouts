import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-pack--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-pack > *');
};

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
    const container = document.querySelector('.nws-layout-pack')!;
    const children = Array.from(container.querySelectorAll(':scope > *'));
    return {
      container: toPlain(container.getBoundingClientRect()),
      children: children.map((el) => toPlain(el.getBoundingClientRect())),
    };
  });

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

// ===== direction:x =====

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

// ===== direction:y =====

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

// ===== gap =====

test.describe('pack - gapX', () => {
  test('隣接する子要素の横間隔が gapX と一致する', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-gap-x');
    const { children } = await getRects(page);
    for (let i = 1; i < children.length; i++) {
      const gap = children[i].left - children[i - 1].right;
      expect(gap).toBeCloseTo(GAP_SIZE, 0);
    }
  });
});

test.describe('pack - gapY', () => {
  test('隣接する子要素の縦間隔が gapY と一致する', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await gotoStory(page, 'direction-y-gap-y');
    const { children } = await getRects(page);
    for (let i = 1; i < children.length; i++) {
      const gap = children[i].top - children[i - 1].bottom;
      expect(gap).toBeCloseTo(GAP_SIZE, 0);
    }
  });
});
