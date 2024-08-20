import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { SeoStoryblok } from "../types";

export const Seo = ({ blok }: { blok: SeoStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default Seo