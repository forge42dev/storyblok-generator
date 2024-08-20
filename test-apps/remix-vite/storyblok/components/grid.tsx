import { type SbBlokData, storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { GridStoryblok } from "../types";

export const Grid = ({ blok }: { blok: GridStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {blok.columns?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  )
};

export default Grid