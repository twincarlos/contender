"use client";
import "./Gallery.css";
import { useState } from "react";

export default function Gallery({ items, renderItem, identifier, searchBy }) {
  const [keyword, setKeyword] = useState("");

  const filteredItems = (searchBy && keyword) ? items.filter(item => searchBy(item, keyword)) : items;

  return (
    <div className="Gallery flex flex-direction--column gap">
      {searchBy && <input
        type="text"
        name="search"
        value={keyword}
        placeholder="Search"
        onChange={e => setKeyword(e.target.value)}
      />}
      <div className="gallery-content">
        {filteredItems.map((item, idx) => (
          <div
            key={identifier ? item[identifier] : idx}
            className="gallery-item"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};