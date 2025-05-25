import PropTypes from "prop-types";
import { useState } from "react";

const Input = ({ field }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Extract maxLength and other input-specific props
  const { maxLength, minLength, disabled, ...inputProps } = field;

  return (
    <div className="relative">
      <input
        {...inputProps}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
          isFocused
            ? "border-blue-500 focus:ring-blue-500/30"
            : "border-gray-600 focus:border-blue-500"
        } text-white placeholder-gray-400`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div
        className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${
          isFocused ? "ring-2 ring-blue-500/30" : ""
        }`}
      />
    </div>
  );
};

Input.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    req: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    disabled: PropTypes.bool,
  }).isRequired,
};

export { Input };