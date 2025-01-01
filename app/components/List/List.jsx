import "./List.css";

export default function List({ items, renderItem, identifier }) {
    return (
        <div className="List">
            {items.map((item, idx) => (
                <div
                    key={identifier ? item[identifier] : idx}
                    className="list-item"
                >
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
};