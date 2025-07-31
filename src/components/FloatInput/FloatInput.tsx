import "./FloatInput.css";
import { useRef, useState, useEffect } from "react";
import { useOutsideComponentEvent } from "../../utils/methods";
import type { FormEvent } from "react";
import type { FloatInputProps } from "../../utils/types";

function FloatInput({
  value,
  inputID,
  inputType,
  labelString,
  inputAction,
  autocompleteValues,
}: FloatInputProps) {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  useOutsideComponentEvent(autocompleteRef, closeAutocomplete);

  const [showAutocomplete, setShowAutocomplete] = useState(false);

  useEffect(() => {
    setShowAutocomplete(!!autocompleteValues?.length);
  }, [autocompleteValues]);

  function getValue(event: FormEvent<HTMLInputElement>) {
    const element = event.target as HTMLInputElement;
    inputAction(element.value);
  }

  function closeAutocomplete() {
    setShowAutocomplete(false);
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
        value={value}
        ref={inputRef}
        id={inputID}
        type={inputType}
        required
        onInput={getValue}
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
