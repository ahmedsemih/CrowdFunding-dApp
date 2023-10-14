"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const router = useRouter();
  const [ search, setSearch ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length === 0) return;

    router.push(`/search?q=${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:max-w-[400px] sm:max-w-[280px] w-full flex items-center font-semibold"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="w-full rounded-l-lg p-3 bg-neutral-800 outline-none placeholder:text-neutral-500"
        placeholder="Search for campaign..."
      />
      <button
        onClick={handleSubmit}
        type="submit"
        className="-ml-2 bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 rounded-lg py-3 px-4 border-2 border-emerald-500"
      >
        <FaSearch className="text-xl" />
      </button>
    </form>
  );
};

export default Searchbar;
