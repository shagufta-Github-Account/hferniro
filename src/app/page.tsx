import BrowseTheRangeSection from "@/components/sections/BrowseTheRangeSection";
import SlickRoomSLider from "@/components/sections/Hero-Slider";
import HeroSection from "@/components/sections/HeroSection";
import OurProductSection from "@/components/sections/OurProductSection";
import ShareSetupSection from "@/components/sections/ShareSetupSection";
import { client } from "@/sanity/lib/client";


export default async function Home() {

const data = await client.fetch(`*[_type == "product"] {
  "price": 210,
  "tags": [
    "rustic ",
    "vase ",
    "home decor",
    "vintage ",
    "interior design"
  ]
}`);

  return (
    <main className="bg-white">
      <HeroSection />
      <div className="flex flex-col gap-[56px] mx-4 md:mx-[130px]">
        <BrowseTheRangeSection />
        <OurProductSection />
      </div>
      <div>
        <SlickRoomSLider />
      </div>
      <div className="mt-[56px]">
        <ShareSetupSection />
      </div>
    </main>
  );
}



