import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import type { TracingBeamStoryblok } from "../types";

export const TracingBeam = ({ blok }: { blok: TracingBeamStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {/** Have fun! */}
    </div>
  )
};

export default TracingBeam