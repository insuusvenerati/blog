import { graphql } from "gatsby"
import React from "react"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Post from "../components/post"
import SEO from "../components/seo"
import { IndexPage } from "./__generated__/IndexPage"

type BlogIndexProps = {
  data: IndexPage
  location: unknown
}

const BlogIndex = ({ data, location }: BlogIndexProps): JSX.Element => {
  const siteTitle = data.site.siteMetadata.title
  const mdxPosts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {mdxPosts.map(({ node }) => {
        const title = node.frontmatter.title || node.slug
        return <Post key={node.id} node={node} title={title} />
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          slug
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
          }
          id
          excerpt(pruneLength: 160)
        }
      }
    }
  }
`
