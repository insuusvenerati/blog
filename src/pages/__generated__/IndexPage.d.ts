/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndexPage
// ====================================================

export interface IndexPage_site_siteMetadata {
  title: string | null;
}

export interface IndexPage_site {
  siteMetadata: IndexPage_site_siteMetadata | null;
}

export interface IndexPage_allMdx_edges_node_frontmatter {
  title: string;
  description: string | null;
  date: any | null;
}

export interface IndexPage_allMdx_edges_node {
  slug: string | null;
  frontmatter: IndexPage_allMdx_edges_node_frontmatter | null;
  id: string;
  excerpt: string;
}

export interface IndexPage_allMdx_edges {
  node: IndexPage_allMdx_edges_node;
}

export interface IndexPage_allMdx {
  edges: IndexPage_allMdx_edges[];
}

export interface IndexPage {
  site: IndexPage_site | null;
  allMdx: IndexPage_allMdx;
}
