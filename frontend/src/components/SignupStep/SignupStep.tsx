import useChangeInput from "@/hooks/useChangeInput";
import LoginSignupInput from "../LoginSignupInput/LoginSignupInput";
import {
  validateConfirmPassword,
  validatePassword,
  validateName,
} from "@/utils/loginValidation";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../Button/Button";

export default function SignupStep({
  password,
  handlePassword,
  handleName,
}: {
  password: string;
  handlePassword: Dispatch<SetStateAction<string>>;
  handleName: Dispatch<SetStateAction<string>>;
}) {
  const [, setConfirmPassword] = useState<string>("");

  const { handleChangeInput, errors } = useChangeInput();

  return (
    <>
      <h2 className="font-bold text-base">ثبت نام</h2>
      <LoginSignupInput
        onChangeHandler={(e) =>
          handleChangeInput(
            e,
            validateName,
            "name",
            handleName,
            "نام نباید خالی باشد"
          )
        }
        type={"name"}
        placeholder={"نام"}
      />
      <LoginSignupInput
        onChangeHandler={(e) =>
          handleChangeInput(
            e,
            validatePassword,
            "password",
            handlePassword,
            "رمزعبور وارد شده باید حداقل دارای ۵ کاراکتر باشد"
          )
        }
        type={"password"}
        placeholder={"رمزعبور"}
      />
      <LoginSignupInput
        onChangeHandler={(e) =>
          handleChangeInput(
            e,
            validateConfirmPassword,
            "password",
            setConfirmPassword,
            "با رمز عبور مطابقت ندارد",
            password
          )
        }
        type={"password"}
        placeholder={"تایید رمزعبور"}
      />
      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-[#cd84f1] hover:bg-purple--primary hover:text-veryLightGray hover:shadow-lg text-white p-4 rounded-xl text-center w-full"
        >
          تایید
        </Button>
      </div>
    </>
  );
}
