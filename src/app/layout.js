import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Providers from "./redux/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <>
            <div>
              <Header />
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <Sidebar />
              </div>
              <div style={{ width: "100%" }}>{children}</div>
            </div>
          </>
        </Providers>
      </body>
    </html>
  );
}
