import "./globals.css";
import Script from "next/script";
import dynamic from "next/dynamic";
const PlayerProvider = dynamic(() => import("./context/PlayerContext"), { ssr: false });

export const metadata = {
  title: "CONTENDER",
  description: "Tournament manager",
};


export default function RootLayout({ children }) {
  return (
    <html>
      <Script src="https://kit.fontawesome.com/09c2dac4bc.js" crossOrigin="anonymous" />
      <body>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
};