import React from 'react';

const Spinner = ({ dark, visible, text }) => {
  return (
    <div className={"ct-spinner" + (dark ? " dark" : " light") + (visible ? " visible" : " hidden")}>
      <span className="text">{text}</span>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
