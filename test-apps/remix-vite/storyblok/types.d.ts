// This file was generated by the storyblok CLI.
// DO NOT MODIFY THIS FILE BY HAND.
import type { ISbStoryData } from "storyblok";
export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface BlogPostStoryblok {
  image?: AssetStoryblok;
  title?: string;
  teaser?: string;
  content?: RichtextStoryblok;
  recommended?: (ISbStoryData<BlogPostStoryblok> | string)[];
  component: "blog-post";
  _uid: string;
  [k: string]: any;
}

export interface FeatureStoryblok {
  name?: string;
  component: "feature";
  _uid: string;
  [k: string]: any;
}

export interface FolderStoryblok {
  component: "Folder";
  _uid: string;
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: (
    | BlogPostStoryblok
    | FeatureStoryblok
    | FolderStoryblok
    | GridStoryblok
    | InfiniteCardStoryblok
    | InfiniteCardsStoryblok
    | InputStoryblok
    | MainSectionStoryblok
    | PageStoryblok
    | PlanetSectionStoryblok
    | PopularPostsStoryblok
    | SeoStoryblok
    | TracingBeamStoryblok
  )[];
  component: "grid";
  _uid: string;
  [k: string]: any;
}

export interface InfiniteCardStoryblok {
  title: string;
  content: string;
  icon: string;
  component: "infinite-card";
  _uid: string;
  [k: string]: any;
}

export interface InfiniteCardsStoryblok {
  title: string;
  hint: string;
  speed: "" | "fast" | "normal" | "slow";
  cards: (
    | BlogPostStoryblok
    | FeatureStoryblok
    | FolderStoryblok
    | GridStoryblok
    | InfiniteCardStoryblok
    | InfiniteCardsStoryblok
    | InputStoryblok
    | MainSectionStoryblok
    | PageStoryblok
    | PlanetSectionStoryblok
    | PopularPostsStoryblok
    | SeoStoryblok
    | TracingBeamStoryblok
  )[];
  component: "infinite-cards";
  _uid: string;
  [k: string]: any;
}

export interface InputStoryblok {
  component: "input";
  _uid: string;
  [k: string]: any;
}

export interface MainSectionStoryblok {
  headline: string;
  small_stars?: string;
  medium_stars?: string;
  large_stars?: string;
  component: "main-section";
  _uid: string;
  [k: string]: any;
}

export interface TableStoryblok {
  thead: {
    _uid: string;
    value?: string;
    component: number;
    [k: string]: any;
  }[];
  tbody: {
    _uid: string;
    body: {
      _uid?: string;
      value?: string;
      component?: number;
      [k: string]: any;
    }[];
    component: number;
    [k: string]: any;
  }[];
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | BlogPostStoryblok
    | FeatureStoryblok
    | FolderStoryblok
    | GridStoryblok
    | InfiniteCardStoryblok
    | InfiniteCardsStoryblok
    | InputStoryblok
    | MainSectionStoryblok
    | PageStoryblok
    | PlanetSectionStoryblok
    | PopularPostsStoryblok
    | SeoStoryblok
    | TracingBeamStoryblok
  )[];
  seo?: TableStoryblok;
  component: "page";
  _uid: string;
  [k: string]: any;
}

export interface PlanetSectionStoryblok {
  title: string;
  titleHighlight: string;
  titleContinued: string;
  description: string;
  component: "planet-section";
  _uid: string;
  [k: string]: any;
}

export interface PopularPostsStoryblok {
  headline?: string;
  posts?: (ISbStoryData<BlogPostStoryblok> | string)[];
  component: "popular-posts";
  _uid: string;
  [k: string]: any;
}

export interface SeoStoryblok {
  seo_table?: TableStoryblok;
  component: "SEO";
  _uid: string;
  [k: string]: any;
}

export interface TracingBeamStoryblok {
  sections: (
    | BlogPostStoryblok
    | FeatureStoryblok
    | FolderStoryblok
    | GridStoryblok
    | InfiniteCardStoryblok
    | InfiniteCardsStoryblok
    | InputStoryblok
    | MainSectionStoryblok
    | PageStoryblok
    | PlanetSectionStoryblok
    | PopularPostsStoryblok
    | SeoStoryblok
    | TracingBeamStoryblok
  )[];
  component: "tracing-beam";
  _uid: string;
  [k: string]: any;
}