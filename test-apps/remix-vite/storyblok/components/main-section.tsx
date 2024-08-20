import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { MainSectionStoryblok } from "../types";

export const MainSection = ({ blok }: { blok: MainSectionStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default MainSection