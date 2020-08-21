import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Toc from "../components/toc"
import { rhythm, scale } from "../utils/typography"
import { BlogPostBySlug } from "./__generated__/BlogPostBySlug"

type Node = {
  slug: string
  frontmatter: {
    title: string
  }
  timeToRead: number
}

type BlogPostTemplateProps = {
  data: BlogPostBySlug
  pageContext: BlogPostBySlug
  location: unknown
}

const BlogPostTemplate = ({
  data,
  pageContext,
  location,
}: BlogPostTemplateProps): JSX.Element => {
  const mdxPost = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next }: { previous: Node; next: Node } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={mdxPost.frontmatter.title}
        description={mdxPost.frontmatter.description || mdxPost.excerpt}
      />
      <Toc headings={mdxPost?.headings} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {mdxPost.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {mdxPost.frontmatter.description || mdxPost.excerpt}
          </p>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {mdxPost.timeToRead} minutes
          </p>
        </header>

        <section>
          <MDXRenderer headings={mdxPost.headings}>{mdxPost.body}</MDXRenderer>
        </section>

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(slug: { eq: $slug }) {
      body
      id
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
      excerpt(pruneLength: 160)
      headings(depth: h2) {
        depth
        value
      }
    }
  }
`
