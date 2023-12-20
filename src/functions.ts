import {WpSite} from "./types";


const wordpressSite: WpSite = {
  url: undefined,
  wpGraphqlUrl: undefined,
}

export const setConfig = (site: WpSite): void => {
  wordpressSite.url = site.url;
  wordpressSite.wpGraphqlUrl = site.wpGraphqlUrl;
}


export const testFunction = (): void =>{
  console.log('GraphQL Url: ', wordpressSite.wpGraphqlUrl);
}


async function fetchAPI(query: string, { variables }:any = {}) {

  if( !wordpressSite.wpGraphqlUrl ){
    console.log('********** GRAPHQL_URL IS UNDEFINED ************');

    return {data: null};
  }


  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(wordpressSite.wpGraphqlUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}


/**
 *
 */
export async function wpSiteInfo(): Promise<{title: string, description: string}>{
  const data = await fetchAPI(`
  {
    generalSettings {
      title
      description
    }
  }
  `);

  return data?.generalSettings;
}


/**
 *
 * @param categoryId
 */
export async function wpPublishedPostsSlugsByCategoryId(categoryId: number) {

  const data = await fetchAPI(`
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

  return data?.posts;
}


/**
 *
 * @param slug
 */
export async function wpPostBySlug(slug: string) {
  const data = await fetchAPI(`
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
  return data?.post;
}


/**
 *
 * @param categoryId
 */
export async function wpLatestPublishedPostsByCategoryId(categoryId: number) {
  const data = await fetchAPI(`
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

  return data?.posts;
}

