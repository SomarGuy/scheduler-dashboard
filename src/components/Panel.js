import React from "react";

const Panel = ({ id, label, value, onSelect }) => {
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div className="panel" onClick={handleClick}>
      <h2 className="panel__label">{label}</h2>
      <div className="panel__value">{value}</div>
    </div>
  );
};

export default Panel;
