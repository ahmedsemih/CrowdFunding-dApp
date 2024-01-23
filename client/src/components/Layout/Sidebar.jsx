"use client";

import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

import Logo from "/public/Logo.png";
import { navLinks } from "@/utils/constants";
import { ClientButton, Navlink } from "@/components";
import { useEthersContext } from "@/contexts/EthersContext";

const Sidebar = () => {
  const router = useRouter();
  const { signer, disconnectWallet } = useEthersContext();

  const handleDisconnect = () => {
    disconnectWallet();
    router.push("/");
  };

  return (
    <aside className="sticky left-2 top-2 flex-col md:flex hidden h-full">
      <Link
        href="/"
        className="flex items-center p-2 justify-center rounded-lg bg-neutral-800 mb-4"
      >
        <Image src={Logo} alt="fundseed" priority width={40} height={40} />
      </Link>
      <div className="flex flex-col bg-neutral-800 p-2 rounded-lg min-h-[calc(100vh-96px)]">
        <div className="flex flex-col gap-3">
          {navLinks.map((link, index) =>
            signer || index < navLinks.length - 1 ? (
              <Navlink
                key={index}
                Icon={link.Icon}
                href={link.href}
                title={link.title}
                setToggleDrawer={() => {}}
              />
            ) : null
          )}
        </div>
        {signer && (
          <div className="mt-auto">
            <ClientButton
              onClick={handleDisconnect}
              className="flex items-center p-2 justify-center rounded-lg transition-all duration-200 hover:bg-neutral-700 text-neutral-400"
            >
              <FiLogOut className="text-4xl" />
            </ClientButton>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
