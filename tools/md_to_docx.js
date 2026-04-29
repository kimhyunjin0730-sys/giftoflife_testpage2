/**
 * HANDOFF.md → HANDOFF.docx 변환기
 * 사용: node scripts/md_to_docx.js
 *
 * 지원 markdown:
 *   # / ## / ### / #### 헤딩
 *   | a | b | 표
 *   - / * 불릿
 *   `code` inline code
 *   **bold**
 *   [text](url) 링크
 *   ```code block```
 *   ---  hr (페이지 구분선)
 *   > blockquote
 */
const fs = require('fs');
const path = require('path');
const docxPath = require.resolve('docx', { paths: ['C:\\Users\\admin\\AppData\\Roaming\\npm\\node_modules'] });
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, AlignmentType, BorderStyle,
  WidthType, ShadingType, LevelFormat, ExternalHyperlink, PageBreak,
} = require(docxPath);

const SRC = path.join(__dirname, '..', 'HANDOFF.md');
const OUT = path.join(__dirname, '..', 'HANDOFF.docx');

const md = fs.readFileSync(SRC, 'utf-8');

// ── 인라인 마크다운 파서: TextRun 배열 반환 ─────────────────────
function parseInline(text) {
  if (!text) return [new TextRun('')];
  const runs = [];
  let buf = '';
  let i = 0;
  const flush = (opts = {}) => {
    if (!buf) return;
    runs.push(new TextRun({ text: buf, ...opts }));
    buf = '';
  };
  while (i < text.length) {
    // **bold**
    if (text[i] === '*' && text[i + 1] === '*') {
      flush();
      const end = text.indexOf('**', i + 2);
      if (end > -1) {
        runs.push(new TextRun({ text: text.slice(i + 2, end), bold: true }));
        i = end + 2; continue;
      }
    }
    // `code`
    if (text[i] === '`') {
      flush();
      const end = text.indexOf('`', i + 1);
      if (end > -1) {
        runs.push(new TextRun({
          text: text.slice(i + 1, end),
          font: 'Consolas',
          shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'F1F1F1' },
        }));
        i = end + 1; continue;
      }
    }
    // [text](url)
    if (text[i] === '[') {
      const closeBracket = text.indexOf(']', i + 1);
      if (closeBracket > -1 && text[closeBracket + 1] === '(') {
        const closeParen = text.indexOf(')', closeBracket + 2);
        if (closeParen > -1) {
          flush();
          const linkText = text.slice(i + 1, closeBracket);
          const url = text.slice(closeBracket + 2, closeParen);
          runs.push(new ExternalHyperlink({
            children: [new TextRun({ text: linkText, style: 'Hyperlink', color: '0563C1', underline: {} })],
            link: url,
          }));
          i = closeParen + 1; continue;
        }
      }
    }
    // <url> auto-link
    if (text[i] === '<') {
      const close = text.indexOf('>', i + 1);
      if (close > -1) {
        const inside = text.slice(i + 1, close);
        if (/^https?:\/\//.test(inside) || /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(inside)) {
          flush();
          const link = inside.startsWith('http') ? inside : `mailto:${inside}`;
          runs.push(new ExternalHyperlink({
            children: [new TextRun({ text: inside, style: 'Hyperlink', color: '0563C1', underline: {} })],
            link,
          }));
          i = close + 1; continue;
        }
      }
    }
    buf += text[i];
    i += 1;
  }
  flush();
  return runs.length ? runs : [new TextRun('')];
}

const border = { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' };
const tableBorders = { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border };

function buildTable(rows) {
  // rows[0] = header, rows[1] = separator (skip), rows[2...] = body
  const headerCells = rows[0];
  const bodyRows = rows.slice(2);
  const cols = headerCells.length;
  const totalWidth = 9000;
  const colWidth = Math.floor(totalWidth / cols);
  const columnWidths = Array(cols).fill(colWidth);

  const makeRow = (cells, isHeader) => new TableRow({
    children: cells.map((c, idx) => new TableCell({
      borders: tableBorders,
      width: { size: columnWidths[idx], type: WidthType.DXA },
      shading: isHeader ? { fill: 'EEEEEE', type: ShadingType.CLEAR, color: 'auto' } : undefined,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: parseInline(c.trim()), spacing: { before: 0, after: 0 } })],
    })),
  });

  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths,
    rows: [makeRow(headerCells, true), ...bodyRows.map(r => makeRow(r, false))],
  });
}

// ── 줄 단위 파서 ─────────────────────────────────────────────────
const children = [];
const lines = md.split(/\r?\n/);
let i = 0;
let inCodeBlock = false;
let codeBuf = [];
let tableBuf = [];

const flushTable = () => {
  if (tableBuf.length >= 2) {
    children.push(buildTable(tableBuf));
    children.push(new Paragraph({ children: [new TextRun('')] }));
  }
  tableBuf = [];
};
const flushCode = () => {
  if (codeBuf.length) {
    for (const cl of codeBuf) {
      children.push(new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'F4F4F4' },
        children: [new TextRun({ text: cl || ' ', font: 'Consolas', size: 20 })],
      }));
    }
    children.push(new Paragraph({ children: [new TextRun('')] }));
  }
  codeBuf = [];
};

while (i < lines.length) {
  let line = lines[i];

  // code fence
  if (line.startsWith('```')) {
    if (inCodeBlock) { flushCode(); inCodeBlock = false; }
    else { flushTable(); inCodeBlock = true; }
    i++; continue;
  }
  if (inCodeBlock) { codeBuf.push(line); i++; continue; }

  // table row
  if (line.startsWith('|') && line.includes('|', 1)) {
    const cells = line.split('|').slice(1, -1);
    tableBuf.push(cells);
    i++; continue;
  } else if (tableBuf.length) {
    flushTable();
  }

  // blank
  if (line.trim() === '') {
    children.push(new Paragraph({ children: [new TextRun('')] }));
    i++; continue;
  }

  // hr
  if (/^[-*_]{3,}$/.test(line.trim())) {
    children.push(new Paragraph({
      border: { bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 } },
      children: [new TextRun('')],
    }));
    i++; continue;
  }

  // headings
  const h = line.match(/^(#{1,4})\s+(.*)$/);
  if (h) {
    const lvl = h[1].length;
    const heading = [HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3, HeadingLevel.HEADING_4][lvl - 1];
    children.push(new Paragraph({ heading, children: parseInline(h[2]) }));
    i++; continue;
  }

  // bullet list
  const b = line.match(/^(\s*)[-*]\s+(.*)$/);
  if (b) {
    const level = Math.min(2, Math.floor(b[1].length / 2));
    children.push(new Paragraph({
      numbering: { reference: 'bullets', level },
      children: parseInline(b[2]),
    }));
    i++; continue;
  }

  // ordered list
  const o = line.match(/^(\s*)\d+\.\s+(.*)$/);
  if (o) {
    const level = Math.min(2, Math.floor(o[1].length / 2));
    children.push(new Paragraph({
      numbering: { reference: 'numbers', level },
      children: parseInline(o[2]),
    }));
    i++; continue;
  }

  // blockquote
  if (line.startsWith('> ')) {
    children.push(new Paragraph({
      indent: { left: 360 },
      border: { left: { color: 'CCCCCC', space: 8, style: BorderStyle.SINGLE, size: 12 } },
      children: parseInline(line.slice(2)),
    }));
    i++; continue;
  }

  // normal paragraph
  children.push(new Paragraph({ children: parseInline(line) }));
  i++;
}

flushTable();
flushCode();

// ── 문서 생성 ─────────────────────────────────────────────────────
const doc = new Document({
  creator: 'Gift of Life Korea',
  title: 'Handoff Documentation',
  styles: {
    default: { document: { run: { font: 'Malgun Gothic', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: 'Malgun Gothic', color: '1F3864' },
        paragraph: { spacing: { before: 480, after: 240 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 30, bold: true, font: 'Malgun Gothic', color: '2E74B5' },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: 'Malgun Gothic', color: '2E74B5' },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
      { id: 'Heading4', name: 'Heading 4', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, italics: true, font: 'Malgun Gothic' },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 3 } },
    ],
  },
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
          { level: 2, format: LevelFormat.BULLET, text: '▪', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 2160, hanging: 360 } } } },
        ],
      },
      {
        reference: 'numbers',
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.DECIMAL, text: '%2.', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
        ],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log(`✓ ${OUT} written (${buf.length} bytes, ${children.length} blocks)`);
}).catch(err => {
  console.error('docx build failed:', err);
  process.exit(1);
});
