import React from 'react';

export default function Stats({ expenses }) {
  const types = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];
  const totals = types.map(type => {
    const sum = expenses
      .filter(e => e.type === type)
      .reduce((acc, cur) => acc + Number(cur.amount), 0);
    return { type, sum };
  });
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Thống kê theo loại</h3>
      <ul>
        {totals.map(t => (
          <li key={t.type}>
            {t.type}: {t.sum}
          </li>
        ))}
      </ul>
    </div>
  );
}

