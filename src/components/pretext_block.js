import React from 'react';
import { clearCache, layout, prepare } from '@chenglou/pretext';

const PREPARED_TEXT_CACHE = new Map();
const DEFAULT_LINE_HEIGHT_RATIO = 1.2;
const MEASURABLE_TAGS = new Set(['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const BLOCK_BREAK_TAGS = new Set(['div', 'p', 'section', 'article', 'header', 'footer', 'aside']);
const LIST_BREAK_TAGS = new Set(['ul', 'ol']);
const HEADING_BREAK_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

let fontListenersAttached = false;
const fontSubscribers = new Set();

function normalizeMeasurementText(text, whiteSpace) {
  if (!text) {
    return '';
  }

  const baseText = String(text);

  if (whiteSpace === 'pre-wrap') {
    return baseText
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  return baseText.replace(/[ \t\r\n]+/g, ' ').trim();
}

function extractPlainText(node) {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractPlainText).join('');
  }

  if (!React.isValidElement(node)) {
    return '';
  }

  if (node.type === React.Fragment) {
    return extractPlainText(node.props.children);
  }

  if (typeof node.type !== 'string') {
    return extractPlainText(node.props.children);
  }

  const tag = node.type.toLowerCase();

  if (tag === 'br') {
    return '\n';
  }

  const childText = extractPlainText(node.props.children);

  if (tag === 'li') {
    return `• ${childText}\n`;
  }

  if (BLOCK_BREAK_TAGS.has(tag) || LIST_BREAK_TAGS.has(tag) || HEADING_BREAK_TAGS.has(tag)) {
    return `${childText}\n`;
  }

  return childText;
}

function toMeasurementTexts(measurementText, whiteSpace) {
  const rawItems = Array.isArray(measurementText) ? measurementText : [measurementText];
  const normalizedItems = rawItems
    .map((item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return normalizeMeasurementText(item, whiteSpace);
      }

      return normalizeMeasurementText(extractPlainText(item), whiteSpace);
    })
    .filter(Boolean);

  return normalizedItems.length > 0 ? normalizedItems : [' '];
}

function buildCanvasFont(style) {
  const fontParts = [
    style.fontStyle,
    style.fontVariant,
    style.fontWeight,
    style.fontStretch && style.fontStretch !== '100%' ? style.fontStretch : '',
    style.fontSize,
    style.fontFamily,
  ].filter(Boolean);

  return fontParts.join(' ');
}

function resolveLineHeight(style) {
  if (style.lineHeight && style.lineHeight !== 'normal') {
    const parsed = Number.parseFloat(style.lineHeight);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  const fontSize = Number.parseFloat(style.fontSize);
  return Number.isFinite(fontSize) ? fontSize * DEFAULT_LINE_HEIGHT_RATIO : 16 * DEFAULT_LINE_HEIGHT_RATIO;
}

function getPreparedText(text, font, whiteSpace) {
  const cacheKey = `${whiteSpace}::${font}::${text}`;

  if (PREPARED_TEXT_CACHE.has(cacheKey)) {
    return PREPARED_TEXT_CACHE.get(cacheKey);
  }

  const prepared = prepare(text, font, { whiteSpace });
  PREPARED_TEXT_CACHE.set(cacheKey, prepared);
  return prepared;
}

function notifyFontSubscribers() {
  clearCache();
  PREPARED_TEXT_CACHE.clear();
  fontSubscribers.forEach((listener) => listener());
}

function ensureFontListeners() {
  if (fontListenersAttached || !document.fonts) {
    return;
  }

  fontListenersAttached = true;
  document.fonts.ready.then(() => {
    notifyFontSubscribers();
  });

  if (document.fonts.addEventListener) {
    document.fonts.addEventListener('loadingdone', notifyFontSubscribers);
    document.fonts.addEventListener('loadingerror', notifyFontSubscribers);
  }
}

function useFontVersion() {
  const [fontVersion, setFontVersion] = React.useState(0);

  React.useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts) {
      return undefined;
    }

    ensureFontListeners();

    const bumpVersion = () => {
      setFontVersion((current) => current + 1);
    };

    fontSubscribers.add(bumpVersion);

    return () => {
      fontSubscribers.delete(bumpVersion);
    };
  }, []);

  return fontVersion;
}

function useObservedWidth(ref, widthOffset) {
  const [width, setWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const updateWidth = (nextWidth) => {
      const adjustedWidth = Math.max(0, nextWidth - widthOffset);
      setWidth((currentWidth) =>
        Math.abs(currentWidth - adjustedWidth) < 0.5 ? currentWidth : adjustedWidth
      );
    };

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      const nextWidth = entry.contentRect?.width ?? element.getBoundingClientRect().width;
      updateWidth(nextWidth);
    });

    observer.observe(element);
    updateWidth(element.getBoundingClientRect().width);

    return () => {
      observer.disconnect();
    };
  }, [ref, widthOffset]);

  return width;
}

function usePretextHeight({ measurementText, whiteSpace, widthOffset }) {
  const ref = React.useRef(null);
  const width = useObservedWidth(ref, widthOffset);
  const fontVersion = useFontVersion();
  const [metrics, setMetrics] = React.useState({ height: 0, lineCount: 0 });

  React.useLayoutEffect(() => {
    const element = ref.current;

    if (!element || width <= 0) {
      return;
    }

    const style = window.getComputedStyle(element);
    const font = buildCanvasFont(style);
    const lineHeight = resolveLineHeight(style);
    const measurementTexts = toMeasurementTexts(measurementText, whiteSpace);

    let maxHeight = 0;
    let maxLineCount = 0;

    for (let i = 0; i < measurementTexts.length; i += 1) {
      const prepared = getPreparedText(measurementTexts[i], font, whiteSpace);
      const result = layout(prepared, width, lineHeight);
      maxHeight = Math.max(maxHeight, result.height);
      maxLineCount = Math.max(maxLineCount, result.lineCount);
    }

    const nextMetrics = {
      height: Math.ceil(maxHeight),
      lineCount: maxLineCount,
    };

    setMetrics((currentMetrics) => (
      currentMetrics.height === nextMetrics.height && currentMetrics.lineCount === nextMetrics.lineCount
        ? currentMetrics
        : nextMetrics
    ));
  }, [fontVersion, measurementText, whiteSpace, width]);

  return { ref, height: metrics.height, lineCount: metrics.lineCount };
}

export function PretextBlock({
  as: Component = 'div',
  children,
  measurementText,
  reserve = 'minHeight',
  style,
  whiteSpace = 'normal',
  widthOffset = 0,
  ...props
}) {
  const fallbackText = measurementText ?? children;
  const { ref, height, lineCount } = usePretextHeight({
    measurementText: fallbackText,
    whiteSpace,
    widthOffset,
  });

  const nextStyle = height > 0
    ? {
        ...style,
        [reserve]: `${height}px`,
      }
    : style;

  return (
    <Component
      ref={ref}
      style={nextStyle}
      data-pretext-height={height > 0 ? height : undefined}
      data-pretext-lines={lineCount > 0 ? lineCount : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}

function pretextifyChildren(children, whiteSpace) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.type === React.Fragment) {
      return (
        <React.Fragment key={child.key}>
          {pretextifyChildren(child.props.children, whiteSpace)}
        </React.Fragment>
      );
    }

    const nextChildren = pretextifyChildren(child.props.children, whiteSpace);

    if (typeof child.type === 'string' && MEASURABLE_TAGS.has(child.type.toLowerCase())) {
      return (
        <PretextBlock
          key={child.key}
          as={child.type}
          whiteSpace={whiteSpace}
          {...child.props}
        >
          {nextChildren}
        </PretextBlock>
      );
    }

    return React.cloneElement(child, child.props, nextChildren);
  });
}

export function PretextRichContent({ children, whiteSpace = 'pre-wrap' }) {
  return <>{pretextifyChildren(children, whiteSpace)}</>;
}

export function getPretextMeasurementText(node, whiteSpace = 'normal') {
  return normalizeMeasurementText(extractPlainText(node), whiteSpace);
}
