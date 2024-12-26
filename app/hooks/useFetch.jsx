"use client";
import { useState, useEffect } from "react";

export default function useFetch ({ url, cb }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch(url);
        const data = await response.json();
        cb(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
  
  return { error, loading };
};