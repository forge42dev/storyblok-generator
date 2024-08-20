import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { InputStoryblok } from "../types";

export const Input = ({ blok }: { blok: InputStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default Input