import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <section className="footer__content">
          <h3 className="footer__title">About</h3>
          <ul className="footer__list footer__about">
            <li className="list__item">Lorem ipsum</li>
            <li className="list__item">Dolor sit amet</li>
            <li className="list__item">Consectetur adipiscing</li>
            <li className="list__item">Elit sed</li>
            <li className="list__item">Do eiusmod</li>
            <li className="list__item">Tempor incididunt</li>
            <li className="list__item">Ullamco laboris</li>
          </ul>
        </section>
        <section className="footer__content">
          <h3 className="footer__title">Links</h3>
          <ul className="footer__list footer__links">
            <li className="list__item">Home</li>
            <li className="list__item">Destinations</li>
            <li className="list__item">Contact</li>
          </ul>
        </section>
        <section className="footer__content">
          <h3 className="footer__title">Legal</h3>
          <ul className="footer__list footer__legal">
            <li className="list__item">Privacy Policy</li>
            <li className="list__item">Terms of Service</li>
            <li className="list__item">Cookies</li>
            <li className="list__item">Licenses</li>
          </ul>
        </section>
        <section className="footer__content">
          <h3 className="footer__title">Partners</h3>
          <ul className="footer__list footer__partners">
            <li className="list__item">Lorem ipsum</li>
            <li className="list__item">Dolor sit amet</li>
            <li className="list__item">Consectetur adipiscing</li>
            <li className="list__item">Elit sed</li>
            <li className="list__item">Do eiusmod</li>
          </ul>
        </section>
        <section className="footer__content">
          <h3 className="footer__title">Socials</h3>
          <ul className="footer__list footer__socials">
            <li className="list__item">
              <i className="list__icon icon__facebook"></i>
              Facebook
            </li>
            <li className="list__item">
              <i className="list__icon icon__instagram"></i>
              Instagram
            </li>
            <li className="list__item">
              <i className="list__icon icon__twitter"></i>
              Twitter
            </li>
          </ul>
        </section>
      </div>
      <p className="footer__copyright">
        All copyrights belong to their respective owners.
      </p>
    </footer>
  );
}

export default Footer;
