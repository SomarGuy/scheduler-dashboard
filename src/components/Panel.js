import React from "react";

const Panel = ({ label, value, onSelect }) => {
  return (
    <div className="panel" onClick={onSelect}>
      <h2 className="panel__label">{label}</h2>
      <div className="panel__value">{value}</div>
    </div>
  );
};

export default Panel;
