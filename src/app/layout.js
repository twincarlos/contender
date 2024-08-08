import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

export const metadata = {
  title: "CONTENDER",
  description: "Tournament manager",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};