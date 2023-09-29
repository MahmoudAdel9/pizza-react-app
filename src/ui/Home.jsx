import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="px-3">
      <h1 className="my-10 px-4 text-center text-2xl font-bold sm:my-16 sm:text-4xl">
        The best pizza.
        <br />
        <span className=" text-orange-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <div className="flex items-center justify-center">
          <Button to="/menu">Go To The Menu section</Button>
        </div>
      )}
    </div>
  );
}

export default Home;
