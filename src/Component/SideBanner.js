import React from 'react';
import { Link } from "react-router-dom";
const SideBanner = () => {
  return (
     
              <div className="form__page__logo">
                <Link to={""}>
                  <img src={process.env.PUBLIC_URL + '/assets/img/logo-main.svg'} alt="" />
                </Link>
              </div>
            
  )
}
export default SideBanner;  