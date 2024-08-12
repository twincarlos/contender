import "./Window.css";

export default function Window({ children, showWindow, setShowWindow }) {
    if (!showWindow) return null;
    return (
        <div className="window">
            <button className="close-window" onClick={() => setShowWindow(false)}>X</button>
            {children}
        </div>
    );
};