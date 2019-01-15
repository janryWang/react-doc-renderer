import React, { Fragment } from "react"
import { MenuContent } from "./menu"
import PropTypes from "prop-types"
const readmeRE = /readme.md/i

const toArr = val => (Array.isArray(val) ? val : val ? [val] : [])

const ReactDocRenderer = ({ docs }) => {
  let max = docs.length + 1000
  const sortedDocs = toArr(docs)
    .map(item => {
      item.meta.index =
        item.meta.index !== undefined ? item.meta.index : item.meta.order
      return item
    })
    .sort(({ meta: meta_after = {} }, { meta: meta_prev = {} }) => {
      if (meta_after.index && meta_prev.index) {
        return meta_after.index - meta_prev.index
      } else {
        if (!meta_after.index) {
          max += 1
          meta_after.index = max
        }
        if (!meta_prev.index) {
          max += 2
          meta_prev.index = max
        }
        return meta_after.index - meta_prev.index
      }
    })
  return (
    <MenuContent>
      <div className="doc-renderer markdown-body" style={{ margin: 30 }}>
        {sortedDocs.map(({ component }, key) => {
          return React.createElement(component, { key: `readme-${key}` })
        })}
      </div>
    </MenuContent>
  )
}

ReactDocRenderer.propTypes = {
  /**
    This is document collection.
  */
  docs: PropTypes.array.isRequired
}

module.exports = ReactDocRenderer
