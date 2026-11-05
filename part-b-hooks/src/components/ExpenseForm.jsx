import React, { useState, useRef } from 'react';

export default function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Ăn uống');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const descRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || !amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Vui lòng nhập mô tả và số tiền hợp lệ');
      return;
    }
    const newExpense = {
      description: description.trim(),
      amount: Number(amount),
      type,
      date,
    };
    await onAdd(newExpense);
    setDescription('');
    setAmount('');
    setType('Ăn uống');
    setDate(new Date().toISOString().slice(0, 10));
    descRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>Thêm khoản chi</h3>
      <div>
        <label> Nội dung: </label>
        <input ref={descRef} type="text" value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <div>
        <label> Số tiền: </label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required min="0" />
      </div>
      <div>
        <label> Loại: </label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option>Ăn uống</option>
          <option>Đi lại</option>
          <option>Học tập</option>
          <option>Giải trí</option>
        </select>
      </div>
      <div>
        <label> Ngày: </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Thêm</button>
    </form>
  );
}

