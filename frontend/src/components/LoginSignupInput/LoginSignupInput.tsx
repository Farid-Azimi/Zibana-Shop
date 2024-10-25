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
  return (
    <input
      onChange={onChangeHandler}
      type={type}
      placeholder={placeholder}
      className="border appearance-none p-4 rounded-xl w-full mb-2 border-lightGray shadow-md text-gray focus:border-2 focus:border-gray focus:outline-none"
    />
  );
}
