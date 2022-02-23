import React from "react";
import Link from "next/link";

export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

export type NavProps = {
  navItems: NavItem[];
};

const Nav = ({ navItems }: {navItems: NavItem[] | undefined}) => {

  if(!navItems) {
    return (
      <div>No Nav items</div>
    )
  }

  return (
    <nav>
      <ul>
        {navItems.map(({ href, label }) => (
          <Link key={`nav-link-${label}`} href={href}>
            <a> - {label} - </a>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default Nav;