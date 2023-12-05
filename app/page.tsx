import Image from "next/image";
import HomepageMosquitoImage from "../public/HomepageMosquitoImage.jpg";
import SarsCov2StructureImage from "../public/SarsCov2Structure.png";
import SeroTrackerBackgroundImage from "../public/SeroTrackerBackgroundImage.png";
import DetailedSeroTrackerLogoWithText from "../public/DetailedSeroTrackerLogoWithText.png";
import { HomepageTile } from "./homepage-tile";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-full"
      style={{
        backgroundImage: `url(${SeroTrackerBackgroundImage.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '40% 30%'
      }}
    >
      <div>
        <div className="flex flex-start mb-3 mt-[10%]">
          <Image
            src={"/SerotrackerLogo.svg"}
            alt={""}
            width={120}
            height={120}
            style={{
              marginRight: "20px",
            }}
          />
          <div>
            <h1 className={"font-bold text-5xl mt-2.5 mb-3"}>SeroTracker</h1>
            <h2>
              A global dashboard standardizing pathogen and seroprevalence data
            </h2>
          </div>
        </div>
      </div>
      <div className={"flex w-full h-half-screen justify-around mb-4"}>
        <HomepageTile
          header="SARSCoV2Tracker"
          subtitle="Access a collection of seroprevalence studies for SARS-CoV-2 that span across 38 million participants and 148 countries."
          backgroundImage={SarsCov2StructureImage}
          backgroundImageAttribution="By SPQR10 - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=88349537 / Cropped and modified to remove labels."
          route="https://serotracker.com"
        />
        <HomepageTile
          header="ArboTracker"
          subtitle="View over a thousand seroprevalence estimates for arboviruses that span across over seventy countries and seven decades."
          backgroundImage={HomepageMosquitoImage}
          backgroundImageAttribution="By Own scan, slightly modified. Original by Emil August Goeldi (1859 - 1917). - E. A. Goeldi (1905) Os Mosquitos no Pará. Memorias do Museu Goeldi. Pará, Brazil. Figures 3 (left) 1 (middle) and 2 (right) of Plate 1 in the Appendix., Public Domain, https://commons.wikimedia.org/w/index.php?curid=5469706 / Modified to remove faded image of mosquito in top left corner and cropped."
          route="/pathogen/arbovirus/dashboard"
        />
      </div>
    </div>
  );
}
