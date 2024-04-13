import { forwardRef, useState } from "react";

const Input = forwardRef((props, ref) => {
  const { className, title, error } = props;
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <>
      <div className="mb-3 relative cursor-text">
        <input
          id={title}
          {...props}
          placeholder="Input"
          className={`${className} ${error && " border-red-600 "} 
          
          `}

          onBlur={handleFocus}
          ref={ref}
          required
        />
        <label
          htmlFor={title}
          className="cursor-text text-[15px] text-slate-800 text-opacity-80  absolute right-5 top-1/2 -translate-y-1/2 px-1 transition duration-1500 input-text"
        >
          {title}
        </label>
      </div>
      {error ? (
        <div className="-mt-3 text-right mb-2 text-sm text-red-600 mr-1 ltr">
          {error}
        </div>
      ) : null}
    </>
  );
});

export default Input;

