<!-- ph replacements -->
<!-- name, /block-js/g, block-js -->
<!-- namePascal, /Block-js/g, Block-js -->
<!-- endph -->
<!-- ph ignoringStamps -->
<!-- endph -->
<!-- ph title -->
# Block Js.js [![npm version](https://img.shields.io/npm/v/block-js.svg)](https://www.npmjs.com/package/block-js) [![license type](https://img.shields.io/npm/l/block-js.svg)](https://github.com/nicosommi/block-js.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/block-js.svg)](https://www.npmjs.com/package/block-js) ![ECMAScript 6 & 5](https://img.shields.io/badge/ECMAScript-6%20/%205-red.svg) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
<!-- endph -->

<!-- ph description -->
Block-js is an utility to get an array of blocks within a file with their contents, their name, the start and the end line.

A block is a set of lines that starts with a line with the format /\* blockassignedname blockspecificname \*/ and ends with a line with the format /\* endblockassignedname \*/
<!-- endph -->

<!-- ph usagesAndExamples -->
Let's see an es6 javascript example with a block that is called region:

```javascript
const descriptionAsked = Symbol("descriptionAsked");
class Character {
	/* region constructor */
	constructor() {
		this.name = "Patoruzito";
		this.descriptionAsked = 0;
	}
	/* endregion */

	/* region privateMethods */
	[descriptionAsked]() {
		this.descriptionAsked++;
	}
	/* endregion */

	/* region publicProperties */
	get statistic() {
		return this.descriptionAsked;
	}

	get description() {
		this[descriptionAsked]();
		return `${this.name}: an Argentinian classic comic book character. Usa poncho.`;
	}
	/* endregion */

	/* region publicMethods */
	toJSON() {
		const name = this.name;
		const statistics = this.statistics;
		return {
			name,
			statistic
		};
	}
	/* endregion */
}
```

This is one example use case in which it can be used to create an IDE plugin to expand/collapse regions within a file so it can be easily read and organized.
Also it can be used, for example, to interpolate blocks between files.

To parse that file we will do something like this:

```javascript
import Blocks from "block-js";

const blocks = new Blocks("script.js", "region");
blocks.extractBlocks();
/*
this will output an array like this
[
	{
		from: 3,
		to: 8,
		name: "constructor",
		content: "...source code including special chars like \t or \n..."
	}, {
		...
	}, {
		...
	}
]
*/
```

Block-js will automatically detect comment delimiters for some file extensions, but it can be also specified as the third argument like this:

```javascript
const blocks = new Blocks("script.js", "region", { start: "/*", end: "*/" });
```

<!-- endph -->
<!-- ph howItWorks -->
<!-- endph -->
<!-- ph qualityAndCompatibility -->
# Quality and Compatibility

[![Build Status](https://travis-ci.org/nicosommi/block-js.png?branch=master)](https://travis-ci.org/nicosommi/block-js) [![Coverage Status](https://coveralls.io/repos/nicosommi/block-js/badge.svg)](https://coveralls.io/r/nicosommi/block-js)  [![bitHound Score](https://www.bithound.io/github/nicosommi/block-js/badges/score.svg)](https://www.bithound.io/github/nicosommi/block-js)  [![Dependency Status](https://david-dm.org/nicosommi/block-js.png?theme=shields.io)](https://david-dm.org/nicosommi/block-js?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/nicosommi/block-js/dev-status.svg)](https://david-dm.org/nicosommi/block-js?theme=shields.io#info=devDependencies)

*Every build and release is automatically tested on the following platforms:*

![node 0.12.x](https://img.shields.io/badge/node-0.12.x-brightgreen.svg) ![node 0.11.x](https://img.shields.io/badge/node-0.11.x-brightgreen.svg) ![node 0.10.x](https://img.shields.io/badge/node-0.10.x-brightgreen.svg)
![iojs 2.x.x](https://img.shields.io/badge/iojs-2.x.x-brightgreen.svg) ![iojs 1.x.x](https://img.shields.io/badge/iojs-1.x.x-brightgreen.svg)
<!-- endph -->
<!-- ph installation -->
# Installation

Copy and paste the following command into your terminal to install Gene-js:

```
npm install gene-js --save-dev
```

<!-- endph -->
<!-- stamp contribute -->
# How to Contribute

You can submit your ideas through our [issues system](https://github.com/nicosommi/gene-js/issues), or make the modifications yourself and submit them to us in the form of a [GitHub pull request](https://help.github.com/articles/using-pull-requests/).

Also I accept [donations](http://nicosommi.com). If this component helps you out, it will be enough for me, but if you want to show me how much did it helped you by giving me some money, it will be great for me and my dog, who wants to eat. But seriously I rely on that to keep going with the development.
I also offer [services](http://integracionesagiles.com) like consultation, development help, mentoring, etc.
<!-- endstamp -->
<!-- stamp runningtests -->
## Running Tests

It's easy to run the test suite locally, and *highly recommended* if you're using gene-js on a platform we aren't automatically testing for.

```
npm test
```
<!-- endstamp -->
