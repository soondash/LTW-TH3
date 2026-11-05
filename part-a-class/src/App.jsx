import React, { Component } from 'react';
import Clock from './components/Clock';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filter from './components/Filter';
import Total from './components/Total';

// Sample data
const SAMPLE_EXPENSES = [
  { id: 1, description: 'Lunch', amount: 50, type: 'Ăn uống', date: '2023-09-01' },
  { id: 2, description: 'Bus ticket', amount: 20, type: 'Đi lại', date: '2023-09-02' },
  { id: 3, description: 'Book', amount: 100, type: 'Học tập', date: '2023-09-03' },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: SAMPLE_EXPENSES,
      filterType: 'Tất cả', // all types
    };
  }

  componentDidMount() {
    document.title = `Total: ${this.calculateTotal()}`;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      document.title = `Total: ${this.calculateTotal()}`;
    }
  }

  calculateTotal = () => {
    const { expenses, filterType } = this.state;
    const filtered = filterType === 'Tất cả'
      ? expenses
      : expenses.filter(e => e.type === filterType);
    return filtered.reduce((sum, e) => sum + Number(e.amount), 0);
  };

  handleAddExpense = (newExpense) => {
    this.setState(prev => ({
      expenses: [...prev.expenses, { ...newExpense, id: Date.now() }],
    }));
  };

  handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      this.setState(prev => ({
        expenses: prev.expenses.filter(e => e.id !== id),
      }));
    }
  };

  handleFilterChange = (type) => {
    this.setState({ filterType: type });
  };

  render() {
    const { expenses, filterType } = this.state;
    const filteredExpenses = filterType === 'Tất cả'
      ? expenses
      : expenses.filter(e => e.type === filterType);
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <header style={{ marginBottom: '20px' }}>
          <h1>📝 Sổ chi tiêu cá nhân</h1>
          <Clock />
        </header>
        <ExpenseForm onAdd={this.handleAddExpense} />
        <Filter current={filterType} onChange={this.handleFilterChange} />
        <ExpenseList expenses={filteredExpenses} onDelete={this.handleDelete} />
        <Total total={this.calculateTotal()} />
      </div>
    );
  }
}

export default App;

