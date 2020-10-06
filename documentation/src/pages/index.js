import React from "react"
import SEO from "../components/seo"

export default function Home() {
  return (
    <>
      <SEO title="Search Sketch" />
      <body class="text-light">
        <section class="bg-gradient pt-5 pb-5">
          <div class="container">
            <div class="row">
              <div class="col-12 d-flex flex-row align-items-center justify-content-between">
                <h1>Search Sketch</h1>
                <a
                  href="https://github.com/candy02058912/search-sketch/releases/latest/download/search-sketch.sketchplugin.zip"
                  class="btn btn-light"
                >
                  Download
                </a>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-md-8 mx-auto text-center">
                <h1>Search Sketch Searches Text in Any Language</h1>
                <p class="lead mb-5">
                  Find your way through the ever-growing sketch files!
                </p>
                <a
                  class="github-button"
                  href="https://github.com/candy02058912/search-sketch"
                  data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star candy02058912/search-sketch on GitHub"
                >
                  Star
                </a>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-md-9 mx-auto">
                <img
                  src="https://search-sketch.hpd.io/preview.gif"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </section>

        <footer class="py-5 bg-light">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <p class="text-center text-dark">
                  Made with ❤️ by
                  <a href="https://github.com/candy02058912/search-sketch">
                    candy02058912
                  </a>
                  .
                </p>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 mx-auto text-muted text-center small-xl">
                &copy; 2020 Candy Tsai - All Rights Reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </>
  )
}
