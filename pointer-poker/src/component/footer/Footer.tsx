import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="line-footer">
        <div className="members-wrapper">
          <div className="member1">
            <a className="member-link" href="https://github.com/Anastasiya1982">
              Sidarovich A.
            </a>
          </div>
          <div className="member2">
            <a className="member-link" href="https://github.com/ValeryiaMIRON">
              Miron V.
            </a>
          </div>
          <div className="member3">
            <a className="member-link" href="https://github.com/PaulRomanov/">
              Romanov P.
            </a>
          </div>
        </div>
        <div className="year">2021</div>
        <div className="rsschool-wrapper">
            <a className="rsschool-link" href="https://rs.school/react/">
            <img src="../../assets/rs_school_js.svg" alt="rs_logo" />
            </a>
          </div>
      </div>
    </div>
  );
};

export default Footer;
