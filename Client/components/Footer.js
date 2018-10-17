import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="d-md-none col col-12 col-lg-5">
            <a
              href="https://www.instagram.com/rdwcofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >
              <div className="icon" />
              <span>Instagram соревнований</span>
            </a>
          </div>
          <div className="col col-12">
            <div className="email">
              <div className="icon" />
              <span>
                Поддержка:{' '}
                <a href="mailto:rdwchampionship@gmail.com">
                  rdwchampionship@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
