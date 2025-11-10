"use client";
import Marquee from "react-fast-marquee";

export default function BannerMarquee() {
    const marqueeText = "Admission Going On! Apply Now for Online Admission & Alumni Services. ";

    return (
        <div className="bg-sky-500 text-white text-lg py-4">
            <Marquee speed={50} gradient={false}>

                {marqueeText.repeat(3)}
            </Marquee>
        </div>
    );
}
