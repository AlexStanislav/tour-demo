import "./FloatInput.css";
import { useRef, useState } from "react";
import type { FloatInputProps } from "../../utils/types";

function FloatInput({
  inputValue,
  inputID,
  inputType,
  labelString,
  inputAction,
  autocompleteValues,
}: FloatInputProps) {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  const [showAutocomplete, setShowAutocomplete] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    inputAction(event.target.value);
    if (event.target.value) {
      setShowAutocomplete(true);
    }

    if (!event.target.value) {
      setShowAutocomplete(false);
    }

    if (!autocompleteValues) {
      setShowAutocomplete(false);
    }
  }

  function selectAutocompleteValue(destination: string) {
    const inputElement = inputRef.current as unknown as HTMLInputElement;
    inputElement.value = destination;
    inputAction(destination);
    setTimeout(() => {
      setShowAutocomplete(false);
    }, 50);
  }

  return (
    <div className="float-element">
      <input
        data-testid={`test-${inputID}`}
        className="float-element__input"
        value={inputValue}
        ref={inputRef}
        id={inputID}
        type={inputType}
        required
        onInput={handleInputChange}
      />
      <label className="float-element__label" htmlFor={inputID}>
        {labelString}
      </label>
      {showAutocomplete && (
        <div
          ref={autocompleteRef}
          className="float-element__container"
          data-testid="autocomplete-container"
        >
          <ul
            role="listbox"
            className="float-element__autocomplete"
            data-testid="autocomplete"
          >
            {autocompleteValues?.map((value, index) => (
              <li
                data-testid="autocomplete-item"
                className="autocomplete__item"
                key={index}
                onClick={() => selectAutocompleteValue(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FloatInput;
