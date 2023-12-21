// import { testFunction, setConfig } from '../src/functions';

import {WpSite} from "../lib/types";
import {setConfig, wpTestFunction, wpRequestPosts} from "../lib/functions";


describe('testFunction', () => {
  // Reset the configuration before each test
  beforeEach(() => {
    setConfig({
      url: undefined,
      wpGraphqlUrl: undefined,
    });
  });

  it('returns undefined when wpGraphqlUrl is not set', () => {
    const result = wpTestFunction();
    expect(result).toBeUndefined();
  });

  it('returns the wpGraphqlUrl when set', () => {
    const testUrl = 'http://example.com/graphql';
    setConfig({
      url: 'http://example.com',
      wpGraphqlUrl: testUrl,
    });

    const result = wpTestFunction();
    expect(result).toBe(testUrl);
  });
});

describe('wpRequestPosts', () => {
  // Set configuration before tests
  beforeEach(() => {
    setConfig({
      url: 'https://pagecarbajal.com/',
      wpGraphqlUrl: 'https://pagecarbajal.com/graphql',
    });
  });

  it('Returns posts', async () => {
    const response = await wpRequestPosts({pageSize: 3});
    //console.log('Response: ', response?.posts?.nodes ?? []);
    expect(response).toHaveProperty('posts.nodes');
  });
});
