import classNames from "classnames";
import Link from "next/link";
import React from "react";
import styles from "../../styles/footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={classNames("bg-dark  text-white", styles.footer)}>
      <div className="container p-4">
        {/* <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section> */}

        <section className="">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0"></div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <ul className="list-unstyled mb-0">
                <li>
                  <Link href="/teams">Týmy</Link>
                </li>
                <li>
                  <Link href="/players">Hráči</Link>
                </li>
                <li>
                  <Link href="/points">Body</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <ul className="list-unstyled mb-0">
                <li>
                  <Link href="/login">Přihlášení na server</Link>
                </li>
                <li>
                  <Link href="/donate">Donations</Link>
                </li>
                <li>
                  <Link href="/support">Support</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0"></div>
          </div>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
