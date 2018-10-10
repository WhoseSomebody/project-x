import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col col-12 col-lg-5">
            <a
              href="https://www.instagram.com/roadtothedream"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >
              <div className="icon" /> Instagram соревнований
            </a>
          </div>
          <div className="col col-12 col-lg-7">
            <div className="email">
              <div className="icon" />
              Поддержка:{' '}
              <a href="mailto:rdchampionship@gmail.com">
                rdchampionship@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
