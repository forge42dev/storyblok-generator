import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { InfiniteCardsStoryblok } from "../types";

export const InfiniteCards = ({ blok }: { blok: InfiniteCardsStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default InfiniteCards