// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "./src/styles/styles.css"
import "prismjs/themes/prism-tomorrow.css"
import { MDXProvider } from "@mdx-js/react"
import React from "react"

export const wrapRootElement = ({ element }) => (
  <MDXProvider>{element}</MDXProvider>
)
