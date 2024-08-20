import { lazy } from "react"

export const components = {
  "blog-post": lazy(() => import("./blog-post")),
  feature: lazy(() => import("./feature")),
  Folder: lazy(() => import("./folder")),
  grid: lazy(() => import("./grid")),
  "infinite-card": lazy(() => import("./infinite-card")),
  "infinite-cards": lazy(() => import("./infinite-cards")),
  input: lazy(() => import("./input")),
  "main-section": lazy(() => import("./main-section")),
  page: lazy(() => import("./page")),
  "planet-section": lazy(() => import("./planet-section")),
  "popular-posts": lazy(() => import("./popular-posts")),
  SEO: lazy(() => import("./seo")),
  "tracing-beam": lazy(() => import("./tracing-beam")),
};