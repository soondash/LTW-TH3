import { useState, useEffect, useCallback } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addItem = async (item) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error(`POST ${res.status}`);
      const newItem = await res.json();
      setData(prev => [...prev, newItem]);
    } catch (e) {
      setError(e);
    }
  };

  const deleteItem = async (id) => {
    try {
      const delUrl = `${url}/${id}`;
      const res = await fetch(delUrl, { method: 'DELETE' });
      if (!res.ok) throw new Error(`DELETE ${res.status}`);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      setError(e);
    }
  };

  const updateItem = async (id, updates) => {
    try {
      const putUrl = `${url}/${id}`;
      const res = await fetch(putUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error(`PUT ${res.status}`);
      const updated = await res.json();
      setData(prev => prev.map(item => (item.id === id ? updated : item)));
    } catch (e) {
      setError(e);
    }
  };

  return { data, loading, error, addItem, deleteItem, updateItem, refetch: fetchData };
}

