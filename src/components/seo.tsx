import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import { SEOQuery } from "./__generated__/SEOQuery"

type Meta = {
  name:
    | "description"
    | "twitter:card"
    | "twitter:creator"
    | "twitter:title"
    | "twitter:description"
  content: string
  property: "og:title" | "og:description" | "og:type"
}

type SEOProps = {
  description: string
  lang: string
  meta: Array<Meta>
  title: string
}

const SEO = ({ description, lang, meta, title }: SEOProps): JSX.Element => {
  const { site } = useStaticQuery<SEOQuery>(
    graphql`
      query SEOQuery {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]}
    />
  )
}

export default SEO
