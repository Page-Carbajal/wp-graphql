// import { testFunction, setConfig } from '../src/functions';

import {WpSite} from "../lib/types";
import {setConfig, testFunction} from "../lib/functions";


describe('testFunction', () => {
  // Reset the configuration before each test
  beforeEach(() => {
    setConfig({
      url: undefined,
      wpGraphqlUrl: undefined,
    });
  });

  it('returns undefined when wpGraphqlUrl is not set', () => {
    const result = testFunction();
    expect(result).toBeUndefined();
  });

  it('returns the wpGraphqlUrl when set', () => {
    const testUrl = 'http://example.com/graphql';
    setConfig({
      url: 'http://example.com',
      wpGraphqlUrl: testUrl,
    });

    const result = testFunction();
    expect(result).toBe(testUrl);
  });
});
