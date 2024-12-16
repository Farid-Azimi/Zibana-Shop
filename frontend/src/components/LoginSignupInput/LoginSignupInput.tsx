import { useEffect, useRef } from "react";
import { ChangeEventHandler } from "react";

export default function LoginSignupInput({
  onChangeHandler,
  type,
  placeholder,
}: {
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  type: string;
  placeholder: string;
}) {
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    <input
      onChange={onChangeHandler}
      type={type}
      placeholder={placeholder}
      ref={emailInputRef}
      className="border appearance-none p-4 rounded-xl w-full border-lightGray shadow-md text-gray focus:border-2 focus:border-gray focus:outline-none"
    />
  );
}
