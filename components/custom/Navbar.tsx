"use client";

import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypographyH2 } from "@/components/ui/TypographyH2";
import { DarkModeToggle } from "@/components/theme/dark-mode-toggle";

import { Alex_Brush } from "next/font/google";

import dynamic from "next/dynamic";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const alexbrush = Alex_Brush({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  const listNav = [
    {
      title: "Home",
      href: "/",
      description: "Akash",
    },
    {
      title: "About",
      href: "/about",
      description: "Akash",
    },
    {
      title: "Works",
      href: "/works",
      description: "Akash",
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Akash",
    },
  ];

  return (
    <header className="p-4 flex justify-between">
      <TypographyH2 className={alexbrush.className + " max-sm:flex-1"}>
        Akash
      </TypographyH2>
      <MediaQuery maxWidth={637}>
        <DropdownMenu>
          <DropdownMenuTrigger className="px-2 max-sm:mr-2 border border-input bg-background shadow-sm hover:bg-accent rounded-md focus-visible:outline-none hover:text-accent-foreground">
            <HamburgerMenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {listNav.map((item, index) => (
              <Link href={item.href} key={`${index}`} passHref>
                <DropdownMenuItem>{item.title}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </MediaQuery>
      <MediaQuery minWidth={638}>
        <NavigationMenu>
          <NavigationMenuList>
            {listNav.map((item, index) => (
              <NavigationMenuItem key={`${index}`}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </MediaQuery>
      <DarkModeToggle />
    </header>
  );
};

export default Navbar;
