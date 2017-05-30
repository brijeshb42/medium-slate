export default () => {
  return {
    /**
     * On backspace, if selection is collapsed and the current block's text
     * is empty and it is not a paragrah, change it's type to a paragraph.
     */
    onKeyDown(event, data, state) {
      // Backspace or Delete key
      if (event.which !== 8) {
        return;
      }
      const { selection, document } = state;
      if (state.selection.isExpanded) {
        return;
      }
      const blocks = document.getBlocksAtRange(selection);
      if (blocks.size !== 1) {
        return;
      }
      const block = blocks.get(0);
      const parent = document.getParent(block.key);
      if (block.length !== 0) {
        return;
      }
      if (!parent) {
        return;
      }
      if (block.type !== 'paragraph') {
        return state.transform().setNodeByKey(block.key, {
          type: 'paragraph',
        }).apply();
      } else if (block.type === 'paragraph') {
        if (parent.nodes.size > 1) {
          return state.transform().removeNodeByKey(block.key).apply();
        }
        if (parent.kind !== 'document') {
          const transform =  state.transform();
          transform.removeNodeByKey(parent.key);
          transform.insertBlockAtRange(transform.state.selection, {
            kind: 'block',
            type: 'paragraph',
          });
          const newDoc = transform.state.document;
          const newSel = transform.state.selection
          const block = newDoc.getBlocksAtRange(newSel).get(0);
          transform.collapseToStartOf(newDoc.getNextBlock(block.key));
          return transform.apply();
        }
      }
    }
  };
};
