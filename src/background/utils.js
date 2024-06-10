const FIND = /\bfoo\b/gi;
const TAG = 'h1'; 

function onMutation(mutations, observer) {
  let stopped;
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      let el, tag = node.localName;
      if ((tag === TAG || !tag && (el = node.parentNode) && el.localName === TAG)
          && FIND.test(node.textContent)) {
        if (!stopped) stopped = !observer.disconnect();
        replaceText(node, !tag);
      } else if (tag && node.firstElementChild) { // has children
        for (el of node.getElementsByTagName(TAG)) {
          if (FIND.test(el.textContent)) {
            if (!stopped) stopped = !observer.disconnect();
            replaceText(el);
          }
        }
      }
    }
  }
  if (stopped) observer.observe(document, {childList: true, subtree: true});
}

function replaceText(el, elText) {
  const walker = !elText && document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let node; (node = elText ? el : walker.nextNode()); elText = false) {
    const old = node.nodeValue;
    const res = old.replace(FIND, 'bar');
    if (old !== res) node.nodeValue = res;
  }
}