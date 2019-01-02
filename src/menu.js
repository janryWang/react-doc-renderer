import React, { Component } from "react"
import styled from "styled-components"
import Sticky from "react-stikky"

const findMinLevel = list => {
  return list.reduce((min, { level }) => {
    return level <= min ? level : min
  }, list[0].level)
}

const isElementInViewport = (rect, { offset = 0, threshold = 0 } = {}) => {
  const { top, right, bottom, left, width, height } = rect
  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  }

  const elementThreshold = {
    x: threshold * width,
    y: threshold * height
  }

  return (
    intersection.t >= (offset.top || offset + elementThreshold.y) &&
    intersection.r >= (offset.right || offset + elementThreshold.x) &&
    intersection.b >= (offset.bottom || offset + elementThreshold.y) &&
    intersection.l >= (offset.left || offset + elementThreshold.x)
  )
}

export const MenuContent = styled(
  class MenuContent extends Component {
    ref = React.createRef()

    state = {
      dataSource: [],
      pathname: this.getPathName()
    }

    renderMenuList() {
      const { dataSource } = this.state

      return (
        <Sticky edge="top" triggerDistance={50}>
          <ul className="menu-list">
            {dataSource.map(({ slug, text }, key) => {
              return (
                <li
                  key={key}
                  className={`${
                    this.state.pathname.indexOf(slug) > -1 ? "active" : ""
                  }`}
                >
                  <a href={`#${slug}`}>
                    <span>{text}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </Sticky>
      )
    }

    loadDataSource(element) {
      const list = Array.prototype.map.call(
        element.querySelectorAll("h1,h2,h3,h4,h5"),
        el => {
          const level = parseInt(el.tagName.charAt(1))
          const slug = el.id
          return {
            level,
            slug,
            text: el.textContent,
            el
          }
        }
      )
      const minLevel = findMinLevel(list)
      const newList = list.filter(({ level }) => level === minLevel)
      this.setState({
        dataSource: newList
      })
    }

    getPathName() {
      return decodeURIComponent(window.location.hash.slice(1))
    }

    hashChangeHandler = () => {
      this.setState({
        pathname: this.getPathName()
      })
    }

    scrollHandler = () => {
      requestAnimationFrame(() => {
        this.state.dataSource.forEach(({ el, slug }) => {
          if (isElementInViewport(el.getBoundingClientRect())) {
            this.setState({
              pathname: slug
            })
          }
        })
      })
    }

    componentDidMount() {
      if (this.ref && this.ref.current) {
        this.loadDataSource(this.ref.current)
      }
      window.addEventListener("scroll", this.scrollHandler)
      window.addEventListener("hashchange", this.hashChangeHandler)
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.scrollHandler)
      window.removeEventListener("hashchange", this.hashChangeHandler)
    }

    render() {
      const { className, children } = this.props
      return (
        <div ref={this.ref} className={className}>
          <div className="content">{children}</div>
          {this.renderMenuList()}
        </div>
      )
    }
  }
)`
  display: flex;
  width: 100%;

  .menu-list {
    width: 180px;
    min-width: 180px;
    list-style: none;
    border-left: 1px solid #eee;

    li {
      line-height: 25px;
      font-size: 14px;
      padding-left: 10px;
      border-left: 3px solid transparent;
      margin-left: -2px;
      &.active {
        border-left: 3px solid #2d90ca;
      }
      a {
        color: #666;
        text-decoration: none;
        span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .content {
    flex-shrink: 3;
    width: calc(100% - 240px);
  }
  @media (max-width: 860px) {
    .sticky-wrapper {
      display: none;
    }
    .content {
      width: 100%;
    }
  }
`
