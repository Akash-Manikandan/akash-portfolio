"use client";

import React, { memo } from "react";
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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import { addOrUpdateVisitor, getVisitorInfo } from "@/app/visitorCount";

const alexbrush = Alex_Brush({ subsets: ["latin"], weight: ["400"] });

// const getVisitorCount = async () => {
//   const { ip, location } = await getVisitorInfo();
//   if (ip && location) {
//     addOrUpdateVisitor(ip, location);
//   }
// }

const Navbar = () => {
  const pathname = usePathname();

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

  // useEffect(() => {
  //   getVisitorCount()
  // }, [])

  return (
    <header className="z-20 fixed top-0 w-full drop-shadow-sm shadow-sm px-8 py-4 items-center  backdrop-filter backdrop-blur-[7px] dark:shadow-[10px_10px_10px_rgba(30,30,30,0.1)]  border-l-[rgba(0,0,0,0.3)] border-t-[rgba(0,0,0,0.8)] border-t-[1px] border-l-[1px] p-4 flex justify-between max-sm:px-4">
      <TypographyH2 className={alexbrush.className + " max-sm:flex-1"}>
        <Link href="/">
          Akash
        </Link>
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
                  <NavigationMenuLink
                    active={pathname.includes(item.title.toLowerCase())}
                    className={cn(navigationMenuTriggerStyle(), pathname.includes(item.title.toLowerCase()) ? "" : "bg-transparent")}
                  >
                    <p className="text-lg font-medium">{item.title}</p>
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

export default memo(Navbar);
