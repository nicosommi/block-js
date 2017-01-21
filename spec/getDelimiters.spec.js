import getDelimiters from '../source/lib/getDelimiters'

describe('Blocks(blockName)', () => {
  it('should detect the delimiters for a js file', () => {
      const delimiters = getDelimiters('script.js')
      delimiters.start.should.equal('/*')
      delimiters.end.should.equal('*/')
    })
});
