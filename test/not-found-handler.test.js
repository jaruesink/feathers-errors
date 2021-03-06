import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { errors } from '../src';
import handler from '../src/not-found-handler';

if (!global._babelPolyfill) { require('babel-polyfill'); }

chai.use(sinonChai);

const mockRequest = {};
const mockResponse = {};
const mockNext = sinon.spy(() => {});

describe('not-found-handler', () => {
  it('is CommonJS compatible', () => {
    expect(typeof require('../lib/not-found-handler')).to.equal('function');
  });

  it('can be required at the root', () => {
    expect(typeof require('../not-found')).to.equal('function');
  });

  it('is import compatible', () => {
    expect(typeof handler).to.equal('function');
  });

  it.skip('returns NotFound error', () => {
    handler()(mockRequest, mockResponse, mockNext);
    expect(mockNext).to.have.been.calledWith(new errors.NotFound());
  });
});
