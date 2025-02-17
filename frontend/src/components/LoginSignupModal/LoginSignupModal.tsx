import Button from "../Button/Button";
import zibanaLogo from "../../images/Zibana-logo.png";
import { validateEmail } from "../../utils/loginValidation";
import Image from "next/image";
import { EmailExistenceResponse } from "@/types/emailExistingType";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Icon from "../Icon/Icon";
import LoginSignupInput from "../LoginSignupInput/LoginSignupInput";
import useChangeInput from "@/hooks/useChangeInput";
import SignupStep from "../SignupStep/SignupStep";
import Successful from "../Successful/Successful";
import LoginStep from "../LoginStep/LoginStep";
import LoginSignupError from "../LoginSignupError/LoginSignupError";
import { useUserStore } from "../../stores/useUserStore";
import { useHttpClient } from "../../hooks/http-hook";

export default function LoginSignupModal({
  handleIsModalOpen,
}: {
  handleIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { handleChangeInput, errors } = useChangeInput();
  const { setUser } = useUserStore();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const checkEmailExistence = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/existence?email=${encodeURIComponent(
          email
        )}`,
        "GET"
      );
      const data = responseData as EmailExistenceResponse;
      console.log("data");
      return data.exists;
    } catch (error) {
      console.error("Error checking email existence:", error);
    }
  };

  const signupUser = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
        }),
        { "Content-Type": "application/json" }
      );

      if (responseData && responseData.user && responseData.token) {
        const { id, email, firstName, lastName } = responseData.user;
        const token = responseData.token;
        setUser(id, email, firstName, lastName, token);
        setSignedUp(true);
      }
    } catch (error) {
    } finally {
      closeModal();
    }
  };

  const loginUser = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify({ email, password }),
        { "Content-Type": "application/json" }
      );
      if (responseData) {
        setUser(
          responseData.id,
          responseData.email,
          responseData.firstName,
          responseData.lastName,
          responseData.token
        );
        setLoggedIn(true);
      }
    } catch (error) {
    } finally {
      closeModal();
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

  return (
    <>
      <div
        className="fixed inset-0 bg-lightGray bg-opacity-70 z-[100] backdrop-blur-md"
        onClick={closeModal}
      />
      <div className="fixed inset-0 flex items-center justify-center z-[101]">
        <div className="bg-white min-w-[45%] min-h-[60%] w-auto h-auto rounded-lg shadow-lg relative flex">
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
              loading="lazy"
              className="h-18 w-52"
            />
          </div>

          <div className="w-2/3 flex flex-col bg-[#ffcccc] p-4">
            {isLoading ? (
              <>
                <div className="flex items-center justify-center w-full h-full">
                  <LoadingSpinner size={64} color="purple-500" speed="spin" />
                </div>
              </>
            ) : (
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
                    handleFirstName={setFirstName}
                    handleLastName={setLastName}
                    handlePhoneNumber={setPhoneNumber}
                  />
                ) : (
                  <></>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
