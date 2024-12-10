import React from 'react';

const QuantitySelector = ({ quantity, onChange, max = 30 }) => {
  return (
    <select
      value={quantity}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {[...Array(max)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  );
};

export default QuantitySelector;