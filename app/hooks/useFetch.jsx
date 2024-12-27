"use client";
import { useState, useEffect } from "react";

export default function useFetch({ url, cb }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      cb(data);
    };

    fetchData();
  }, [url]);

  return { loading };
};