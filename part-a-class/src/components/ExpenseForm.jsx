import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
      type: 'Ăn uống',
      date: new Date().toISOString().slice(0, 10),
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { description, amount, type, date } = this.state;
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
    this.props.onAdd(newExpense);
    this.setState({ description: '', amount: '', type: 'Ăn uống', date: new Date().toISOString().slice(0, 10) });
  };

  render() {
    const { description, amount, type, date } = this.state;
    return (
      <form onSubmit={this.handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Thêm khoản chi</h3>
        <div>
          <label> Nội dung: </label>
          <input type="text" name="description" value={description} onChange={this.handleChange} required />
        </div>
        <div>
          <label> Số tiền: </label>
          <input type="number" name="amount" value={amount} onChange={this.handleChange} required min="0" />
        </div>
        <div>
          <label> Loại: </label>
          <select name="type" value={type} onChange={this.handleChange}>
            <option>Ăn uống</option>
            <option>Đi lại</option>
            <option>Học tập</option>
            <option>Giải trí</option>
          </select>
        </div>
        <div>
          <label> Ngày: </label>
          <input type="date" name="date" value={date} onChange={this.handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Thêm</button>
      </form>
    );
  }
}

export default ExpenseForm;
