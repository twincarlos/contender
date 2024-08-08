import "./Navbar.css";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="Navbar">
            <div className="nav-links">
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>Tournament</Link>
                <Link href={"/"}>Event</Link>
            </div>
            <div className="nav-buttons">
                <button>Report as</button>
            </div>
        </div>
    );
};