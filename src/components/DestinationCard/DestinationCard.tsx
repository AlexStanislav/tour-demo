import "./DestinationCard.css";
import type { DestinationType } from "../../utils/types";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

function DestinationCard({ destination }: { destination: DestinationType }) {
  const navigate = useNavigate();
  return (
    <div className="card" key={destination.id} onClick={() => navigate(`/destination/${destination.id}`)}>
      <div className="card__container">
        <img
          className="card__image"
          src={`${destination.image}${destination.id}`}
          alt={destination.name}
        />
        <Spinner />
      </div>
      <div className="card__content">
        <h3 className="card__title">{destination.name}</h3>
        <img
          className="card__flag"
          src={`https://flagcdn.com/24x18/${destination.country_code.toLowerCase()}.png`}
          alt={destination.country}
        />
        <p className="card__location">
          {destination.location}, {destination.country}, {destination.city}
        </p>
        <p className="card__rating">
          {Array(destination.rating).fill("⭐").join("")}
        </p>
        <p className="card__description">
          {destination.description.slice(0, 200)}...
        </p>
        <p className="card__price">${destination.price}</p>
      </div>
    </div>
  );
}


export default DestinationCard;