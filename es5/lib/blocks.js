"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _readline = require("readline");

var _readline2 = _interopRequireDefault(_readline);

var _promise = require("./promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getBlockName = Symbol("getBlockName");
var isAnEndBlock = Symbol("isAnEndBlock");
var isAnStartBlock = Symbol("isAnStartBlock");

var delimiters = {
	".js": {
		"start": "/*",
		"end": "*/"
	},
	".java": {
		"start": "/*",
		"end": "*/"
	},
	".html": {
		"start": "<!--",
		"end": "-->"
	},
	".md": {
		"start": "<!--",
		"end": "-->"
	},
	".css": {
		"start": "/*",
		"end": "*/"
	},
	".yml": {
		"start": "##-",
		"end": "-##"
	},
	".gitignore": {
		"start": "##-",
		"end": "-##"
	},
	"default": {
		"start": "##-",
		"end": "-##"
	}
};

var Blocks = function () {
	function Blocks(filePath, blockName, customDelimiters) {
		_classCallCheck(this, Blocks);

		_get__("_")(this).blockName = blockName;
		_get__("_")(this).filePath = filePath;

		var extension = _get__("path").extname(filePath);

		var currentDelimiter = void 0;
		if (customDelimiters) {
			currentDelimiter = customDelimiters;
		} else {
			if (!_get__("delimiters")[extension]) {
				currentDelimiter = _get__("delimiters").default;
			} else {
				currentDelimiter = _get__("delimiters")[extension];
			}
		}

		this.startBlockString = currentDelimiter.start;
		this.endBlockString = currentDelimiter.end;

		this.regexStart = currentDelimiter.start.replace(/\/\*/g, "\\/\\*");
		this.regexEnd = currentDelimiter.end.replace(/\*\//g, "\\*\\/");
	}

	_createClass(Blocks, [{
		key: getBlockName,


		/*
  * returns the block name
  */
		value: function value(lineString) {
			this.regexStartBlock = new RegExp("\\s*" + this.regexStart + "\\s*" + _get__("_")(this).blockName + "\\s+(\\w+)\\s*" + this.regexEnd + "\\s*", "g");
			var matches = this.regexStartBlock.exec(lineString);
			if (matches && matches.length > 0) {
				return matches[1];
			} else {
				throw new Error("Block without a name in file " + _get__("_")(this).filePath);
			}
		}

		/*
  * returns true if the line is a block end
  */

	}, {
		key: isAnEndBlock,
		value: function value(lineString) {
			this.regexEndBlock = new RegExp("\\s*" + this.regexStart + "\\s*end" + _get__("_")(this).blockName + "\\s*" + this.regexEnd + "\\s*", "g");
			return this.regexEndBlock.test(lineString);
		}

		/*
  * returns true if the line is a block end
  */

	}, {
		key: isAnStartBlock,
		value: function value(lineString) {
			this.regexStartBlock = new RegExp("\\s*" + this.regexStart + "\\s*" + _get__("_")(this).blockName + "[\\s+\\w+]+\\s*" + this.regexEnd + "\\s*", "g");
			return this.regexStartBlock.test(lineString);
		}

		/*
  * returns the blocks from a certain file
  */

	}, {
		key: "extractBlocks",
		value: function extractBlocks() {
			var _this = this;

			return new (_get__("Promise"))(function (resolve, reject) {
				var result = [];

				// iterate file lines
				var input = _get__("fs").createReadStream(_get__("_")(_this).filePath, { encoding: "utf8" });
				var lineReader = _get__("readline").createInterface({ input: input });
				var lineNumber = 0;
				var block = null;
				lineReader.on("line", function (lineString) {
					// name, from, to, content
					// detect block start
					// activate inside block flag
					if (!block && _this[isAnStartBlock](lineString)) {
						try {
							var name = _this[getBlockName](lineString);
							block = { from: lineNumber + 1, name: name };
						} catch (e) {
							return reject(e);
						}
						// detect block end
					} else if (block && _this[isAnEndBlock](lineString)) {
							block.to = lineNumber + 1;
							// add block to result
							result.push(block);
							// deactivate inside block
							block = null;
						} else if (block && !block.content) {
							block.content = lineString;
						} else if (block && block.content) {
							block.content += "\n" + lineString;
						}

					lineNumber++;
				});

				input.on("error", function (error) {
					reject(error);
				});

				lineReader.on("close", function () {
					lineReader.close();
					resolve(result);
				});
			});
		}
	}, {
		key: "blockName",
		get: function get() {
			return _get__("_")(this).blockName;
		}
	}]);

	return Blocks;
}();

exports.default = Blocks;
var _RewiredData__ = {};
var _RewireAPI__ = {};

(function () {
	function addPropertyToAPIObject(name, value) {
		Object.defineProperty(_RewireAPI__, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}

	addPropertyToAPIObject('__get__', _get__);
	addPropertyToAPIObject('__GetDependency__', _get__);
	addPropertyToAPIObject('__Rewire__', _set__);
	addPropertyToAPIObject('__set__', _set__);
	addPropertyToAPIObject('__reset__', _reset__);
	addPropertyToAPIObject('__ResetDependency__', _reset__);
	addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
	return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
}

function _get_original__(variableName) {
	switch (variableName) {
		case "_":
			return _incognito2.default;

		case "path":
			return _path2.default;

		case "delimiters":
			return delimiters;

		case "Promise":
			return _promise2.default;

		case "fs":
			return _fs2.default;

		case "readline":
			return _readline2.default;
	}

	return undefined;
}

function _assign__(variableName, value) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _set_original__(variableName, value);
	} else {
		return _RewiredData__[variableName] = value;
	}
}

function _set_original__(variableName, _value) {
	switch (variableName) {}

	return undefined;
}

function _update_operation__(operation, variableName, prefix) {
	var oldValue = _get__(variableName);

	var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

	_assign__(variableName, newValue);

	return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
	return _RewiredData__[variableName] = value;
}

function _reset__(variableName) {
	delete _RewiredData__[variableName];
}

function _with__(object) {
	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function (variableName) {
			_RewiredData__[variableName] = previousValues[variableName];
		});
	}

	return function (callback) {
		rewiredVariableNames.forEach(function (variableName) {
			previousValues[variableName] = _RewiredData__[variableName];
			_RewiredData__[variableName] = object[variableName];
		});
		var result = callback();

		if (!!result && typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}

		return result;
	};
}

var _typeOfOriginalExport = typeof Blocks === "undefined" ? "undefined" : _typeof(Blocks);

function addNonEnumerableProperty(name, value) {
	Object.defineProperty(Blocks, name, {
		value: value,
		enumerable: false,
		configurable: true
	});
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Blocks)) {
	addNonEnumerableProperty('__get__', _get__);
	addNonEnumerableProperty('__GetDependency__', _get__);
	addNonEnumerableProperty('__Rewire__', _set__);
	addNonEnumerableProperty('__set__', _set__);
	addNonEnumerableProperty('__reset__', _reset__);
	addNonEnumerableProperty('__ResetDependency__', _reset__);
	addNonEnumerableProperty('__with__', _with__);
	addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;