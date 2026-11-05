import React, { Component } from 'react';

class ExpenseList extends Component {
  render() {
    const { expenses, onDelete } = this.props;
    return (
      <div style={{ marginTop: '20px' }}>
        <h3>Danh sách chi tiêu</h3>
        {expenses.length === 0 ? (
          <p>Không có khoản chi nào.</p>
        ) : (
          <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Nội dung</th>
                <th>Số tiền</th>
                <th>Loại</th>
                <th>Ngày</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id}>
                  <td>{exp.description}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.type}</td>
                  <td>{exp.date}</td>
                  <td>
                    <button onClick={() => onDelete(exp.id)} style={{ color: 'red' }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default ExpenseList;
