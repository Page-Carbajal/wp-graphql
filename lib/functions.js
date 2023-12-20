"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wpLatestPublishedPostsByCategoryId = exports.wpPostBySlug = exports.wpPublishedPostsSlugsByCategoryId = exports.wpSiteInfo = exports.testFunction = exports.setConfig = void 0;
const wordpressSite = {
    url: undefined,
    wpGraphqlUrl: undefined,
};
const setConfig = (site) => {
    wordpressSite.url = site.url;
    wordpressSite.wpGraphqlUrl = site.wpGraphqlUrl;
};
exports.setConfig = setConfig;
const testFunction = () => {
    console.log('GraphQL Url: ', wordpressSite.wpGraphqlUrl);
};
exports.testFunction = testFunction;
function fetchAPI(query, { variables } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!wordpressSite.wpGraphqlUrl) {
            console.log('********** GRAPHQL_URL IS UNDEFINED ************');
            return { data: null };
        }
        const headers = { 'Content-Type': 'application/json' };
        const res = yield fetch(wordpressSite.wpGraphqlUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query, variables }),
        });
        const json = yield res.json();
        if (json.errors) {
            console.log(json.errors);
            throw new Error('Failed to fetch API');
        }
        return json.data;
    });
}
/**
 *
 */
function wpSiteInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchAPI(`
  {
    generalSettings {
      title
      description
    }
  }
  `);
        return data === null || data === void 0 ? void 0 : data.generalSettings;
    });
}
exports.wpSiteInfo = wpSiteInfo;
/**
 *
 * @param categoryId
 */
function wpPublishedPostsSlugsByCategoryId(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchAPI(`
  {
    posts(where: {status: PUBLISH, categoryId: ${categoryId}}, first: 1000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
        return data === null || data === void 0 ? void 0 : data.posts;
    });
}
exports.wpPublishedPostsSlugsByCategoryId = wpPublishedPostsSlugsByCategoryId;
/**
 *
 * @param slug
 */
function wpPostBySlug(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchAPI(`
  {
    post(id: "${slug}", idType: SLUG) {
      id
      slug
      date
      title
      content(format: RENDERED)
      featuredImage {
        node {
          date
          slug
          altText
          caption
          sourceUrl
          guid
          fileSize
          mediaType
          mimeType
        }
      }
    }
  }
  `);
        return data === null || data === void 0 ? void 0 : data.post;
    });
}
exports.wpPostBySlug = wpPostBySlug;
/**
 *
 * @param categoryId
 */
function wpLatestPublishedPostsByCategoryId(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchAPI(`
  {
    posts(first: 100, where: {status: PUBLISH, categoryId: ${categoryId}}) {
      nodes {
        databaseId
        date
        slug
        title
        excerpt
        content
      }
    }
  }
  `);
        return data === null || data === void 0 ? void 0 : data.posts;
    });
}
exports.wpLatestPublishedPostsByCategoryId = wpLatestPublishedPostsByCategoryId;