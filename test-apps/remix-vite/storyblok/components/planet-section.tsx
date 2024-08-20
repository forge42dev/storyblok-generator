import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { PlanetSectionStoryblok } from "../types";

export const PlanetSection = ({ blok }: { blok: PlanetSectionStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default PlanetSection