"use client";

import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { RiMenuFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

import Searchbar from "./Searchbar";
import Logo from "../../../public/Logo.png";
import { navLinks } from "@/utils/constants";
import { ClientButton, Navlink } from "@/components";
import { useEthersContext } from "@/contexts/EthersContext";

const Topbar = () => {
  const router = useRouter();
  const drawerRef = useRef(null);
  const { signer, loading, connectWallet, disconnectWallet } = useEthersContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target))
      setToggleDrawer(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  return (
    <div className="flex items-center sticky md:relative top-0 w-full justify-between bg-[#13131a] pb-4 md:pb-0 md:bg-transparent flex-col-reverse sm:flex-row mb-5">
      <Link href="/" className="hidden sm:block md:hidden p-2 rounded-lg">
        <Image src={Logo} alt="fundseed" priority width={40} height={40} />
      </Link>

      <Searchbar />

      {/* LARGE SCREEN */}
      <div className="md:block hidden">
        {signer ? (
          <div className="flex items-center gap-4">
            <ClientButton
              onClick={() => router.push("/create")}
              loading={loading}
              className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 p-3 rounded-lg font-semibold"
            >
              Create Campaign
            </ClientButton>
            <Link href="/account" className="bg-neutral-800 rounded-full p-3">
              <Image src={Logo} alt="user" width={24} height={24} />
            </Link>
          </div>
        ) : (
          <ClientButton
            onClick={connectWallet}
            loading={loading}
            className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 p-3 rounded-lg font-semibold"
          >
            Connect
          </ClientButton>
        )}
      </div>

      {/* SMALL SCREEN */}
      <div className="md:hidden flex justify-between sm:justify-end items-center relative w-full sm:w-auto sm:mb-0 mb-3">
        <Link href="/" className="sm:hidden p-2 rounded-lg">
          <Image src={Logo} alt="fundseed" priority width={40} height={40} />
        </Link>

        <ClientButton onClick={() => setToggleDrawer((prev) => !prev)}>
          <RiMenuFill className="text-5xl text-neutral-500" />
        </ClientButton>

        <div
          ref={drawerRef}
          className={`
            absolute w-[calc(100vw-32px)] transition-all duration-700 z-50 flex flex-col gap-2 sm:w-[50vw] p-2 top-16 rounded-lg right-0 ml-4 bg-neutral-800 
            ${!toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"}
          `}
        >
          {signer ? (
            <ClientButton
              loading={loading}
              onClick={() => router.push("/create")}
              className="bg-emerald-500 hover:bg-emerald-600 transition-all flex justify-center duration-200 p-3 rounded-lg font-semibold w-full"
            >
              Create Campaign
            </ClientButton>
          ) : (
            <ClientButton
              loading={loading}
              onClick={connectWallet}
              className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 p-3 rounded-lg font-semibold w-full"
            >
              Connect
            </ClientButton>
          )}
          {navLinks.map((link, index) =>
            signer || index < navLinks.length - 1 ? (
              <Navlink
                key={index}
                Icon={link.Icon}
                href={link.href}
                title={link.title}
                setToggleDrawer={setToggleDrawer}
              />
            ) : null
          )}
          {signer && (
            <ClientButton onClick={disconnectWallet} className="flex gap-3 items-center p-2 justify-start rounded-lg transition-all duration-200 hover:bg-neutral-700 text-neutral-400">
              <FiLogOut className="text-4xl" />
              <p className="font-semibold">Logout</p>
            </ClientButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
