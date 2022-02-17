export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

export type NavProps = {
  navItems: NavItem[];
};

export async function loadNavData(): Promise<NavItem[]> {
  const header = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "UI",
      href: "/ui",
    },
  ];

  return header;
}