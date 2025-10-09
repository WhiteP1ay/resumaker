/**
 * 文本格式检测和转换工具
 */

/**
 * 检测字符串是否为纯文本（非 HTML）
 * @param text 要检测的文本
 * @returns true 表示是纯文本，false 表示已经是 HTML
 */
export function isPlainText(text: string): boolean {
  if (!text || text.trim() === '') {
    return false;
  }

  // 检查是否包含 HTML 标签
  const htmlTagPattern = /<[^>]+>/;
  return !htmlTagPattern.test(text);
}

/**
 * 将纯文本转换为 HTML 格式
 * @param text 纯文本
 * @returns HTML 格式的文本
 */
export function convertPlainTextToHtml(text: string): string {
  if (!text || text.trim() === '') {
    return '<p></p>';
  }

  // 如果已经是 HTML，直接返回
  if (!isPlainText(text)) {
    return text;
  }

  // 转义 HTML 特殊字符
  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // 处理列表项（- 或 • 开头）
  const lines = text.split('\n');
  const result: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // 检测列表项（以 - 或 • 或数字. 开头）
    const listPattern = /^[-•]\s+(.+)$/;
    const numberListPattern = /^\d+\.\s+(.+)$/;
    const listMatch = trimmedLine.match(listPattern) || trimmedLine.match(numberListPattern);

    if (listMatch) {
      if (!inList) {
        // 开始一个新列表
        if (result.length > 0 && result[result.length - 1] !== '</ul>') {
          // 如果前面有段落，先结束
        }
        inList = true;
        listItems = [];
      }
      listItems.push(`<li>${escapeHtml(listMatch[1])}</li>`);
    } else {
      // 不是列表项
      if (inList) {
        // 结束当前列表
        result.push(`<ul>${listItems.join('')}</ul>`);
        inList = false;
        listItems = [];
      }

      if (trimmedLine === '') {
        // 空行，跳过（会在段落间自动处理）
        continue;
      } else {
        // 普通段落
        result.push(`<p>${escapeHtml(trimmedLine)}</p>`);
      }
    }
  }

  // 处理剩余的列表项
  if (inList && listItems.length > 0) {
    result.push(`<ul>${listItems.join('')}</ul>`);
  }

  return result.join('') || '<p></p>';
}
