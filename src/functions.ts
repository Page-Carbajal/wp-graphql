import {WpGraphQlRequest, WpSite} from "./types";


const wordpressSite: WpSite = {
  url: undefined,
  wpGraphqlUrl: undefined
}

export const setConfig = (site: WpSite): void => {

  console.log('Site: ', site);

  wordpressSite.url = site.url;
  wordpressSite.wpGraphqlUrl = site.wpGraphqlUrl;
}


export const wpTestFunction = (): string | undefined => {
  console.log('GraphQL Url: ', wordpressSite.wpGraphqlUrl);

  return wordpressSite.wpGraphqlUrl;
}


async function fetchAPI(query: string, {variables}: any = {}) {

  if (!wordpressSite.wpGraphqlUrl) {
    console.log('********** GRAPHQL_URL IS UNDEFINED ************');

    return {data: null};
  }


  const headers = {'Content-Type': 'application/json'};
  const res = await fetch(wordpressSite.wpGraphqlUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({query, variables}),
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
export async function wpSiteInfo(): Promise<{ title: string, description: string }> {
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


export async function wpRequestPosts(args: WpGraphQlRequest): Promise<any> {
  const pageSize = args?.pageSize ?? 100;
  const categoryFilter = !args?.categoryId ? '' : `, categoryId: ${args.categoryId}`;
  const defaultFields = ['databaseId', 'date', 'slug', 'title', 'excerpt', 'content'];
  const fields = Array.isArray(args?.fields) ? args.fields.join(' ') : defaultFields.join(' ');
  const status = !args?.status ? 'PUBLISH' : args.status;
  const payload = `
    {
    posts(first: ${pageSize}, where: {status:  ${status} ${categoryFilter}}) {
      nodes {
        ${fields}
      }
    }
  }
  `;
  const request = await fetchAPI(payload);
}
