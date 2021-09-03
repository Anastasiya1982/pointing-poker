import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="line-footer">
        <div className="members-wrapper">
          <div className="member1">
            <a className="member-link" href="https://github.com/Anastasiya1982" target="_blank">
              Sidarovich A.
            </a>
          </div>
          <div className="member2">
            <a className="member-link" href="https://github.com/ValeryiaMIRON" target="_blank">
              Miron V.
            </a>
          </div>
          <div className="member3">
            <a className="member-link" href="https://github.com/PaulRomanov/" target="_blank">
              Romanov P.
            </a>
          </div>
        </div>
        <div className="year">2021</div>
        <div className="rsschool-wrapper">
            <a className="rsschool-link" href="https://rs.school/react/" target="_blank">
              <figure> 
                <img className="rsschool-img" src="../../assets/rs_school_js.svg" alt="rs_logo" /> 
              </figure>
            </a>
          </div>
      </div>
    </div>
  );
};

export default Footer;
