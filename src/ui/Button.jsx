import { Link } from "react-router-dom";

function Button({ children, disabled, to, type = "primary", color, onClick }) {
  let base =
    "text-base inline-block rounded border-b-4 border-amber-500 bg-amber-400 font-bold uppercase  hover:border-amber-400 hover:bg-amber-300 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-offset-2 disabled:cursor-not-allowed";
  if (color)
    base =
      "text-base inline-block rounded border-b-4 border-red-500 bg-red-400 font-bold uppercase  hover:border-red-400 hover:bg-red-300 focus:outline-none focus:ring focus:ring-red-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const style = {
    primary: base + " px-4 py-2 ",
    small: base + " px-3 py-2 text-xs",
    position:
      " inline-block h-[90%] rounded border-b-4 border-amber-500 bg-amber-400 px-2 py-0.5 text-xs font-semibold uppercase hover:border-amber-400 hover:bg-amber-300 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:py-1 ",
    round:
      "text-base sm:text-xl font-bold inline-block rounded-full w-10 h-10 border-b-4 border-amber-500 bg-amber-400 font-bold uppercase  hover:border-amber-400 hover:bg-amber-300 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-offset-1 disabled:cursor-not-allowed",
  };
  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button className={style[type]} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );

  return <button className={style[type]}>{children}</button>;
}

export default Button;
