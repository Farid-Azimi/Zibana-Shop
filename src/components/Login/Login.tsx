"use client";
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import zibanaLogo from "../../images/Zibana-logo.png";
import { validateEmail, validatePassword } from "../../utils/validation";

interface Errors {
  email?: string | null;
  password?: string | null;
}

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const handleUserClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isModalOpen]);

  const handleChangeInputEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    if (validateEmail(emailValue)) {
      setEmail(emailValue);
      setErrors({ ...errors, email: null });
    } else {
      setErrors({ ...errors, email: "ایمیل معتبر نمی‌باشد" });
    }
  };

  const handleChangeInputPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const passValue = event.target.value;

    if (validatePassword(passValue)) {
      setPassword(passValue);
      setErrors({ ...errors, password: null });
    } else {
      setErrors({ ...errors, password: "رمز عبور باید حداقل 5 حرف باشد" });
      setPassword("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Button
        className="flex px-4 py-2 hover:bg-veryLightGray rounded-xl transition duration-300 ease-in-out"
        onClick={handleUserClick}
      >
        <div className="flex gap-3">
          <div>
            <p className="text-[10px] text-gray text-left">کاربری</p>
            <p className="text-xs mt-1 font-bold">ورود / ثبت نام</p>
          </div>
          <Icon name={"VscAccount"} className={"w-8 h-8"} />
        </div>
      </Button>

      {isModalOpen && (
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
                <h2 className="text-base font-bold p-2 m-4">
                  ورود به حساب کاربری
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col m-4"
                >
                  <span className="p-2 mb-2">
                    لطفا ایمیل و رمز عبور خود را وارد کنید
                  </span>
                  <input
                    ref={emailInputRef}
                    onChange={handleChangeInputEmail}
                    type="email"
                    placeholder="ایمیل"
                    className="border appearance-none p-2 rounded w-full max-w-xs mb-2 border-lightGray shadow-md text-gray focus:border-2 focus:border-gray focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-[#EA2027] text-sm mb-2">
                      {errors.email}
                    </span>
                  )}
                  <input
                    onChange={handleChangeInputPassword}
                    type="password"
                    placeholder="رمز عبور"
                    className="border appearance-none p-2 rounded w-full max-w-xs mb-2 border-lightGray shadow-md text-gray focus:border-2 focus:border-gray focus:outline-none"
                  />
                  {errors.password && (
                    <span className="text-[#EA2027] text-sm">
                      {errors.password}
                    </span>
                  )}
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="my-4 w-24 bg-[#cd84f1] hover:bg-purple--primary hover:text-veryLightGray hover:shadow-lg text-white px-4 py-2 rounded text-center"
                    >
                      تایید
                    </Button>
                  </div>
                  <Link href="#" className="m-4">
                    <span className="text-gray text-sm font-semibold hover:text-purple--primary">
                      حساب کاربری ندارید؟ ثبت نام
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}



// "use client";
// import { useState } from "react";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <>
//       <div>
//         <h1>This is Login page</h1>
//         {submitted ? (
//           <p>Welcome to Zibana Shop, {formData.email}!</p>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>Password: </label>
//               <input
//                 type="text"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label>Email: </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         )}
//       </div>
//     </>
//   );
// }