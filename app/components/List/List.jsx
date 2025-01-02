"use client";
import "./List.css";
import { useState } from "react";

export default function List({ items, renderItem, identifier, searchBy }) {
    const [keyword, setKeyword] = useState("");

    const filteredItems = (searchBy && keyword) ? items.filter(item => searchBy(item, keyword)) : items;

    return (
        <div className="List">
            {searchBy && <input type="text" name="search" value={keyword} onChange={e => setKeyword(e.target.value)} />}
            {filteredItems.map((item, idx) => (
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