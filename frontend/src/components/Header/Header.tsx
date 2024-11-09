import Image from "next/image";
import SearchBox from "../SearchBox/SearchBox";
import Navbar from "../Navbar/Navbar";
import zibanaLogo from "../../images/Zibana-logo.png";
import Login from "../Login/Login";
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
