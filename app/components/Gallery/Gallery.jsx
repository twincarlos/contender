"use client";
import "./Gallery.css";
import { useState } from "react";

export default function Gallery({ items, renderItem, identifier, searchBy }) {
  const [keyword, setKeyword] = useState("");

  const filteredItems = (searchBy && keyword) ? items.filter(item => searchBy(item, keyword)) : items;

  return (
    <div className="Gallery">
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