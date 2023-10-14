"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Navlink = ({ href, Icon, title, setToggleDrawer }) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  return (
    <Link
      onClick={() => setToggleDrawer(false)}
      href={href}
      className={`
            flex items-center p-2 md:justify-center rounded-lg gap-3 transition-all duration-200 hover:bg-neutral-700 
            ${
              (sort ? path + `?sort=${sort}` === href : path === href)
                ? "bg-neutral-700 text-emerald-500"
                : "bg-transparent text-neutral-400"
            }
        `}
    >
      <Icon className="text-4xl" />
      <p className="md:hidden block font-semibold">{title}</p>
    </Link>
  );
};

export default Navlink;
