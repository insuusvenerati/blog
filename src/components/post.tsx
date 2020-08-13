import React from "react"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"

type PostProps = {
  node: {
    id: number
    frontmatter: {
      title: string
      date: Date
      description: string
    }
    slug: string
    excerpt: string
  }
  title: string
}

const Post = ({ node, title }: PostProps): JSX.Element => {
  return (
    <article key={node.id}>
      <header>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: `none` }} to={node.slug}>
            {title}
          </Link>
        </h3>
        <small>{node.frontmatter.date}</small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
      </section>
    </article>
  )
}

export default Post
