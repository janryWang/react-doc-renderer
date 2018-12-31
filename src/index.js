import React, { Fragment } from "react"
import PropTypes from "prop-types"
const readmeRE = /readme.md/i

const ReactDocRenderer = ({ docs }) => {
  const readmes = docs.filter(({ path }) => readmeRE.test(path))
  const normals = docs.filter(({ path }) => !readmeRE.test(path))
  return (
    <Fragment>
      {normals.map(({ component }, key) => {
        return React.createElement(component, { key: `normal-${key}` })
      })}
      {readmes.map(({ component }, key) => {
        return React.createElement(component, { key: `readme-${key}` })
      })}
    </Fragment>
  )
}

ReactDocRenderer.propTypes = {
  /**
    This is document collection.
  */
  docs: PropTypes.array.isRequired
}

module.exports = ReactDocRenderer
