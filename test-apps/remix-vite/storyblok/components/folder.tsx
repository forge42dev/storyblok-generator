import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { FolderStoryblok } from "../types";

export const Folder = ({ blok }: { blok: FolderStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default Folder