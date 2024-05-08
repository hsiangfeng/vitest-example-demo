import {
  describe,
  it,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach
} from 'vitest';

const cacheData = []
describe('測試生命週期', () => {
  beforeAll(() => {
    cacheData.push('beforeAll')
  });

  beforeEach(() => {
    cacheData.push('beforeEach')
  }) 
  it('測試一號', () => {
    cacheData.push('it 測試一號')
  })
  it('測試二號', () => {
    cacheData.push('it 測試二號')
  })
  it('測試三號', () => {
    cacheData.push('it 測試三號')
  })

  afterEach(() => {
    cacheData.push('afterEach')
  })
  
  afterAll(() => {
    cacheData.push('afterAll')
    console.log('cacheData', cacheData);
  })
})
