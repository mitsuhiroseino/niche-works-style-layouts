export type ResizableOptions = {
  /**
   * 対象のエレメント
   */
  element?: HTMLElement;
  /** 初期幅 (px)。未指定の場合は element の現在の幅を使用 */
  initialWidth?: number;
  /** 初期高さ (px)。未指定の場合は element の現在の高さを使用 */
  initialHeight?: number;
  /** 最小幅 (px)。デフォルト: 80 */
  minWidth?: number;
  /** 最小高さ (px)。デフォルト: 80 */
  minHeight?: number;
  /** 最大幅 (px)。デフォルト: Infinity */
  maxWidth?: number;
  /** 最大高さ (px)。デフォルト: Infinity */
  maxHeight?: number;
  /** ハンドルの太さ (px)。デフォルト: 8 */
  handleSize?: number;
};

export type ResizableInstance = {
  /**
   * 対象のエレメント
   */
  element: HTMLElement;
  /** ラッパー要素。これをDOMに追加する */
  wrapper: HTMLElement;
  /** リサイズイベントリスナーを解除してDOMを元の状態に戻す */
  destroy: () => void;
};

/**
 * 指定した HTMLElement の右辺・下辺・右下コーナーをドラッグして
 * サイズ変更できるようにしたラッパー要素を返す。
 *
 * @example
 * const { wrapper } = makeResizable(myElement, { initialWidth: 400 });
 * document.body.appendChild(wrapper);
 */
export default function createResizableElement(
  options: ResizableOptions = {},
): ResizableInstance {
  const {
    element = document.createElement('div'),
    minWidth = 0,
    minHeight = 0,
    maxWidth = Infinity,
    maxHeight = Infinity,
    handleSize = 8,
  } = options;

  // 初期サイズを決定
  const rect = element.getBoundingClientRect();
  let currentWidth = options.initialWidth ?? (rect.width || 200);
  let currentHeight = options.initialHeight ?? (rect.height || 200);

  // ─── ラッパー ────────────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: relative;
    display: inline-block;
    width: ${currentWidth}px;
    height: ${currentHeight}px;
    box-sizing: border-box;
  `;

  // コンテンツが wrapper いっぱいに広がるようにする
  element.style.width = '100%';
  element.style.height = '100%';
  element.style.boxSizing = 'border-box';
  wrapper.appendChild(element);

  // ─── ハンドル生成ヘルパー ─────────────────────────────────────
  type Direction = 'right' | 'bottom' | 'corner';

  const createHandle = (dir: Direction): HTMLElement => {
    const handle = document.createElement('div');

    const base: Partial<CSSStyleDeclaration> = {
      position: 'absolute',
      zIndex: '10',
    };

    if (dir === 'right') {
      Object.assign(handle.style, {
        ...base,
        top: '0',
        right: '0',
        width: `${handleSize}px`,
        height: `calc(100% - ${handleSize}px)`,
        cursor: 'ew-resize',
      });
    } else if (dir === 'bottom') {
      Object.assign(handle.style, {
        ...base,
        bottom: '0',
        left: '0',
        width: `calc(100% - ${handleSize}px)`,
        height: `${handleSize}px`,
        cursor: 'ns-resize',
      });
    } else {
      // corner
      Object.assign(handle.style, {
        ...base,
        right: '0',
        bottom: '0',
        width: `${handleSize}px`,
        height: `${handleSize}px`,
        cursor: 'nwse-resize',
      });
    }

    return handle;
  };

  const rightHandle = createHandle('right');
  const bottomHandle = createHandle('bottom');
  const cornerHandle = createHandle('corner');

  wrapper.appendChild(rightHandle);
  wrapper.appendChild(bottomHandle);
  wrapper.appendChild(cornerHandle);

  // ─── ドラッグロジック ─────────────────────────────────────────
  type ResizeAxis = 'x' | 'y' | 'xy';

  let axis: ResizeAxis = 'x';
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;

  const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max);

  const onMouseMove = (e: MouseEvent): void => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (axis === 'x' || axis === 'xy') {
      currentWidth = clamp(startWidth + dx, minWidth, maxWidth);
      wrapper.style.width = `${currentWidth}px`;
    }
    if (axis === 'y' || axis === 'xy') {
      currentHeight = clamp(startHeight + dy, minHeight, maxHeight);
      wrapper.style.height = `${currentHeight}px`;
    }
  };

  const onMouseUp = (): void => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  };

  const startDrag = (e: MouseEvent, resizeAxis: ResizeAxis): void => {
    e.preventDefault();
    axis = resizeAxis;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = currentWidth;
    startHeight = currentHeight;

    // ドラッグ中にテキスト選択・カーソル変化を防ぐ
    document.body.style.userSelect = 'none';
    document.body.style.cursor =
      resizeAxis === 'x'
        ? 'ew-resize'
        : resizeAxis === 'y'
          ? 'ns-resize'
          : 'nwse-resize';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onRightMouseDown = (e: MouseEvent) => startDrag(e, 'x');
  const onBottomMouseDown = (e: MouseEvent) => startDrag(e, 'y');
  const onCornerMouseDown = (e: MouseEvent) => startDrag(e, 'xy');

  rightHandle.addEventListener('mousedown', onRightMouseDown);
  bottomHandle.addEventListener('mousedown', onBottomMouseDown);
  cornerHandle.addEventListener('mousedown', onCornerMouseDown);

  // ─── destroy ─────────────────────────────────────────────────
  const destroy = (): void => {
    rightHandle.removeEventListener('mousedown', onRightMouseDown);
    bottomHandle.removeEventListener('mousedown', onBottomMouseDown);
    cornerHandle.removeEventListener('mousedown', onCornerMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // element を wrapper から取り出してスタイルをリセット
    element.style.width = '';
    element.style.height = '';
    element.style.boxSizing = '';
    wrapper.replaceWith(element);
  };

  return { element, wrapper, destroy };
}
