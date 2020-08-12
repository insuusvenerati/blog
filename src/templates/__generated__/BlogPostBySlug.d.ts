/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPostBySlug
// ====================================================

export interface BlogPostBySlug_site_siteMetadata {
  title: string | null;
}

export interface BlogPostBySlug_site {
  siteMetadata: BlogPostBySlug_site_siteMetadata | null;
}

export interface BlogPostBySlug_mdx_frontmatter {
  title: string;
  description: string | null;
  date: any | null;
}

export interface BlogPostBySlug_mdx_headings {
  depth: number | null;
  value: string | null;
}

export interface BlogPostBySlug_mdx {
  body: string;
  id: string;
  frontmatter: BlogPostBySlug_mdx_frontmatter | null;
  excerpt: string;
  headings: (BlogPostBySlug_mdx_headings | null)[] | null;
}

export interface BlogPostBySlug {
  site: BlogPostBySlug_site | null;
  mdx: BlogPostBySlug_mdx | null;
}

export interface BlogPostBySlugVariables {
  slug: string;
}
