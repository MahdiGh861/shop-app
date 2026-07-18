import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import UserButton from "./UserButton";
import CartButton from "./CartButton";
function Header() {
  return (
    <header className="w-full border-b">
      <div className="flex justify-between items-center flex-1 max-w-7xl py-5 px-10 w-full mx-auto">
        <div className="flex justify-between items-center ">
          <Link href="/" className="flex justify-start items-center">
            <span className="block font-bold text-2xl mr-3">فروشگاه</span>
          </Link>
        </div>
        <div className="space-x-2 flex justify-between items-center">
          <ThemeToggle />
          <CartButton />
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
