import Button from "../Button/Button";
import zibanaLogo from "../../images/Zibana-logo.png";
import { validateEmail, validatePassword } from "../../utils/loginValidation";
import Image from "next/image";
import { EmailExistenceResponse } from "@/types/emailExistingType";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Icon from "../Icon/Icon";
import LoginSignupInput from "../LoginSignupInput/LoginSignupInput";
import useChangeInput from "@/hooks/useChangeInput";
import SignupStep from "../SignupStep/SignupStep";
import Successful from "../Successful/Successful";
import LoginStep from "../LoginStep/LoginStep";
import LoginSignupError from "../LoginSignupError/LoginSignupError";

export default function LoginSignupModal({
  isModalOpen,
  handleIsModalOpen,
}: {
  isModalOpen: boolean;
  handleIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const { handleChangeInput, errors } = useChangeInput();

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const checkEmailExistence = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/existence?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check user existence");
      }

      const data = (await response.json()) as EmailExistenceResponse;
      return data.exists;
    } catch (error) {
      setError(true);
    }
  };

  const signupUser = async () => {
    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to signup, please try again later");
    }

    const data = await response.json();

    if (data) {
      setSignedUp(true);
    }
  };

  const loginUser = async () => {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login, please try again later");
    }

    const data = await response.json();

    if (data.message === "Logged in!") {
      setLoggedIn(true);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailExists === null) {
      const exists = await checkEmailExistence();

      if (exists) {
        setEmailExists(true);
      } else {
        setEmailExists(false);
      }
    } else if (!emailExists) {
      signupUser();
    } else if (emailExists) {
      loginUser();
    }
  };

  const closeModal = () => {
    handleIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <>
      <div
        className="fixed inset-0 bg-lightGray bg-opacity-70 z-40 backdrop-blur-md"
        onClick={closeModal}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-[45%] h-[60%] rounded-lg shadow-lg relative flex">
          <Button
            onClick={closeModal}
            className="absolute top-4 left-4 hover:text-gray text-black"
          >
            <Icon name="CiSquareRemove" />
          </Button>

          <div className="w-1/3 flex justify-center items-center">
            <Image
              src={zibanaLogo.src}
              width={150}
              height={150}
              alt="Logo"
              className="h-18 w-52"
            />
          </div>

          <div className="w-2/3 flex flex-col bg-[#ffcccc] p-4">
            <form
              onSubmit={handleSubmit}
              className="w-5/6 flex flex-col my-16 gap-6 mx-auto h-full"
            >
              {emailExists === null ? (
                <>
                  <h2 className="text-base font-bold">ورود / ثبت نام</h2>
                  <span className="mb-2">لطفا ایمیل خود را وارد کنید</span>
                  <LoginSignupInput
                    onChangeHandler={(e) =>
                      handleChangeInput(
                        e,
                        validateEmail,
                        "email",
                        setEmail,
                        "لطفا یک ایمیل معتبر وارد کنید"
                      )
                    }
                    type={"email"}
                    placeholder={"ایمیل"}
                  />
                  {errors.email && (
                    <span className="text-[#EA2027] text-sm">
                      {errors.email}
                    </span>
                  )}
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="bg-[#cd84f1] hover:bg-purple--primary hover:text-veryLightGray hover:shadow-lg text-white p-4 rounded-xl text-center w-full"
                    >
                      تایید
                    </Button>
                  </div>
                </>
              ) : error ? (
                <LoginSignupError />
              ) : emailExists && loggedIn ? (
                <Successful login={true} />
              ) : emailExists ? (
                <LoginStep handlePassword={setPassword} />
              ) : !emailExists && signedUp ? (
                <Successful login={false} />
              ) : !emailExists ? (
                <SignupStep
                  handlePassword={setPassword}
                  password={password}
                  handleName={setName}
                />
              ) : (
                <></>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
