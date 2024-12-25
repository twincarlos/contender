import './Navbar.css';

export default function Navbar({ children }) {
  return (
    <nav className="Navbar">
      <ul className="flex justify-content--flex-end gap">
        {children}
      </ul>
    </nav>
  );
};