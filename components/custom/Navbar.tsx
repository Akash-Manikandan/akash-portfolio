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

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

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
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-[10px] max-sm:mr-2 border border-input bg-background shadow-sm hover:bg-accent rounded-md focus-visible:outline-none hover:text-accent-foreground">
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
      </div>
      <div className="max-sm:hidden">
        <NavigationMenu>
          <NavigationMenuList>
            {listNav.map((item, index) => (
              <NavigationMenuItem key={`${index}`}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="text-lg">{item.title}</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <DarkModeToggle />
    </header>
  );
};

export default Navbar;
