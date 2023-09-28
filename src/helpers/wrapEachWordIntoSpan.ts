export function wrapEachWordInSpan(parent: HTMLElement) {
  const spans = [] as HTMLSpanElement[];
  const childNodes = Array.from(parent.childNodes);
  childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      // console.log('ind', ind);
      // parent.removeChild(node);

      if (text) {
        const words = text.split('');
        for (const word of words) {
          if (word === '') {
            continue;
          }
          const span = document.createElement('span');
          span.innerHTML = word + ' ';
          span.style.display = 'inline-block';
          // parent.appendChild(span);
          parent.insertBefore(span, node);
          spans.push(span);
        }

        parent.removeChild(node);
      }
    } else {
      spans.push(...wrapEachWordInSpan(node as HTMLElement));
    }
  });

  return spans;
}
