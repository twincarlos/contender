"use client";
import "./List.css";
import { useState } from "react";

export default function List({ items, renderItem, identifier, searchBy }) {
    const [keyword, setKeyword] = useState("");

    const filteredItems = (searchBy && keyword) ? items.filter(item => searchBy(item, keyword)) : items;

    return (
        <div className="List flex flex-direction--column gap">
            {searchBy && <input
                type="text"
                name="search"
                value={keyword}
                placeholder="Search"
                onChange={e => setKeyword(e.target.value)}
            />}
            <div className="list-content">
                {filteredItems.map((item, idx) => (
                    <div
                        key={identifier ? item[identifier] : idx}
                        className="list-item"
                    >
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </div>
    );
};