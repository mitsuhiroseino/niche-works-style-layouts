import { expect, test, type Page } from '@playwright/test';

const STORY_URL = (storyId: string) =>
  `/iframe.html?id=spec-stack--${storyId}&viewMode=story`;

const gotoStory = async (page: Page, storyId: string) => {
  await page.goto(STORY_URL(storyId));
  await page.waitForSelector('.nws-layout-stack > *');
};

const CHILD_SIZE = 200;
const CHILD_COUNT = 3;
const CHILDREN_SIZE = CHILD_SIZE * CHILD_COUNT;
const GAP_SIZE = 20;

const getChildWidths = (page: Page) =>
  page
    .locator('.nws-layout-stack > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));

const getChildHeights = (page: Page) =>
  page
    .locator('.nws-layout-stack > *')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));

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
    const toPlain = (r: DOMRect): Rect => ({
      top: r.top,
      right: r.right,
      bottom: r.bottom,
      left: r.left,
      width: r.width,
      height: r.height,
    });
    const container = document.querySelector('.nws-layout-stack')!;
    const children = Array.from(container.querySelectorAll(':scope > *'));
    return {
      container: toPlain(container.getBoundingClientRect()),
      children: children.map((el) => toPlain(el.getBoundingClientRect())),
    };
  });

// ===== direction:x 主軸(adjustX) =====

test.describe('stack - direction:x 主軸(adjustX)', () => {
  test.describe('grow', () => {
    test('親幅 > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-x-adjust-x-grow');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeGreaterThan(CHILD_SIZE));
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

// ===== direction:x 交差軸(adjustY) =====

test.describe('stack - direction:x 交差軸(adjustY)', () => {
  test.describe('grow', () => {
    test('子要素がコンテナの高さに伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 400 });
      await gotoStory(page, 'direction-x-adjust-y-grow');
      const { container, children } = await getRects(page);
      children.forEach((child) =>
        expect(child.height).toBeCloseTo(container.height, 0),
      );
    });
  });

  test.describe('shrink', () => {
    test('親高さ > childSize: childSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE + 200 });
      await gotoStory(page, 'direction-x-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親高さ < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILD_SIZE - 50 });
      await gotoStory(page, 'direction-x-adjust-y-shrink');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('fit', () => {
    test('子要素がコンテナの高さに伸縮する', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 400 });
      await gotoStory(page, 'direction-x-adjust-y-fit');
      const { container, children } = await getRects(page);
      children.forEach((child) =>
        expect(child.height).toBeCloseTo(container.height, 0),
      );
    });
  });

  test.describe('none', () => {
    test('親高さに関わらずchildSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-x-adjust-y-none');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });
  });
});

// ===== direction:x 主軸 alignX =====

test.describe('stack - direction:x 主軸 alignX', () => {
  test('left: 子要素グループが左端に揃う', async ({ page }) => {
    await gotoStory(page, 'direction-x-align-x-left');
    const { container, children } = await getRects(page);
    expect(children[0].left).toBeCloseTo(container.left, 0);
  });

  test('center: 子要素グループが中央に揃う', async ({ page }) => {
    await gotoStory(page, 'direction-x-align-x-center');
    const { container, children } = await getRects(page);
    const leftSpace = children[0].left - container.left;
    const rightSpace = container.right - children[children.length - 1].right;
    expect(Math.abs(leftSpace - rightSpace)).toBeLessThan(2);
  });

  test('right: 子要素グループが右端に揃う', async ({ page }) => {
    await gotoStory(page, 'direction-x-align-x-right');
    const { container, children } = await getRects(page);
    expect(children[children.length - 1].right).toBeCloseTo(container.right, 0);
  });

  test('space-between: 両端の子が端に揃い均等間隔になる', async ({ page }) => {
    await gotoStory(page, 'direction-x-align-x-space-between');
    const { container, children } = await getRects(page);
    expect(children[0].left).toBeCloseTo(container.left, 0);
    expect(children[children.length - 1].right).toBeCloseTo(container.right, 0);
    const gaps = children.slice(1).map((c, i) => c.left - children[i].right);
    gaps.forEach((gap) => expect(gap).toBeCloseTo(gaps[0], 0));
  });

  test('space-around: 端の余白が子要素間隔の1/2になる', async ({ page }) => {
    await gotoStory(page, 'direction-x-align-x-space-around');
    const { container, children } = await getRects(page);
    const leftSpace = children[0].left - container.left;
    const rightSpace = container.right - children[children.length - 1].right;
    const gapBetween = children[1].left - children[0].right;
    expect(leftSpace).toBeCloseTo(gapBetween / 2, 0);
    expect(rightSpace).toBeCloseTo(gapBetween / 2, 0);
  });

  test('space-evenly: すべての余白が均等になる', async ({ page }) => {
    await gotoStory(page, 'direction-x-align-x-space-evenly');
    const { container, children } = await getRects(page);
    const leftSpace = children[0].left - container.left;
    const rightSpace = container.right - children[children.length - 1].right;
    const gapBetween = children[1].left - children[0].right;
    expect(leftSpace).toBeCloseTo(gapBetween, 0);
    expect(rightSpace).toBeCloseTo(gapBetween, 0);
  });
});

// ===== direction:x 交差軸 alignY =====

test.describe('stack - direction:x 交差軸 alignY', () => {
  test('top: 子要素がコンテナ上端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-y-top');
    const { container, children } = await getRects(page);
    children.forEach((child) =>
      expect(child.top).toBeCloseTo(container.top, 0),
    );
  });

  test('middle: 子要素がコンテナ中央に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-y-middle');
    const { container, children } = await getRects(page);
    children.forEach((child) => {
      const topSpace = child.top - container.top;
      const bottomSpace = container.bottom - child.bottom;
      expect(Math.abs(topSpace - bottomSpace)).toBeLessThan(2);
    });
  });

  test('bottom: 子要素がコンテナ下端に揃う', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-x-align-y-bottom');
    const { container, children } = await getRects(page);
    children.forEach((child) =>
      expect(child.bottom).toBeCloseTo(container.bottom, 0),
    );
  });
});

// ===== direction:x gapX =====

test.describe('stack - direction:x gapX', () => {
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

// ===== direction:y 主軸(adjustY) =====

test.describe('stack - direction:y 主軸(adjustY)', () => {
  test.describe('grow', () => {
    test('親高さ > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-grow');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(CHILD_SIZE));
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
      heights.forEach((h) => expect(h).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('fit', () => {
    test('親高さ > childSize: childSizeより伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-fit');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeGreaterThan(CHILD_SIZE));
    });

    test('親高さ < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-fit');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('none', () => {
    test('親高さ > childSize: childSizeのまま（伸びない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE + 200 });
      await gotoStory(page, 'direction-y-adjust-y-none');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親高さ < childSize: childSizeのまま（縮まない）', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: CHILDREN_SIZE - 50 });
      await gotoStory(page, 'direction-y-adjust-y-none');
      const heights = await getChildHeights(page);
      heights.forEach((h) => expect(h).toBeCloseTo(CHILD_SIZE, 0));
    });
  });
});

// ===== direction:y 交差軸(adjustX) =====

test.describe('stack - direction:y 交差軸(adjustX)', () => {
  test.describe('grow', () => {
    test('子要素がコンテナの幅に伸びる', async ({ page }) => {
      await page.setViewportSize({ width: 400, height: 800 });
      await gotoStory(page, 'direction-y-adjust-x-grow');
      const { container, children } = await getRects(page);
      children.forEach((child) =>
        expect(child.width).toBeCloseTo(container.width, 0),
      );
    });
  });

  test.describe('shrink', () => {
    test('親幅 > childSize: childSizeのまま（伸びない）', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-y-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });

    test('親幅 < childSize: childSizeより縮む', async ({ page }) => {
      await page.setViewportSize({ width: CHILD_SIZE - 50, height: 800 });
      await gotoStory(page, 'direction-y-adjust-x-shrink');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeLessThan(CHILD_SIZE));
    });
  });

  test.describe('fit', () => {
    test('子要素がコンテナの幅に伸縮する', async ({ page }) => {
      await page.setViewportSize({ width: 400, height: 800 });
      await gotoStory(page, 'direction-y-adjust-x-fit');
      const { container, children } = await getRects(page);
      children.forEach((child) =>
        expect(child.width).toBeCloseTo(container.width, 0),
      );
    });
  });

  test.describe('none', () => {
    test('親幅に関わらずchildSizeのまま', async ({ page }) => {
      await page.setViewportSize({ width: CHILDREN_SIZE + 200, height: 800 });
      await gotoStory(page, 'direction-y-adjust-x-none');
      const widths = await getChildWidths(page);
      widths.forEach((w) => expect(w).toBeCloseTo(CHILD_SIZE, 0));
    });
  });
});

// ===== direction:y 主軸 alignY =====

test.describe('stack - direction:y 主軸 alignY', () => {
  test('top: 子要素グループが上端に揃う', async ({ page }) => {
    await gotoStory(page, 'direction-y-align-y-top');
    const { container, children } = await getRects(page);
    expect(children[0].top).toBeCloseTo(container.top, 0);
  });

  test('middle: 子要素グループが中央に揃う', async ({ page }) => {
    await gotoStory(page, 'direction-y-align-y-middle');
    const { container, children } = await getRects(page);
    const topSpace = children[0].top - container.top;
    const bottomSpace = container.bottom - children[children.length - 1].bottom;
    expect(Math.abs(topSpace - bottomSpace)).toBeLessThan(2);
  });

  test('bottom: 子要素グループが下端に揃う', async ({ page }) => {
    await gotoStory(page, 'direction-y-align-y-bottom');
    const { container, children } = await getRects(page);
    expect(children[children.length - 1].bottom).toBeCloseTo(
      container.bottom,
      0,
    );
  });

  test('space-between: 両端の子が端に揃い均等間隔になる', async ({ page }) => {
    await gotoStory(page, 'direction-y-align-y-space-between');
    const { container, children } = await getRects(page);
    expect(children[0].top).toBeCloseTo(container.top, 0);
    expect(children[children.length - 1].bottom).toBeCloseTo(
      container.bottom,
      0,
    );
    const gaps = children.slice(1).map((c, i) => c.top - children[i].bottom);
    gaps.forEach((gap) => expect(gap).toBeCloseTo(gaps[0], 0));
  });

  test('space-around: 端の余白が子要素間隔の1/2になる', async ({ page }) => {
    await gotoStory(page, 'direction-y-align-y-space-around');
    const { container, children } = await getRects(page);
    const topSpace = children[0].top - container.top;
    const bottomSpace = container.bottom - children[children.length - 1].bottom;
    const gapBetween = children[1].top - children[0].bottom;
    expect(topSpace).toBeCloseTo(gapBetween / 2, 0);
    expect(bottomSpace).toBeCloseTo(gapBetween / 2, 0);
  });

  test('space-evenly: すべての余白が均等になる', async ({ page }) => {
    await gotoStory(page, 'direction-y-align-y-space-evenly');
    const { container, children } = await getRects(page);
    const topSpace = children[0].top - container.top;
    const bottomSpace = container.bottom - children[children.length - 1].bottom;
    const gapBetween = children[1].top - children[0].bottom;
    expect(topSpace).toBeCloseTo(gapBetween, 0);
    expect(bottomSpace).toBeCloseTo(gapBetween, 0);
  });
});

// ===== direction:y 交差軸 alignX =====

test.describe('stack - direction:y 交差軸 alignX', () => {
  test('left: 各子要素がコンテナ左端に揃う', async ({ page }) => {
    await gotoStory(page, 'direction-y-align-x-left');
    const { container, children } = await getRects(page);
    children.forEach((child) =>
      expect(child.left).toBeCloseTo(container.left, 0),
    );
  });

  test('center: 各子要素がコンテナ中央に揃う', async ({ page }) => {
    await gotoStory(page, 'direction-y-align-x-center');
    const { container, children } = await getRects(page);
    children.forEach((child) => {
      const leftSpace = child.left - container.left;
      const rightSpace = container.right - child.right;
      expect(Math.abs(leftSpace - rightSpace)).toBeLessThan(2);
    });
  });

  test('right: 各子要素がコンテナ右端に揃う', async ({ page }) => {
    await gotoStory(page, 'direction-y-align-x-right');
    const { container, children } = await getRects(page);
    children.forEach((child) =>
      expect(child.right).toBeCloseTo(container.right, 0),
    );
  });
});

// ===== direction:y gapY =====

test.describe('stack - direction:y gapY', () => {
  test('隣接する子要素の縦間隔が gapY と一致する', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await gotoStory(page, 'direction-y-gap-y');
    const { children } = await getRects(page);
    for (let i = 1; i < children.length; i++) {
      const gap = children[i].top - children[i - 1].bottom;
      expect(gap).toBeCloseTo(GAP_SIZE, 0);
    }
  });
});

// ===== childRatio =====

test.describe('stack - childRatio', () => {
  test('direction:x: childRatioX=1,childRatioY=1 のとき子要素が正方形になる', async ({
    page,
  }) => {
    await gotoStory(page, 'direction-x-child-ratio');
    const { children } = await getRects(page);
    children.forEach((child) =>
      expect(child.height / child.width).toBeCloseTo(1, 1),
    );
  });

  test('direction:y: childRatioX=1,childRatioY=2 のとき子要素の高さが幅の2倍になる', async ({
    page,
  }) => {
    await gotoStory(page, 'direction-y-child-ratio');
    const { children } = await getRects(page);
    children.forEach((child) =>
      expect(child.height / child.width).toBeCloseTo(2, 1),
    );
  });
});
