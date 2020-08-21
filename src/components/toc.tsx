import { Link } from "gatsby"
import React from "react"

type Headings = {
  depth: number
  value: string
}

type TocProps = {
  headings: Array<Headings>
}

const Toc = ({ headings }: TocProps): JSX.Element => {
  const slug = (headingValue: string): string =>
    headingValue
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
  return (
    <div className="card toc">
      <h2 style={{ marginTop: 0 }}>Table of Contents</h2>
      <ul>
        {headings
          ? headings.map(heading => (
              <li key={heading.value}>
                <Link to={`#${slug(heading.value)}`}>{heading.value}</Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default Toc
