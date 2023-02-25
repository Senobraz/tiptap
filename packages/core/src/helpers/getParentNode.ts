import { Node } from '@tiptap/pm/model'

import { Editor } from '../Editor'
import { getNodePosition } from './getNodePosition'

/**
 * This function returns the parent node of a ProseMirror node
 * @param node The ProseMirror node to get the parent of
 * @param editor The Tiptap editor instance
 */
export const getParentNode = (node: Node, editor: Editor) => {
  const pos = getNodePosition(node, editor)

  // if the position is already 1, the next depth will be 0 (doc)
  // since text nodes don't increase the depth, we will need to check if
  // the current node has children and if not, we'll check on depth 1
  // otherwise we can just go with depth - 1
  if (pos.depth === 1 && !node.childCount) {
    return pos.node(1)
  }

  // lets set a minimum depth of 0 so we don't run into weird errors when
  // trying to get the parent of the root node
  const parentNode = pos.node(Math.max(0, pos.depth - 1))

  return parentNode
}
