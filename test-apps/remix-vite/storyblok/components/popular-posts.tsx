import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { PopularPostsStoryblok } from "../types";

export const PopularPosts = ({ blok }: { blok: PopularPostsStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default PopularPosts