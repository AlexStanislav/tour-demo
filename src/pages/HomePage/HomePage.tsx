import "./HomePage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDestinations } from "../../store/appStore";
import { getTrendingDestinations, getLocations } from "../../utils/methods";
import DestinationSearch from "../../components/DestinationSearch/DestinationSearch";
import Spinner from "../../components/Spinner/Spinner";

function HomePage() {
  const destinations = useDestinations();
  const countryCodes = ["US", "FR", "DE", "ES", "IT", "BG"];
  const [selectedLocation, setSelectedLocation] = useState<string>("city");
  const locations = getLocations(destinations, 6);
  const navigate = useNavigate();

  const trendingDestinations = getTrendingDestinations(
    countryCodes,
    destinations
  );

  return (
    <>
      <section className="home__overlay">
        <div
          className="home__image"
          role="img"
          aria-label="Screenshot of a hotel pool"
        ></div>
        <div className="home__titles">
          <h1 className="home__title">Tour Demo</h1>
          <h2 className="home__subtitle">Find your dream destination!</h2>
        </div>
        <DestinationSearch />
      </section>
      <section className="home__destinations">
        <h2 className="title">Trending Destinations</h2>
        <h5 className="subtitle">Most popular destinations</h5>
        <div className="trending">
          {trendingDestinations.map((dest) => (
            <div
              key={dest.name}
              className="trending__card"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(`/destination/${dest.id}`);
              }}
            >
              <div className="trending__overlay"></div>

              <Spinner />
              <img
                className="trending__image"
                src={`${dest.image}${dest.id}`}
                alt={dest.name}
              />

              <div className="trending__info">
                <h3 className="trending__title">
                  {dest.name}
                  <img
                    className="trending__flag"
                    src={`https://flagcdn.com/24x18/${dest.country_code.toLowerCase()}.png`}
                    alt={dest.country}
                  />
                </h3>
                <p className="trending__location">
                  {dest.city}, {dest.country}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h1 className="title">Popular Locations to Visit</h1>
        <h5 className="subtitle">
          Quickly browse destinations based on what you're looking for
        </h5>
        <div className="locations">
          <nav className="locations__buttons">
            {locations.locationCategories.map((category, index) => (
              <button
                type="button"
                key={index}
                className={`locations__button ${
                  selectedLocation === category
                    ? "locations__button--active"
                    : ""
                }`}
                onClick={() => setSelectedLocation(category)}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </nav>
          <div className="locations__cards">
            {locations.locationData[selectedLocation] &&
              locations.locationData[selectedLocation].map((dest) => (
                <div
                  className="locations__card"
                  key={dest.name}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/destination/${dest.id}`);
                  }}
                >
                  <Spinner />
                  <img
                    className="locations__image"
                    src={`${dest.image}${dest.id}`}
                    alt={dest.name}
                  />
                  <div className="locations__info">
                    <h4 className="locations__title">
                      {dest.name}
                      <img
                        className="locations__flag"
                        src={`https://flagcdn.com/24x18/${dest.country_code.toLowerCase()}.png`}
                        alt={dest.country}
                      />
                    </h4>
                    <p>
                      <span className="locations__city">{dest.city}</span>,{" "}
                      <span className="locations__category">
                        {dest.category.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="home__info">
        <img
          className="info__image"
          src="/assets/img/undraw_travelers_kud9.svg"
          alt="Travelers icon"
        />
        <div className="info__text">
          <h2 className="info__title">Why Book with us?</h2>
          <ul className="info__list">
            <li className="info__item">
              <i className="icon__check"></i>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </li>
            <li className="info__item">
              <i className="icon__check"></i>
              Sunt commodi unde dolorum soluta iste iure nesciunt sint doloribus
              deleniti.
            </li>
            <li className="info__item">
              <i className="icon__check"></i>
              Laborum voluptates odit beatae quaerat id delectus consequuntur
              ut!
            </li>
            <li className="info__item">
              <i className="icon__check"></i>
              Consequatur, voluptatibus.
            </li>
            <li className="info__item">
              <i className="icon__check"></i>
              Corporis, quidem.
            </li>
          </ul>
          <button className="button" onClick={() => navigate("/destinations")}>
            Find your dream destination
          </button>
        </div>
      </section>
    </>
  );
}

export default HomePage;
