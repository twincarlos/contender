import Script from "next/script";
import "./globals.css";
import ModalProvider from "./context/ModalContext";
import { Inter } from "next/font/google";
import Modal from "./components/Modal/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CONTENDER",
  description: "Table Tennis Tournament Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src="https://kit.fontawesome.com/09c2dac4bc.js"
          crossOrigin="anonymous"
        />
        <ModalProvider>
          <Modal />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
