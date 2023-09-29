import { useState } from "react";
import Button from "../../ui/Button";
import { updateName } from "./userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;

    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <p className="mb-6 text-center text-xl font-semibold sm:text-2xl">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-6  w-80 rounded-full px-4 py-2 text-sm  outline-none ring-opacity-50 transition-all duration-300 focus:ring  focus:ring-orange-200 sm:w-96 sm:text-base"
      />

      {username !== "" && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
