import React, { useState, useEffect, useContext } from 'react';
import Clock from './components/Clock';
import Stats from './components/Stats';
import useDebounce from './hooks/useDebounce';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filter from './components/Filter';
import Total from './components/Total';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import useFetch from './hooks/useFetch';

// Mock API endpoint (replace with actual mockapi.io URL)
const API_URL = 'https://6aebebb4ee39618d7bf8a1e9.mockapi.io/expenses';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: expenses = [], loading, error, addItem, deleteItem } = useFetch(API_URL);
  const [filterType, setFilterType] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter by type and search term
  const filteredExpenses = expenses.filter(e => {
    const matchesType = filterType === 'Tất cả' || e.type === filterType;
    const matchesSearch = e.description.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesType && matchesSearch;
  });

  const total = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // Update document title with total
  useEffect(() => {
    document.title = `Total: ${total}`;
  }, [total]);

  const handleAdd = async (newExpense) => {
    await addItem(newExpense);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      await deleteItem(id);
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1>📝 Sổ chi tiêu cá nhân (Hooks)</h1>
        <button onClick={toggleTheme} style={{ marginBottom: '10px' }}>
          Chế độ {theme === 'light' ? 'tối' : 'sáng'}
        </button>
        <Clock />
      </header>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      <ExpenseForm onAdd={handleAdd} />
      <div style={{ marginBottom: '10px' }}>
        <label> Tìm kiếm: </label>
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Nhập mô tả..." />
      </div>
      <Filter current={filterType} onChange={handleFilterChange} />
      <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} />
      <Total total={total} />
      <Stats expenses={filteredExpenses} />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
