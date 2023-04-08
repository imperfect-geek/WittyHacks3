import CommonNav from "components/nav/CommonNav";
import OurTeam from "components/OurTeam";
import SectionWrapper from "components/wrappers/SectionWrapper";
import React from "react";
import Typewriter from "typewriter-effect";

import gif1 from "assets/1.gif";
import gif2 from "assets/2.gif";
import heroGIF from "assets/3.gif";
import homeGIF from "assets/home.gif";
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
          heading="VOID TRASH 🗑️"
          hsize="md:text-6xl text-4xl"
          paragraphs={[
            "We are a team of 4 students from Indore, India. We are working on a project to solve the problem of waste management in Indore.",
            <span className="text-green-500 text-2xl font-sans font-bold tracking-widest">
              <Typewriter
                options={{
                  strings: [
                    "Waste Buddy",
                    "Locate Dustbin",
                    "Waste Category",
                    "Waste Collectors",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>,
          ]}
          inverted
          image={homeGIF}
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
        {/* <section className="flex flex-col items-center justify-center gap-10">
          <h1 className={`${respPX} pb-3 text-5xl bg-white`}>Our Features</h1>
        </section> */}
        {/* Our Team */}
        <OurTeam />
      </main>
      {/* Contact us */}
      <footer></footer>
    </>
  );
};

export default LandingPage;
