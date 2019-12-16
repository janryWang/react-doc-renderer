"use strict";

var _react = _interopRequireWildcard(require("react"));

var _elevator = _interopRequireDefault(require("./elevator"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var readmeRE = /readme.md/i;

var toArr = function toArr(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
};

if (window.parent) {
  document.addEventListener("click", function (e) {
    if (e.target.tagName == "A" || e.target.tagName == "a") {
      if (e.target.pathname === window.location.pathname && e.target.hash.indexOf("#/") > -1) {
        e.preventDefault();
        window.top.postMessage({
          type: "click",
          url: e.target.hash
        }, "*");
      }
    }
  });
}

var ReactDocRenderer = function ReactDocRenderer(_ref) {
  var docs = _ref.docs;
  var max = docs.length + 1000;
  var sortedDocs = toArr(docs).map(function (item) {
    item.meta.index = item.meta.index !== undefined ? item.meta.index : item.meta.order;
    return item;
  }).sort(function (_ref2, _ref3) {
    var _ref2$meta = _ref2.meta,
        meta_after = _ref2$meta === void 0 ? {} : _ref2$meta;
    var _ref3$meta = _ref3.meta,
        meta_prev = _ref3$meta === void 0 ? {} : _ref3$meta;

    if (meta_after.index && meta_prev.index) {
      return meta_after.index - meta_prev.index;
    } else {
      if (!meta_after.index) {
        max += 1;
        meta_after.index = max;
      }

      if (!meta_prev.index) {
        max += 2;
        meta_prev.index = max;
      }

      return meta_after.index - meta_prev.index;
    }
  });
  return _react["default"].createElement("div", {
    style: {
      margin: "30px 20px"
    }
  }, _react["default"].createElement(_elevator["default"], null, _react["default"].createElement("div", {
    className: "doc-renderer markdown-body site-body"
  }, sortedDocs.map(function (_ref4, key) {
    var component = _ref4.component;
    return _react["default"].createElement(component, {
      key: "readme-" + key
    });
  }))));
};

ReactDocRenderer.propTypes = {
  /**
    This is document collection.
  */
  docs: _propTypes["default"].array.isRequired
};
module.exports = ReactDocRenderer;