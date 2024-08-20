import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { BlogPostStoryblok } from "../types";

export const BlogPost = ({ blok }: { blok: BlogPostStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default BlogPost