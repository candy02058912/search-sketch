import React from "react"
import { Helmet } from "react-helmet"

function SEO({ title }) {
  return (
    <Helmet title={title}>
      <link
        href="https://fonts.googleapis.com/css2?family=K2D:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      />
      <script async defer src="https://buttons.github.io/buttons.js"></script>
    </Helmet>
  )
}

export default SEO
