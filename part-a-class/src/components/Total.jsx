import React, { Component } from 'react';

class Total extends Component {
  render() {
    const { total } = this.props;
    return (
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Tổng tiền: {total}
      </div>
    );
  }
}

export default Total;
