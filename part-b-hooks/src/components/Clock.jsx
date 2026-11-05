import React from 'react';
import useClock from '../hooks/useClock';

export default function Clock() {
  const time = useClock();
  const formatted = time.toLocaleTimeString();
  return <div>⏰ {formatted}</div>;
}

