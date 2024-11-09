import useChangeInput from "@/hooks/useChangeInput";
import LoginSignupInput from "../LoginSignupInput/LoginSignupInput";
import {
  validateConfirmPassword,
  validatePassword,
  validateName,
  validatePhoneNumber,
} from "@/utils/loginValidation";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../Button/Button";

export default function SignupStep({
  password,
  handlePassword,
  handleFirstName,
  handleLastName,
  handlePhoneNumber,
}: {
  password: string;
  handlePassword: Dispatch<SetStateAction<string>>;
  handleFirstName: Dispatch<SetStateAction<string>>;
  handleLastName: Dispatch<SetStateAction<string>>;
  handlePhoneNumber: Dispatch<SetStateAction<string>>;
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
            "firstName",
            handleFirstName,
            "نام باید حداقل دارای 2 کاراکتر باشد"
          )
        }
        type={"firstName"}
        placeholder={"نام"}
      />
      {errors.firstName && (
        <span className="text-[#EA2027] text-sm">{errors.firstName}</span>
      )}
      <LoginSignupInput
        onChangeHandler={(e) =>
          handleChangeInput(
            e,
            validateName,
            "lastName",
            handleLastName,
            "نام خانوادگی باید حداقل دارای 2 کاراکتر باشد"
          )
        }
        type={"lastName"}
        placeholder={"نام خانوادگی"}
      />
      {errors.lastName && (
        <span className="text-[#EA2027] text-sm">{errors.lastName}</span>
      )}
      <LoginSignupInput
        onChangeHandler={(e) =>
          handleChangeInput(
            e,
            validatePhoneNumber,
            "phoneNumber",
            handlePhoneNumber,
            "شماره تلفن نامعتبر است"
          )
        }
        type={"tel"}
        placeholder={"شماره تلفن"}
      />
      {errors.phoneNumber && (
        <span className="text-[#EA2027] text-sm">{errors.phoneNumber}</span>
      )}
      <LoginSignupInput
        onChangeHandler={(e) =>
          handleChangeInput(
            e,
            validatePassword,
            "password",
            handlePassword,
            "رمزعبور باید حداقل دارای 6 کاراکتر باشد"
          )
        }
        type={"password"}
        placeholder={"رمزعبور"}
      />
      {errors.password && (
        <span className="text-[#EA2027] text-sm">{errors.password}</span>
      )}
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
