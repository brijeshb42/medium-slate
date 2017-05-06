import React from 'react';

export const TAG_TO_BLOCK = {
  p: 'paragraph',
  blockquote: 'quote',
  q: 'pullquote',
  pre: 'code',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

export const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
  code: 'code',
}

export const blockRule = {
  deserialize(el, next) {
    const type = TAG_TO_BLOCK[el.tagName];
    if (!type) {
      return;
    }
    return {
      kind: 'block',
      type,
      nodes: next(el.children),
    }
  },

  serialize(object, children) {
    if (object.kind !== 'block') {
      return;
    }
    switch (object.type) {
      case 'code': return <pre><code>{children}</code></pre>;
      case 'paragraph': return <p>{children}</p>;
      case 'quote': return <blockquote>{children}</blockquote>;
      case 'pullquote': return <q>{children}</q>;
      case 'h1': return <h1>{children}</h1>;
      case 'h2': return <h2>{children}</h2>;
      case 'h3': return <h3>{children}</h3>;
      case 'h4': return <h4>{children}</h4>;
      case 'h5': return <h5>{children}</h5>;
      case 'h6': return <h6>{children}</h6>;
      default: return undefined;
    }
  }
};


export const markRule = {
  deserialize(el, next) {
    const type = MARK_TAGS[el.tagName];
      if (!type) {
        return;
      }
      return {
        kind: 'mark',
        type: type,
        nodes: next(el.children),
      }
  },
  serialize(object, children) {
    if (object.kind !== 'mark') {
      return;
    }
    switch (object.type) {
      case 'bold': return <strong>{children}</strong>;
      case 'italic': return <em>{children}</em>;
      case 'underline': return <u>{children}</u>;
      case 'code': return <code>{children}</code>;
      default: return undefined;
    }
  }
};

export default [blockRule, markRule];
