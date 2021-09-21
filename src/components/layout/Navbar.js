import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./layout.css";
import "react-tabs/style/react-tabs.css";
import M from "materialize-css";

const Navbar = () => {
  const [activeLi, setActiveLi] = useState();

  const activateLi = (e) => {
    if (activeLi) {
      activeLi.classList.remove("active-navbar");
    }
    e.target.classList.add("active-navbar");
    setActiveLi(e.target);

    const sidenav = document.getElementById("slide-out");
    const instance = M.Sidenav.getInstance(sidenav);
    instance.close();
  };

  const clearActiveLi = () => {
    if (activeLi) {
      activeLi.classList.remove("active-navbar");
    }
    setActiveLi(null);
  };

  useEffect(() => {
    const sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav);
  }, []);

  return (
    <>
      <div className="navbar-fixed">
        <nav className="nav-wrapper grey lighten-5">
          <div className="nav-wrapper">
            <Link
              to="/"
              onClick={clearActiveLi}
              className="logo brand-logo red-text text-accent-4"
            >
              FLEXFLIX
            </Link>
            <a
              href="#sidebar"
              data-target="slide-out"
              className="sidenav-trigger"
            >
              <i className="material-icons black-text">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li onClick={activateLi}>
                <Link to="/find" className="black-text">
                  Find
                </Link>
              </li>
              <li onClick={activateLi}>
                <Link to="/users" className="black-text">
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <ul id="slide-out" className="sidenav">
        <li onClick={activateLi}>
          <Link to="/find" className="black-text">
            Find
          </Link>
        </li>
        <li onClick={activateLi}>
          <Link to="/users" className="black-text">
            Users
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
