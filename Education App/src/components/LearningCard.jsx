import React from 'react';

const LearningCard = ({ title, icon, bgColor, onClick }) => (
    <div
      className="learning-card"
      style={{ backgroundColor: bgColor, cursor: 'pointer' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
    </div>
  );

export default LearningCard;
