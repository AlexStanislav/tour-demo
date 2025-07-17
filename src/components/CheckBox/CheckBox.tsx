import "./CheckBox.css";
import type { CheckBoxProps } from "../../utils/types";
import { capitalizeFirstLetter } from "../../utils/methods";

function CheckBox({ type = "checkbox", label, name, inputAction }: CheckBoxProps) {
  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    inputAction({ name: event.target.name, checked: event.target.checked, value: label });
  }

  return (
    <label className="checkbox-container">
      {name === "amenities" && <i className={`checkbox__icon icon__${label.replace(" ", "-")}`}></i>}
      {capitalizeFirstLetter(label)}
      <input
        type={type}
        className="checkbox"
        name={name}
        onChange={handleCheck}
      />
      <span className="checkmark"></span>
    </label>
  );
}

export default CheckBox;
