import "./globals.css";

export const metadata = {
  title: "CONTENDER",
  description: "Tournament manager",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
};