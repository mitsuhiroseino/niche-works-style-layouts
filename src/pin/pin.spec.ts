import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-pin--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-pin > *');
};

const getChildRects = (page: Page) =>
  page.locator('.nws-layout-pin > *').evaluateAll((els) =>
    els.map((el) => {
      const rect = el.getBoundingClientRect();
      const parent = el.parentElement!.getBoundingClientRect();
      return {
        left: rect.left - parent.left,
        top: rect.top - parent.top,
        width: rect.width,
        height: rect.height,
      };
    }),
  );

// ===== 位置指定 =====

test.describe('pin - 位置指定', () => {
  test('子要素が指定のtop/leftに配置される', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'default');
    const rects = await getChildRects(page);

    expect(rects[0].left).toBeCloseTo(0, 0);
    expect(rects[0].top).toBeCloseTo(0, 0);
    expect(rects[1].left).toBeCloseTo(100, 0);
    expect(rects[1].top).toBeCloseTo(50, 0);
    expect(rects[2].left).toBeCloseTo(200, 0);
    expect(rects[2].top).toBeCloseTo(100, 0);
  });
});

// ===== childSize =====

test.describe('pin - childSize', () => {
  test('childSizeX/childSizeYが指定された場合に子要素のサイズが一致する', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'with-child-size');
    const rects = await getChildRects(page);

    rects.forEach((r) => {
      expect(r.width).toBeCloseTo(100, 0);
      expect(r.height).toBeCloseTo(80, 0);
    });
  });

  test('childSizeX/childSizeYありで指定のtop/leftに配置される', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'with-child-size');
    const rects = await getChildRects(page);

    expect(rects[0].left).toBeCloseTo(0, 0);
    expect(rects[0].top).toBeCloseTo(0, 0);
    expect(rects[1].left).toBeCloseTo(150, 0);
    expect(rects[1].top).toBeCloseTo(100, 0);
    expect(rects[2].left).toBeCloseTo(300, 0);
    expect(rects[2].top).toBeCloseTo(200, 0);
  });
});

// ===== childRatio =====

test.describe('pin - childRatio', () => {
  test('childRatioX=1,childRatioY=1 のとき子要素が正方形になる', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'with-child-ratio');
    const rects = await getChildRects(page);
    rects.forEach((r) => expect(r.height / r.width).toBeCloseTo(1, 1));
  });
});
