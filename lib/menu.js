"use strict";

exports.__esModule = true;
exports.MenuContent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactStikky = _interopRequireDefault(require("react-stikky"));

var _slugify = _interopRequireDefault(require("slugify"));

var _temp2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  width: 100%;\n\n  .menu-list {\n    width: 180px;\n    min-width: 180px;\n    list-style: none;\n    border-left: 1px solid #eee;\n\n    li {\n      line-height: 25px;\n      font-size: 14px;\n      padding-left: 10px;\n      border-left: 3px solid transparent;\n      margin-left: -2px;\n      &.active {\n        border-left: 3px solid #2d90ca;\n      }\n      a {\n        color: #666;\n        text-decoration: none;\n        span {\n          display: block;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n        }\n      }\n    }\n  }\n  .content {\n    flex-shrink: 3;\n    width: calc(100% - 240px);\n  }\n  @media (max-width: 860px) {\n    .sticky-wrapper {\n      display: none;\n    }\n    .content {\n      width: 100%;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var findMinLevel = function findMinLevel(list) {
  return list.reduce(function (min, _ref) {
    var level = _ref.level;
    return level <= min ? level : min;
  }, list[0] ? list[0].level : 1);
};

var isElementInViewport = function isElementInViewport(rect, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      _ref2$offset = _ref2.offset,
      offset = _ref2$offset === void 0 ? 0 : _ref2$offset,
      _ref2$threshold = _ref2.threshold,
      threshold = _ref2$threshold === void 0 ? 0 : _ref2$threshold;

  var top = rect.top,
      right = rect.right,
      bottom = rect.bottom,
      left = rect.left,
      width = rect.width,
      height = rect.height;
  var intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  };
  var elementThreshold = {
    x: threshold * width,
    y: threshold * height
  };
  return intersection.t >= (offset.top || offset + elementThreshold.y) && intersection.r >= (offset.right || offset + elementThreshold.x) && intersection.b >= (offset.bottom || offset + elementThreshold.y) && intersection.l >= (offset.left || offset + elementThreshold.x);
};

var MenuContent = (0, _styledComponents.default)((_temp2 =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MenuContent, _Component);

  function MenuContent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ref", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      dataSource: [],
      pathname: _this.getPathName()
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hashChangeHandler", function () {
      _this.setState({
        pathname: _this.getPathName()
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollHandler", function () {
      requestAnimationFrame(function () {
        _this.state.dataSource.forEach(function (_ref3) {
          var el = _ref3.el,
              slug = _ref3.slug;

          if (isElementInViewport(el.getBoundingClientRect())) {
            _this.setState({
              pathname: slug
            });
          }
        });
      });
    });

    return _this;
  }

  var _proto = MenuContent.prototype;

  _proto.renderMenuList = function renderMenuList() {
    var _this2 = this;

    var dataSource = this.state.dataSource;
    return _react.default.createElement(_reactStikky.default, {
      edge: "top",
      triggerDistance: 50,
      zIndex: 10
    }, _react.default.createElement("ul", {
      className: "menu-list"
    }, dataSource.map(function (_ref4, key) {
      var slug = _ref4.slug,
          text = _ref4.text;
      return _react.default.createElement("li", {
        key: key,
        className: "" + (_this2.state.pathname === slug ? "active" : "")
      }, _react.default.createElement("a", {
        href: "#" + slug
      }, _react.default.createElement("span", null, text)));
    })));
  };

  _proto.loadDataSource = function loadDataSource(element) {
    var list = Array.prototype.map.call(element.querySelectorAll("h1,h2,h3,h4,h5"), function (el) {
      var level = parseInt(el.tagName.charAt(1));
      var slug = el.id;
      return {
        level: level,
        slug: slug,
        text: el.textContent,
        el: el
      };
    });
    var minLevel = findMinLevel(list);
    var newList = list.filter(function (_ref5) {
      var level = _ref5.level;
      return level === minLevel;
    });
    this.setState({
      dataSource: newList
    });
  };

  _proto.getPathName = function getPathName() {
    return decodeURIComponent(window.location.hash.slice(1));
  };

  _proto.componentDidMount = function componentDidMount() {
    if (this.ref && this.ref.current) {
      this.loadDataSource(this.ref.current);
    }

    window.addEventListener("scroll", this.scrollHandler);
    window.addEventListener("hashchange", this.hashChangeHandler);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
    window.removeEventListener("hashchange", this.hashChangeHandler);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children;
    return _react.default.createElement("div", {
      ref: this.ref,
      className: className
    }, _react.default.createElement("div", {
      className: "content"
    }, children), this.renderMenuList());
  };

  return MenuContent;
}(_react.Component), _temp2))(_templateObject());
exports.MenuContent = MenuContent;