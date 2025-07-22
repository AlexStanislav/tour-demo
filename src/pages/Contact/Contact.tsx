import FloatInput from "../../components/FloatInput/FloatInput";
import "./Contact.css";

function Contact() {
  return (
    <section className="contact">
      <section className="contact__left">
        <h2 className="contact__title">Contact</h2>

        <ul className="contact__list">
          <li className="contact__item">
            <h3>
              <i className="pi pi-map-marker"></i>Address
            </h3>
            <p>123 Main St, Anytown, USA</p>
          </li>
          <li className="contact__item">
            <h3>
              <i className="pi pi-phone"></i>Phone
            </h3>
            <p>(123) 456-7890</p>
          </li>
          <li className="contact__item">
            <h3>
              <i className="pi pi-envelope"></i>Email
            </h3>
            <p>demotour@example.com</p>
          </li>
        </ul>

        <p className="contact__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos,
          reprehenderit fugiat? Porro, veritatis aliquid eos deserunt tenetur
          unde laboriosam. Voluptatem maxime at pariatur ad, eius sit nemo saepe
          accusantium. Vero.
        </p>

        <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
          <FloatInput
            inputID={"contact-name"}
            inputType={"text"}
            labelString={"Name"}
            inputAction={() => {}}
          />
          <FloatInput
            inputID={"contact-email"}
            inputType={"email"}
            labelString={"Email"}
            inputAction={() => {}}
          />
          <textarea
            className="contact__textarea"
            placeholder="Message"
          ></textarea>
          <button className="contact__button" type="submit">
            Send
          </button>
        </form>
      </section>
      <section className="contact__right">
        <img className="contact__image" src="https://picsum.photos/800/600?random=1" alt="" />
      </section>
    </section>
  );
}

export default Contact;
