import "./Destination.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDestinations } from "../../store/appStore";
import Spinner from "../../components/Spinner/Spinner";
import FloatInput from "../../components/FloatInput/FloatInput";
import type { DestinationSearchType } from "../../utils/types";
import { useDestinationSearch } from "../../store/appStore";

function Destination() {
  const params = useParams();
  const destinations = useDestinations();
  const destination = destinations.find((dest) => dest.id === params.id);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);
  const [galleryImage, setGalleryImage] = useState<string>("");
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  const [searchedDestination] = useDestinationSearch() as [
    DestinationSearchType
  ];

  useEffect(() => {
    if (searchedDestination) {
      setFormValues({
        checkIn: searchedDestination.checkIn,
        checkOut: searchedDestination.checkOut,
        guests: searchedDestination.guests.toString(),
      });
    }
  }, [searchedDestination]);

  function handleInputChange(data: { name: string; value: string }) {
    const { name, value } = data;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  const galleryImages = Array.from({ length: 6 }).map((_, i) => i);

  const destinationRating =
    destination && destination.rating
      ? Array.from({ length: destination.rating }, (_, i) => i)
      : [];

  function selectImage(event: React.MouseEvent<HTMLImageElement>) {
    const element = event.target as HTMLImageElement;
    setShowLightbox(true);
    document.body.style.overflow = "hidden";
    setGalleryImage(element.src);
  }

  function closeLightbox() {
    setShowLightbox(false);
    document.body.style.overflow = "unset";
  }

  return (
    <section className="destination">
      <section className="destination__title">
        <div
          className="destination__image"
          role="img"
          aria-label={destination?.name}
          style={{
            backgroundImage: `url(${destination?.image}${destination?.id})`,
          }}
        ></div>
        <h1 className="destination__name">{destination?.name}</h1>
        <h2 className="destination__location">
          {destination?.city} {destination?.country}{" "}
          <img
            src={`https://flagcdn.com/24x18/${destination?.country_code.toLowerCase()}.png`}
            alt={destination?.country}
          />
        </h2>
        <p>
          {destinationRating.map((star) => (
            <span key={star}>⭐</span>
          ))}
        </p>
      </section>
      <section className="destination__category">
        <p>
          {destination?.location} {destination?.category}
        </p>
      </section>
      <section className="destination__content">
        <div className="destination__description">
          <h3>Description</h3>
          <p>{destination?.description}</p>
        </div>
        <div className="destination__amenities">
          <ul className="amenities__list">
            {destination?.amenities.map((amenity) => (
              <li className="list__item" key={amenity}>
                <i
                  className={`amenity__icon icon__${amenity.replace(" ", "-")}`}
                ></i>
                {amenity.slice(0, 1).toUpperCase() + amenity.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <p className="destination__price">
        {destination?.price} &euro;
        <span className="per-night">/night</span>
      </p>
      <section className="destination__gallery">
        <h2 className="gallery__title">Gallery</h2>
        <div className="gallery__container">
          {galleryImages.map((_, index) => (
            <div className="gallery__wrapper" key={index}>
              <Spinner />
              <img
                className="gallery__image"
                key={index}
                src={`https://picsum.photos/1000/1000?random=${index}${destination?.id}`}
                alt={`Image ${index}`}
                onClick={selectImage}
              />
            </div>
          ))}
        </div>

        {showLightbox && (
          <div className="gallery__lightbox">
            <span className="lightbox__close" onClick={closeLightbox}>
              &times;
            </span>
            <img
              className="lightbox__image"
              src={galleryImage}
              alt={destination?.name}
            />
          </div>
        )}
      </section>
      <form className="destination__form" onSubmit={(e) => e.preventDefault()}>
        <table>
          <tbody>
            <tr>
              <th colSpan={2}>
                <h3 className="form__title">Make a reservation</h3>
              </th>
            </tr>
            <tr>
              <td>
                <FloatInput
                  inputID="firstName"
                  inputType="text"
                  labelString="First Name"
                  inputAction={() => {}}
                />
              </td>
              <td>
                <FloatInput
                  inputID="lastName"
                  inputType="text"
                  labelString="Last Name"
                  inputAction={() => {}}
                />
              </td>
            </tr>
            <tr>
              <td>
                <FloatInput
                  inputID="email"
                  inputType="email"
                  labelString="Email"
                  inputAction={() => {}}
                />
              </td>
              <td>
                <FloatInput
                  inputID="phone"
                  inputType="tel"
                  labelString="Phone"
                  inputAction={() => {}}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <FloatInput
                  value={formValues.guests}
                  inputID="guests"
                  inputType="number"
                  labelString="Number of guests"
                  inputAction={(value) => {
                    handleInputChange({ name: "guests", value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <FloatInput
                  value={formValues.checkIn}
                  inputID="checkIn"
                  inputType="date"
                  labelString="Check-in"
                  inputAction={(value) => {
                    handleInputChange({ name: "checkIn", value });
                  }}
                />
              </td>
              <td>
                <FloatInput
                  value={formValues.checkOut}
                  inputID="checkOut"
                  inputType="date"
                  labelString="Check-out"
                  inputAction={(value) => {
                    handleInputChange({ name: "checkOut", value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit" className="button">
                  Reserve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </section>
  );
}

export default Destination;
