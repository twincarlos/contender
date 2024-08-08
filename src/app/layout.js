import "./globals.css";

export const metadata = {
  title: "contenderTT",
  description: "Tournament manager",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};