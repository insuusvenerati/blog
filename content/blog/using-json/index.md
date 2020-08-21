---
title: Using JSON
date: "2020-08-21"
description: "Use JSON data in Gatsby"
---

## Using JSON in Gatsby

There can be a few reasons to use static json files in Gatsby. I used a `Projects.json` file for my portfolio
that I could map over instead of adding a new component or element for each project.

As a bonus, I figured out how to use [foreign key references](https://www.gatsbyjs.com/docs/schema-inference/#foreign-key-reference-___node)
to map an ImageSharp node to a field in the JSON file.

Let's get started.

> ### Check out the full project on Github for reference
>
> [https://github.com/insuusvenerati/blogpost-usingjson](https://github.com/insuusvenerati/blogpost-usingjson)

## Project setup

Starting with the usual gatsby new command to scaffold a project.

`gatsby new using-json`

Next, let's create a directory for the JSON content. Here I'll use Projects as an example
but JSON can be used for a lot of things.

`mkdir -p content/projects`

Create a file called Projects.json inside `content/projects`

## Setup dependencies

`yarn add gatsby-transformer-json`

or

`npm install gatsby-transformer-json`

> ### gatsby-transformer-json
>
> Parses raw JSON strings into JavaScript objects e.g. from JSON files. Supports arrays of objects and single objects.

We'll combine this with `gatsby-source-filesystem` to add the JSON files as graphql nodes.

In your `gatsby-config.js` add:

```js
`gatsby-transformer-json`,
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `Projects`,
    path: `${__dirname}/content/projects`,
  },
},
```

Go ahead and run `gatsby develop` and open the app in your browser.

_You may get errors about being unable parse the JSON file. This is
because it doesn't like empty files. Let's fill in the project files._

## Add some data

Let's start with adding some data to our `Projects.json`

```json
[
  {
    "name": "Portfolio",
    "image": "portfolio.png",
    "coolness": 3,
    "emoji": "📘"
  },
  {
    "name": "Weather App",
    "image": "weather-app.png",
    "coolness": 1,
    "emoji": "🌨️"
  },
  {
    "name": "Pokedex",
    "image": "pokedex.png",
    "coolness": 5,
    "emoji": "🔮"
  },
  {
    "name": "Animal Crossing App",
    "image": "animalcrossing.png",
    "coolness": 5,
    "emoji": "🐄"
  }
]
```

Here i've setup an array of objects that we'll eventually map over and display as a React component.

> If you want you can query this data in the playground [http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql) and see what it looks like

```graphql
query MyQuery {
  allProjectsJson {
    edges {
      node {
        coolness
        emoji
        id
        image
        name
      }
    }
  }
}
```

Now let's add some images. You'll notice there are image filenames in Projects.json. We'll get to that in a bit.

Add the images to `content/assets` or wherever you'd like them to be and setup `gatsby-config.js` to read them.

> Install some dependencies
>
> `yarn add gatsby-transformer-sharp gatsby-plugin-sharp`

Add to your `gatsby-config.js`

```js
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `Images`,
    path: `${__dirname}/content/assets`,
  },
},
`gatsby-transformer-sharp`,
`gatsby-plugin-sharp`,
```

and restart `gatsby develop`.

## Foreign-Key Relations

This is a tough concept for me to explain as I'm new to it but by example, hopefully, I
can make it clear to you.

In this example we are going to relate our `image` field in `Projects.json` to an `ImageSharp`
node so when we map over our projects, that include the name of an image file, we get a fixed or fluid object
out of it to use in `gatsby-image`.

In `gatsby-node.js` add:

```js
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type ProjectsJson implements Node {
      image: ImageSharp @link(by: "fluid.originalName")
    }
  `
  createTypes(typeDefs)
}
```

This is the simplest way to create relations. There are other ways for different situations that are explained
a bit [here](https://www.gatsbyjs.com/docs/schema-customization/#foreign-key-fields)

Let's go through what's going on

- `createSchemaCustomization` allows you to customize Gatsby's schema.
- `createTypes` API specifically allows you to add new type definitions and is only available in `createSchemaCustomization`.
- `@link` directive is a shortcut to create a resolver that asks the data store for the object of the node.
- `(by: "fluid.originalName")` this argument grabs the original name of the image on the ImageSharp node and matches it to the filename in Projects.json

We now end up with a query like this:

```graphql
query Projects {
  allProjectsJson {
    edges {
      node {
        coolness
        emoji
        id
        image {
          fluid(maxWidth: 350, quality: 100) {
            src
          }
        }
        name
      }
    }
  }
}
```

that returns something like this:

```js
{
  "data": {
    "allProjectsJson": {
      "edges": [
        {
          "node": {
            "coolness": 3,
            "emoji": "📘",
            "id": "5aebe245-769d-54ec-8edf-7aad0e1eb546",
            "image": {
              "fluid": {
                "src": "/static/113db956ceec1c2f9dd3144c355e6b7f/3e2bf/portfolio.png"
              }
            },
            "name": "Portfolio"
          }
        },
        {
          "node": {
            "coolness": 1,
            "emoji": "🌨️",
            "id": "57abd265-6004-529b-8aaf-c44f1f89311c",
            "image": {
              "fluid": {
                "src": "/static/cd98bbcceaddc0c19a6a791abc7e7317/3e2bf/weather-app.png"
              }
            },
            "name": "Weather App"
          }
        },
        {
          "node": {
            "coolness": 5,
            "emoji": "🔮",
            "id": "9b32c277-71d5-5310-a97d-bd8c3a329e7b",
            "image": {
              "fluid": {
                "src": "/static/295bd5fd8d90c95177de503404aefa5b/3e2bf/pokedex.png"
              }
            },
            "name": "Pokedex"
          }
        },
        {
          "node": {
            "coolness": 5,
            "emoji": "🐄",
            "id": "497ebb32-aebe-5d68-ad57-33e883395636",
            "image": {
              "fluid": {
                "src": "/static/e44ee1d631a79bcf3701b42341fedff3/3e2bf/animalcrossing.png"
              }
            },
            "name": "Animal Crossing App"
          }
        }
      ]
    }
  }
}
```

## Put it all together

```js
import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Project = ({
  projectImage,
  projectName,
  projectCoolness,
  projectEmoji,
}) => (
  <div style={{ maxWidth: 350 }}>
    <Img fluid={projectImage} />
    <div>
      <h3>Name: {projectName}</h3> <h3>Coolness: {projectCoolness}</h3>{" "}
      <h3>Emoji: {projectEmoji}</h3>{" "}
    </div>
  </div>
)

const IndexPage = ({ data }) => {
  const { allProjectsJson } = data

  return (
    <Layout>
      <SEO title="Home" />
      {allProjectsJson.edges.map(project => {
        const { node } = project
        return (
          <Project
            projectCoolness={node.coolness}
            projectEmoji={node.emoji}
            projectImage={node.image.fluid}
            projectName={node.name}
          />
        )
      })}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query Projects {
    allProjectsJson {
      edges {
        node {
          coolness
          emoji
          id
          image {
            fluid(maxWidth: 350, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          name
        }
      }
    }
  }
`
```

Now each project will have it's image rendered by `gatsby-image`.

If this helped you or you have any questions @ me on Twitter.
