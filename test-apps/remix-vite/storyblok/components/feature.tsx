import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { FeatureStoryblok } from "../types";

export const Feature = ({ blok }: { blok: FeatureStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default Feature