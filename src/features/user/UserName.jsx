import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((store) => store.user.username);
  return (
    <>
      {username ? (
        <p className="hidden text-xl font-semibold capitalize sm:block">
          Hi, {username}
        </p>
      ) : null}
    </>
  );
}

export default UserName;
