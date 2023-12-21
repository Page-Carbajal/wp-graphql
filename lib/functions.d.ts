import { WpGraphQlRequest, WpSite } from "./types";
export declare const setConfig: (site: WpSite) => void;
export declare const wpTestFunction: () => string | undefined;
/**
 *
 */
export declare function wpSiteInfo(): Promise<{
    title: string;
    description: string;
}>;
/**
 *
 * @param categoryId
 */
export declare function wpPublishedPostsSlugsByCategoryId(categoryId: number): Promise<any>;
/**
 *
 * @param slug
 */
export declare function wpPostBySlug(slug: string): Promise<any>;
/**
 *
 * @param categoryId
 */
export declare function wpLatestPublishedPostsByCategoryId(categoryId: number): Promise<any>;
export declare function wpRequestPosts(args: WpGraphQlRequest): Promise<any>;
