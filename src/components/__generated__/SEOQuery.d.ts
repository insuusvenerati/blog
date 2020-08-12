/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SEOQuery
// ====================================================

export interface SEOQuery_site_siteMetadata_social {
  twitter: string | null;
}

export interface SEOQuery_site_siteMetadata {
  title: string | null;
  description: string | null;
  social: SEOQuery_site_siteMetadata_social | null;
}

export interface SEOQuery_site {
  siteMetadata: SEOQuery_site_siteMetadata | null;
}

export interface SEOQuery {
  site: SEOQuery_site | null;
}
