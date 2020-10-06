import React from "react"
import SEO from "./seo"

export default function Layout({ children }) {
  return (
    <>
      <SEO title="Search Sketch" />
      {children}
    </>
  )
}
