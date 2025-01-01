import Link from "next/link";
import "./Navbar.css";

export default function Navbar({ children }) {
  return (
    <nav className="Navbar">
      <Link href="/"><h6>CONTENDER</h6></Link>
      <div className="nav-buttons flex justify-content--space-between">{children}</div>
    </nav>
  );
}
