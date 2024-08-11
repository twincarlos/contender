import "./Navbar.css";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="Navbar">
            <div className="nav-links">
                <Link className="nav-link" href={"/"}>Home</Link>
                <Link className="nav-link" href={"/"}>Tournament</Link>
                <Link className="nav-link" href={"/"}>Event</Link>
            </div>
            <div className="nav-buttons">
                <button>Report as</button>
            </div>
        </div>
    );
};