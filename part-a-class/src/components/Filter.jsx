import React, { Component } from 'react';

class Filter extends Component {
  render() {
    const { current, onChange } = this.props;
    const types = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];
    return (
      <div style={{ marginBottom: '10px' }}>
        <label> Lọc theo loại: </label>
        <select value={current} onChange={e => onChange(e.target.value)}>
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default Filter;
