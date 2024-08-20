import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { InfiniteCardStoryblok } from "../types";

export const InfiniteCard = ({ blok }: { blok: InfiniteCardStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default InfiniteCard