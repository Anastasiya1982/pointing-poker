import React from 'react';
import './avatar.css';

const Avatar = () => {
  return (
    <div className="avatar-container">
      <div className="avatar-info" id="avatar">
        <div className="avatar-info-name" id="name">
          PP
        </div>
      </div>

      <div className="avatar-image-container">
        <img className="avatar-image" src="" alt="" />
      </div>
    </div>
  );
};

export default Avatar;
