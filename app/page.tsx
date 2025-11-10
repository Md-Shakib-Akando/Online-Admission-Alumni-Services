import AllProgram from "./components/AllProgram/page";
import AlumniSection from "./components/AlumniService/page";
import Banner from "./components/banner/page";
import BannerMarquee from "./components/BannerMarquee/page";
import ContactSection from "./components/contact/page";
import Features from "./components/Features/page";

import HowToWork from "./components/HowToWork/page";
import UniversityStats from "./components/UniversityStats/page";



export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <BannerMarquee></BannerMarquee>
      <Features></Features>
      <AllProgram></AllProgram>

      <HowToWork></HowToWork>
      <AlumniSection></AlumniSection>
      <UniversityStats></UniversityStats>
      <ContactSection></ContactSection>

    </div>
  );
}
