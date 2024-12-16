import LoginSignupInput from "../LoginSignupInput/LoginSignupInput";
import useChangeInput from "@/hooks/useChangeInput";
import { validatePassword } from "@/utils/loginValidation";
import Button from "../Button/Button";
import { Dispatch, SetStateAction } from "react";

export default function LoginStep({
  handlePassword,
}: {
  handlePassword: Dispatch<SetStateAction<string>>;
}) {
  const { handleChangeInput } = useChangeInput();

  return (
    <>
      <h2 className="font-bold text-base">ورود</h2>
      <span className="mb-2">رمز عبور خود را وارد کنید</span>
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
