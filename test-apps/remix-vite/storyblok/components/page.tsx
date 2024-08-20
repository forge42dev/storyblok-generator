import { type SbBlokData, storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { PageStoryblok } from "../types";

export const Page = ({ blok }: { blok: PageStoryblok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} key={blok._uid}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  )
};

export default Page