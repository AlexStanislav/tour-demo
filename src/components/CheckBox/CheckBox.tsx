import "./CheckBox.css";
import type { CheckBoxProps } from "../../utils/types";
import { capitalizeFirstLetter } from "../../utils/methods";

function CheckBox({
  type = "checkbox",
  label,
  name,
  checked,
  inputAction,
}: CheckBoxProps) {
  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    inputAction({
      name: event.target.name,
      checked: event.target.checked,
      value: label,
    });
  }

  const testId =
    name === "rating"
      ? `${label.split("").length}-stars`
      : label.split(" ").join("-").toLowerCase();

  return (
    <label className="checkbox-container">
      {name === "amenities" && (
        <i
          data-testid="amenities-icon"
          className={`checkbox__icon icon__${label.replace(" ", "-")}`}
        ></i>
      )}
      {capitalizeFirstLetter(label)}
      <input
        role="checkbox"
        type={type}
        className="checkbox"
        name={name}
        onChange={handleCheck}
        checked={checked}
        data-testid={testId}
      />
      <span className="checkmark"></span>
    </label>
  );
}

export default CheckBox;
