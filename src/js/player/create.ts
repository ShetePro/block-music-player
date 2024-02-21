type CreateDomOption = {
  classList?: string[];
  append?: HTMLElement[] | Node[] | string[];
};

/*
 * 封装dom 创建方法
 * */
export function createDocumentEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  option?: CreateDomOption,
): HTMLElementTagNameMap[K] {
  const { classList = [], append = [] } = option || {};
  const dom = document.createElement(tag);
  dom.classList.add(...classList);
  dom.append(...append);
  return dom;
}
