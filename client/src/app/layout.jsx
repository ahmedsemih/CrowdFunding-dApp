import { Epilogue } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';

import "./globals.css";
import { Layout, Providers } from "@/components";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata = {
  title: "Fund Seed",
  description:
    "Fund Seed is your one-stop destination for bringing your boldest ideas to life. Our platform is designed to make crowdfunding seamless, engaging, and successful for creators and backers alike. Join the Fund Seed community and start sowing the seeds of innovation today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
