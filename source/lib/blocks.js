import fs from 'fs'
import path from 'path'
import readline from 'readline'
import Promise from './promise.js'
import _ from 'incognito'
import getDelimiters from './getDelimiters.js'

const getBlockName = Symbol('getBlockName')
const isAnEndBlock = Symbol('isAnEndBlock')
const isAnStartBlock = Symbol('isAnStartBlock')

export {
  getDelimiters
}

export default class Blocks {

  constructor (filePath, blockName, customDelimiters) {
    _(this).blockName = blockName
    _(this).filePath = filePath

    const currentDelimiter = getDelimiters(filePath, customDelimiters)

    this.startBlockString = currentDelimiter.start
    this.endBlockString = currentDelimiter.end

    this.regexStart = currentDelimiter.start.replace(/\/\*/g, '\\/\\*')
    this.regexEnd = currentDelimiter.end.replace(/\*\//g, '\\*\\/')
  }

  get blockName () {
    return _(this).blockName
  }

  /*
  * returns the block name
  */
  [ getBlockName ] (lineString) {
    this.regexStartBlock = new RegExp(`\\s*${this.regexStart}\\s*${_(this).blockName}\\s+(\\w+)\\s*${this.regexEnd}\\s*`, 'g')
    const matches = this.regexStartBlock.exec(lineString)
    if (matches && matches.length > 0) {
      return matches[1]
    } else {
      throw new Error(`Block without a name in file ${_(this).filePath}`)
    }
  }

  /*
  * returns true if the line is a block end
  */
  [ isAnEndBlock ] (lineString) {
    this.regexEndBlock = new RegExp(`\\s*${this.regexStart}\\s*end${_(this).blockName}\\s*${this.regexEnd}\\s*`, 'g')
    return this.regexEndBlock.test(lineString)
  }

  /*
  * returns true if the line is a block end
  */
  [ isAnStartBlock ] (lineString) {
    this.regexStartBlock = new RegExp(`\\s*${this.regexStart}\\s*${_(this).blockName}[\\s+\\w+]+\\s*${this.regexEnd}\\s*`, 'g')
    return this.regexStartBlock.test(lineString)
  }

  /*
  * returns the blocks from a certain file
  */
  extractBlocks () {
    return new Promise((resolve, reject) => {
      const result = []

      // iterate file lines
      const input = fs.createReadStream(_(this).filePath, { encoding: 'utf8' })
      const lineReader = readline.createInterface({input})
      let lineNumber = 0
      let block = null
      lineReader.on('line', lineString => {
        // name, from, to, content
        // detect block start
        // activate inside block flag
        if (!block && this[isAnStartBlock](lineString)) {
          try {
            const name = this[getBlockName](lineString)
            block = {from: (lineNumber + 1), name}
          } catch (e) {
            return reject(e)
          }
        // detect block end
        } else if (block && this[isAnEndBlock](lineString)) {
          block.to = (lineNumber + 1)
          // add block to result
          result.push(block)
          // deactivate inside block
          block = null
        } else if (block && !block.content) {
          block.content = lineString
        } else if (block && block.content) {
          block.content += `\n${lineString}`
        }

        lineNumber++
      })

      input.on('error', (error) => {
        reject(error)
      })

      lineReader.on('close', () => {
        lineReader.close()
        resolve(result)
      })
    })
  }
}
