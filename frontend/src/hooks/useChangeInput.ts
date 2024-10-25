import { Dispatch, SetStateAction, useState } from "react";

interface Errors {
  email?: string | null;
  password?: string | null;
}

export default function useChangeInput() {
  const [errors, setErrors] = useState<Errors>({});

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    validator:
      | ((value: string, value2: string | undefined) => boolean)
      | ((value: string) => boolean),

    inputName: string,
    stateHandler: Dispatch<SetStateAction<string>>,
    errorMessage: string,
    password?: string
  ) => {
    const value = event.target.value;

    if (validator(value, password)) {
      stateHandler(value);
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: null }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [inputName]: errorMessage,
      }));
      stateHandler("");
    }
  };

  return { handleChangeInput, errors, setErrors };
}
