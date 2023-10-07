"use client";

import Loader from "../Loader";

const ClientButton = ({ children, className, onClick, loading = false, type = 'button' }) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type={type}
      className={`${className} ${loading && "min-w-[100px] min-h-[48px]"}`}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default ClientButton;
