"use strict";

exports.__esModule = true;
exports.humanize = void 0;

var _capitalize = _interopRequireDefault(require("capitalize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RE_OBJECTOF = /(?:React\.)?(?:PropTypes\.)?objectOf\((?:React\.)?(?:PropTypes\.)?(\w+)\)/;

var getTypeStr = function getTypeStr(type) {
  switch (type.name.toLowerCase()) {
    case "instanceof":
      return "Class(" + type.value + ")";

    case "enum":
      if (type.computed) return type.value;
      return type.value ? type.value.map(function (v) {
        return "" + v.value;
      }).join(" │ ") : type.raw;

    case "union":
      return type.value ? type.value.map(function (t) {
        return "" + getTypeStr(t);
      }).join(" │ ") : type.raw;

    case "array":
      return type.raw;

    case "arrayof":
      return "Array<" + getTypeStr(type.value) + ">";

    case "custom":
      if (type.raw.indexOf("function") !== -1 || type.raw.indexOf("=>") !== -1) return "Custom(Function)";else if (type.raw.toLowerCase().indexOf("objectof") !== -1) {
        var m = type.raw.match(RE_OBJECTOF);
        if (m && m[1]) return "ObjectOf(" + (0, _capitalize.default)(m[1]) + ")";
        return "ObjectOf";
      }
      return "Custom";

    case "bool":
      return "Boolean";

    case "func":
      return "Function";

    case "shape":
      var shape = type.value;
      var rst = {};
      Object.keys(shape).forEach(function (key) {
        rst[key] = getTypeStr(shape[key]);
      });
      return JSON.stringify(rst, null, 2);

    default:
      return (0, _capitalize.default)(type.name);
  }
};

var humanize = function humanize(type) {
  return getTypeStr(type);
};

exports.humanize = humanize;