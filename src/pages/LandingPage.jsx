import CommonNav from "components/nav/CommonNav";
import OurTeam from "components/OurTeam";
import SectionWrapper from "components/wrappers/SectionWrapper";
import React from "react";
import gif1 from "assets/1.gif";
import gif2 from "assets/2.gif";
import heroGIF from "assets/3.gif";
import gif4 from "assets/4.gif";
import LogoSquare from "assets/VoidSquare.jpg";
import hero from "assets/hero.png";
import landingBg from "assets/landingbg.png";
import { respPX } from "constants/styles";

const LandingPage = () => {
  return (
    <>
      <CommonNav />
      <header className="">
        {/* <SectionWrapper
          heading="One Stop Solution for waste Management"
          hsize="md:text-7xl text-5xl"
          image={LogoSquare}
        /> */}
      </header>
      <hr />
      <main>
        {/* About Indore Waste mangement */}
        <SectionWrapper
          heading="About Indore Waste Management"
          paragraphs={[
            "Indore has been divided into 19 zones and 85 wards. Each ward has on an average 6,000 households and 600 commercial establishments (part of 88 notified commercial areas). In Indore, waste is generated from various sources including households, commercial areas and other institutions like RWAs, hospitals, hotels among others. The households or residential complexes are covered by the door-to-door collection system while the semi bulk and bulk generators are covered by the bulk collection system. Indore ensures the 100% coverage of wards through its door-to-door collection system.",
          ]}
          inverted
          image={heroGIF}
        />
        <hr />
        {/* Our Proposed Solution / What we do */}
        {/* <SectionWrapper
          heading="Our Proposed Solution / What we do"
          paragraphs={[
            "lorem ipsum dolor sit amet consecteturdolor sit amet consecteturdolor sit amet consecteturdolor sit amet consecteturdolor sit amet consecteturdolor sit amet consecteturdolor sit amet consecteturdolor sit amet consecteturdolor sit amet consecteturdolor sit amet consectetur.",
          ]}
          image={gif2}
        /> */}
        <section className="h-[60vh] flex flex-col items-center justify-center gap-10">
          <h1 className={`${respPX} pb-3 text-5xl bg-white`}>Our Features</h1>
          <img
            src={landingBg}
            alt="what we do"
            className="object-cover md:h-full shadow-lg md:w-auto w-[80vmin]"
          />
        </section>
        {/* Our Team */}
        <OurTeam />
      </main>
      {/* Contact us */}
      <footer></footer>
    </>
  );
};

export default LandingPage;
