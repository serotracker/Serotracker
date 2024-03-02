"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
<<<<<<< HEAD
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ListItem from "@/components/customs/list-item";
=======
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import ListItem from "@/components/customs/list-item";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> c08bad2 (Added in conditional styling to the header)
=======

>>>>>>> 45c0b9c (Merged conmflicts and fixed color)
import { ArbovirusPageSectionId } from "@/app/constants";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

<<<<<<< HEAD
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

=======
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)
type NavMenuItem = {
  title: string;
  href: string;
  description: string;
};

<<<<<<< HEAD
<<<<<<< HEAD
const serotrackerNavItems: NavMenuItem[] = [
=======
const serotrackerNavItems: navMenuItem[] = [
>>>>>>> a564c99 (Updated header style a little bit and also extracted a reusable segment of code)
=======
const serotrackerNavItems: NavMenuItem[] = [
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)
  {
    title: "Dashboard",
    href: "/pathogen/sarscov2/dashboard",
<<<<<<< HEAD
    description: "A dashboard for Sars Cov 2 seroprevalence data",
  },
  {
    title: "Analysis",
    href: "/pathogen/sarscov2/analyze",
    description:
      "A collection of visualizations and tabular data tools for our collection of SarsCov2 data",
=======
    description: "A dashboard for arbovirus seroprevalence data",
  },
  {
    title: "Data",
    href: "/pathogen/sarscov2/dashboard",
    description: "View or download our entire arbovirus dataset",
  },
  {
    title: "Visualizations",
    href: "/pathogen/sarscov2/dashboard",
    description: "A collection of visualizations for our arbovirus dataset",
>>>>>>> d60bb70 (Returned vis text back to normal)
  },
];

<<<<<<< HEAD
<<<<<<< HEAD
const arbotrackerNavitems: NavMenuItem[] = [
=======
const arbotrackerNavitems: navMenuItem[] = [
>>>>>>> a564c99 (Updated header style a little bit and also extracted a reusable segment of code)
=======
const arbotrackerNavitems: NavMenuItem[] = [
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)
  {
    title: "Dashboard",
    href: `/pathogen/arbovirus/dashboard#${ArbovirusPageSectionId.MAP}`,
    description: "A dashboard for arbovirus seroprevalence data",
  },
  {
    title: "Data",
    href: `/pathogen/arbovirus/dashboard#${ArbovirusPageSectionId.TABLE}`,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
    title: "Data",
<<<<<<< HEAD
    href: "/pathogen/arbovirus/dashboard",
>>>>>>> 3e60d6d (Updated the header to have the tracker and about tabs with subtabs)
=======
    href: "/pathogen/arbovirus/dashboard/#TABLE",
>>>>>>> 04e95cb (Updated the links to work)
>>>>>>> 7280c8c (Updated the links to work)
=======
>>>>>>> 45c0b9c (Merged conmflicts and fixed color)
    description:
      "A collection of visualizations and tabular data tools for our collection of arbovirus data",
=======
    description: "View or download our entire arbovirus dataset",
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)
  },
<<<<<<< HEAD
=======
  {
    title: "Visualizations",
    href: `/pathogen/arbovirus/dashboard#${ArbovirusPageSectionId.VISUALIZATIONS}`,
    description: "A collection of visualizations for our arbovirus dataset",
  },
];

const aboutNavItems: NavMenuItem[] = [
  {
    title: "Data Extraction",
    href: "/about/data-extraction",
    description: "The process used to extract the data",
  },
  {
    title: "FAQ",
    href: "/about/faq",
    description:
      "A list of frequently asked questions regarding the data, systematic review and organization",
  },
<<<<<<< HEAD
>>>>>>> a564c99 (Updated header style a little bit and also extracted a reusable segment of code)
=======
  {
    title: "Our Team",
    href: "/about/the-team",
    description:
      "A list of our team members, alumni, stakeholders and other partners",
  },
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)
];

interface TabGroupProps {
  title: string;
  navItems: NavMenuItem[];
}

function TabGroup(props: TabGroupProps) {
  return (
    <div className="flex flex-col w-2/4 md:2/5 px-2">
      <h2 className="mb-2">{props.title}</h2>
      <ul className="flex flex-row space-x-2">
        {props.navItems.map((navItem: NavMenuItem) => (
          <ListItem
            key={`${props.title}-${navItem.title}`}
            title={navItem.title}
            href={navItem.href}
          >
            {navItem.description}
          </ListItem>
        ))}
      </ul>
    </div>
  );
}

export const Header = () => {
<<<<<<< HEAD
<<<<<<< HEAD
  const pathname = usePathname();
  const [titleSuffix, setTitleSuffix] = useState("Sero");
  const [titleSuffixColor, setTitleSuffixColor] = useState("text-background");
  const [headerBgColor, setHeaderBgColor] = useState("bg-background");

  // I wonder if there is a better way to do this without the useEffect.
  // Will come back to it because I have spent too much time here already
  useEffect(() => {
    if (pathname.includes("arbovirus")) {
      setTitleSuffix("Arbo");
      setTitleSuffixColor("text-arbovirus");
      setHeaderBgColor("bg-arbovirus delay-150");
    } else if (pathname.includes("sarscov2")) {
      setTitleSuffix("SC2");
      setTitleSuffixColor("text-sc2virus");
      setHeaderBgColor("bg-sc2virus delay-150");
=======

=======
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)
  const pathname = usePathname();
  const [titleSuffix, setTitleSuffix] = useState("Sero");
  const [titleSuffixColor, setTitleSuffixColor] = useState("text-background");
  const [headerBgColor, setHeaderBgColor] = useState("bg-background");

  // I wonder if there is a better way to do this without the useEffect.
  // Will come back to it because I have spent too much time here already
  useEffect(() => {
    if (pathname.includes("arbovirus")) {
      setTitleSuffix("Arbo");
      setTitleSuffixColor("text-arbovirus");
      setHeaderBgColor("bg-arbovirus delay-150");
    } else if (pathname.includes("sarscov2")) {
      setTitleSuffix("SC2");
<<<<<<< HEAD
<<<<<<< HEAD
      setTitleSuffixColor("text-blue-500");
      setHeaderBgColor("bg-blue-500 delay-150");
>>>>>>> c08bad2 (Added in conditional styling to the header)
=======
      setTitleSuffixColor("text-sc2");
      setHeaderBgColor("bg-sc2 delay-150");
>>>>>>> 45c0b9c (Merged conmflicts and fixed color)
=======
      setTitleSuffixColor("text-sc2virus");
      setHeaderBgColor("bg-sc2virus delay-150");
>>>>>>> 993827b (Changed some tailwind var cause arbo and sc2 were not working)
    } else {
      setTitleSuffix("Sero");
      setTitleSuffixColor("text-background");
      setHeaderBgColor("bg-background");
    }
<<<<<<< HEAD
<<<<<<< HEAD
  }, [pathname]);

  return (
    <header className="bg-background flex items-center justify-between h-12 w-screen px-2">
      <div className="cursor-pointer py-5 pl-2">
        <Link href={"/"} className="flex items-center">
          <Image
            src={"/SerotrackerLogo.svg"}
            alt={"Serotracker Logo"}
            width={23}
            height={23}
          />
=======
  }, [pathname])
=======
  }, [pathname]);
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)

  return (
    <header
      className={cn(
        "flex items-center  justify-between transition-colors duration-300 h-14 w-screen px-2 text-white border-b-4 border-white overflow-hidden",
        headerBgColor
      )}
    >
      <div className="cursor-pointer pl-2">
        <Link href={"/"} className="flex items-center text-h1">
          <h2>
            <span
              className={cn(
                "p-1 mr-1 bg-white rounded-md transition-colors duration-300",
                titleSuffixColor
              )}
            >
              {titleSuffix}
            </span>
            Tracker
<<<<<<< HEAD
          </h1>
>>>>>>> c08bad2 (Added in conditional styling to the header)
=======
          </h2>
>>>>>>> 45c0b9c (Merged conmflicts and fixed color)
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
<<<<<<< HEAD
          <NavigationMenuItem hidden={!process.env.SARS_COV_2_TRACKER_ENABLED}>
            <NavigationMenuTrigger>SeroTracker</NavigationMenuTrigger>
=======
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Trackers
            </NavigationMenuTrigger>
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)
            <NavigationMenuContent>
<<<<<<< HEAD
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {serotracker.map((page) => (
                  <ListItem
                    key={page.title}
                    title={page.title}
                    href={page.href}
                  >
                    {page.description}
                  </ListItem>
                ))}
              </ul>
=======
              <div className="p-4 flex justify-center w-full">
<<<<<<< HEAD
                {process.env.SARS_COV_2_TRACKER_ENABLED &&
                  <TabGroup title={"SC2Tracker"} navItems={serotrackerNavItems}                />
                }
<<<<<<< HEAD
                <div className="flex flex-col w-2/4 px-2">
                  <h2 className="mb-2">ArboTracker</h2>
                  <ul className="flex flex-row space-x-2">
                  {arbotracker.map((arboItem: navMenuItem) => (
                    <ListItem title={arboItem.title} href={arboItem.href}>
                      {arboItem.description}
                      </ListItem>
                  ))}
                  </ul>
                </div>
              </div>
>>>>>>> c08bad2 (Added in conditional styling to the header)
=======
                <TabGroup title={"Arbotracker"} navItems={arbotrackerNavitems} />
                              </div>
>>>>>>> a564c99 (Updated header style a little bit and also extracted a reusable segment of code)
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>ArboTracker</NavigationMenuTrigger>
=======
                {process.env.NEXT_PUBLIC_SARS_COV_2_TRACKER_ENABLED && (
                  <TabGroup
                    title={"SC2Tracker"}
                    navItems={serotrackerNavItems}
                  />
                )}
                <TabGroup
                  title={"Arbotracker"}
                  navItems={arbotrackerNavitems}
                />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {process.env.NEXT_PUBLIC_ABOUT_PAGE_ENABLED && <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              About
            </NavigationMenuTrigger>
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)
            <NavigationMenuContent>
<<<<<<< HEAD
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {arbotracker.map((page) => (
                  <ListItem
                    key={page.title}
                    title={page.title}
                    href={page.href}
                  >
                    {page.description}
                  </ListItem>
                ))}
              </ul>
=======
              <div className="p-4 flex justify-center w-full">
                <TabGroup title={"About"} navItems={aboutNavItems} />
<<<<<<< HEAD
                              </div>
>>>>>>> a564c99 (Updated header style a little bit and also extracted a reusable segment of code)
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/*
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          */}
        </NavigationMenuList>
<<<<<<< HEAD
<<<<<<< HEAD
        <NavigationMenuViewport
          className={cn("transition-colors duration-300", headerBgColor)}
        />
=======
        <NavigationMenuViewport className={cn("transition-colors duration-300", headerBgColor)}/>
>>>>>>> c08bad2 (Added in conditional styling to the header)
=======
        <NavigationMenuViewport className={cn("transition-colors duration-300", headerBgColor)} />
>>>>>>> a564c99 (Updated header style a little bit and also extracted a reusable segment of code)
=======
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>}
        </NavigationMenuList>
        <NavigationMenuViewport
          className={cn("transition-colors duration-300", headerBgColor)}
        />
>>>>>>> 307da4d (Addressed some comments about the copy, updated about page env var)
      </NavigationMenu>
    </header>
  );
};
