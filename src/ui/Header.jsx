import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex  items-center justify-between gap-3 bg-amber-400 px-4 py-3 drop-shadow ">
      <Link
        to="/"
        className="flex items-center gap-x-2 text-center text-xl font-bold uppercase  tracking-widest"
      >
        <span className="text-3xl sm:text-2xl">🍕</span>
        <span className="hidden sm:block">Pizaa React App</span>
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
