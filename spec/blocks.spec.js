import Blocks from "../source/lib/blocks.js";

describe("Blocks(blockName)", () => {
	describe("(cross language)", () => {
		it("should detect the delimiters for a js file", () => {
			const blocks = new Blocks("script.js", "ph");
			blocks.startBlockString.should.equal("/*");
			blocks.endBlockString.should.equal("*/");
		});

		it("should detect the delimiters for an html file", () => {
			const blocks = new Blocks("index.html", "ph");
			blocks.startBlockString.should.equal("<!--");
			blocks.endBlockString.should.equal("-->");
		});

		it("should detect the delimiters for a md file", () => {
			const blocks = new Blocks("index.md", "ph");
			blocks.startBlockString.should.equal("<!--");
			blocks.endBlockString.should.equal("-->");
		});

		it("should detect the delimiters for a java file", () => {
			const blocks = new Blocks("index.java", "ph");
			blocks.startBlockString.should.equal("/*");
			blocks.endBlockString.should.equal("*/");
		});

		it("should detect the delimiters for a css file", () => {
			const blocks = new Blocks("index.css", "ph");
			blocks.startBlockString.should.equal("/*");
			blocks.endBlockString.should.equal("*/");
		});

		it("should detect the delimiters for a yml file", () => {
			const blocks = new Blocks("index.yml", "ph");
			blocks.startBlockString.should.equal("##-");
			blocks.endBlockString.should.equal("-##");
		});

		it("should detect the delimiters for a py file", () => {
			const blocks = new Blocks("index.py", "ph");
			blocks.startBlockString.should.equal("##-");
			blocks.endBlockString.should.equal("-##");
		});

		it("should detect the delimiters for a .gitignore file", () => {
			const blocks = new Blocks(".gitignore", "ph", { start: "##-", end: "-##" });
			blocks.startBlockString.should.equal("##-");
			blocks.endBlockString.should.equal("-##");
		});

		it("should support custom delimiters", () => {
			const blocks = new Blocks(".eslintrc", "ph", { start: "##-", end: "-##" });
			blocks.startBlockString.should.equal("##-");
			blocks.endBlockString.should.equal("-##");
		});

		it("should support default delimiters", () => {
			const blocks = new Blocks(".babelrc", "ph");
			blocks.startBlockString.should.equal("##-");
			blocks.endBlockString.should.equal("-##");
		});
	});

	describe("(properties)", () => {
		it("should set the block identificator name correctly", () => {
			const blocks = new Blocks("index.html", "ph");
			blocks.blockName.should.equal("ph");
		});
	});

	describe(".extractBlocks()", () => {

		describe("(.js)", () => {
			let concreteBlockFileName;
			let blocks;

			describe("(existing file and blocks)", () => {
				let expectedValue;

				beforeEach(() => {
					concreteBlockFileName = `${__dirname}/../fixtures/blocks/concrete.js`;
					blocks = new Blocks(concreteBlockFileName, "block");
					expectedValue = [
						{
							from: 2,
							to: 6,
							name: "blockTop",
							content: "\tconstructor() {\n\t\tthis.block = true;\n\t}"
						}, {
							from: 10,
							to: 12,
							name: "blockMiddle",
							content: "\t\tinput = \"you got this block\";"
						}, {
							from: 16,
							to: 20,
							content: "\teat() {\n\t\treturn \"yum\";\n\t}",
							name: "blockBottom"
						}
					];
				});

				it("should return all blocks with that name within a file", () => {
					return blocks.extractBlocks()
						.should.be.fulfilledWith(expectedValue);
				});
			});

			describe("(no name provided)", () => {
				beforeEach(() => {
					concreteBlockFileName = `${__dirname}/../fixtures/blocks/noname.js`;
					blocks = new Blocks(concreteBlockFileName, "block");
				});

				it("should return the appropiate error", () => {
					return blocks.extractBlocks()
						.should.be.rejectedWith(new RegExp(`Block without a name in file ${concreteBlockFileName}`));
				});
			});

			describe("(unexisting file)", () => {
				beforeEach(() => {
					concreteBlockFileName = `${__dirname}/../fixtures/blocks/unexisting.js`;
					blocks = new Blocks(concreteBlockFileName, "block");
				});

				it("should return ENOENT error", () => {
					return blocks.extractBlocks()
						.should.be.rejectedWith(/ENOENT/);
				});
			});
		});

		describe("(.html)", () => {
			let concreteBlockFileName;
			let blocks;

			beforeEach(() => {
				concreteBlockFileName = `${__dirname}/../fixtures/blocks/concrete.html`;
				blocks = new Blocks(concreteBlockFileName, "block");
			});

			describe("(existing file and blocks)", () => {
				let expectedValue;

				beforeEach(() => {
					expectedValue = [
						{
							from: 9,
							to: 13,
							name: "blockRegion",
							content: "\t\t<div>\n\t\t\tA block region\n\t\t</div>"
						}, {
							from: 17,
							to: 21,
							name: "blockRegion2",
							content: "\t\t<div>\n\t\t\tA block region number 2\n\t\t</div>"
						}
					];
				});

				it("should return all blocks with that name within a file", () => {
					return blocks.extractBlocks()
						.should.be.fulfilledWith(expectedValue);
				});
			});
		});

		describe("(.css)", () => {
			let concreteBlockFileName;
			let blocks;

			beforeEach(() => {
				concreteBlockFileName = `${__dirname}/../fixtures/blocks/concrete.css`;
				blocks = new Blocks(concreteBlockFileName, "block");
			});

			describe("(existing file and blocks)", () => {
				let expectedValue;

				beforeEach(() => {
					expectedValue = [
						{
							from: 1,
							to: 5,
							name: "blockRegion",
							content: ".class1 {\n\tfont-family: \"Arial\"\n}"
						}, {
							from: 13,
							to: 15,
							name: "blockRegion2",
							content: "\tfont-family: \"Arial\""
						}
					];
				});

				it("should return all blocks with that name within a file", () => {
					return blocks.extractBlocks()
						.should.be.fulfilledWith(expectedValue);
				});
			});
		});
	});
});
