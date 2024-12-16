import Image from "next/image";
import SearchBox from "../SearchBox/SearchBox";
import Navbar from "../Navbar/Navbar";
import zibanaLogo from "../../images/Zibana-logo.png";
import Login from "../LoginSignup/LoginSignup";
import CartDropdown from "../CartDropdown/CartDropdown";

export default function Header() {
  return (
    <>
      <header>
        <div className="flex justify-between">
          <div className="flex gap-14">
            <Image src={zibanaLogo.src} width={200} height={200} alt="Logo" />
            <SearchBox />
          </div>

          <div className="flex justify-end my-auto relative gap-2">
            <Login />
            <CartDropdown />
          </div>
        </div>
        <Navbar />
      </header>
    </>
  );
}

// export default function Header() {
//   const [isNavbarVisible, setIsNavbarVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const handleScroll = () => {
//     const currentScrollY = window.scrollY;
//     if (currentScrollY > lastScrollY && currentScrollY > 100) {
//       setIsNavbarVisible(false);
//     } else {
//       setIsNavbarVisible(true);
//     }
//     setLastScrollY(currentScrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ${
//         isNavbarVisible ? "translate-y-0" : "-translate-y-full"
//       }`}
//     >
//       <div className="flex justify-between px-4 py-2">
//         <div className="flex gap-14">
//           <Image src={zibanaLogo.src} width={200} height={200} alt="Logo" />
//           <SearchBox />
//         </div>

//         <div className="flex justify-end my-auto relative gap-2">
//           <Login />
//           <CartDropdown />
//         </div>
//       </div>
//       <Navbar />
//     </header>
//   );
// }
