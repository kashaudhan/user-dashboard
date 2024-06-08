import * as React from "react";
import { Button } from "./button";
import { Popup } from "./modal";
import API from "../services"

type DeleteUser = {
  user: User;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteUser = ({ user, isVisible, setIsVisible }: DeleteUser) => {
  
  const deleteUser = async () => {
    await API.DELETE_MEMBER(user.id);
    setIsVisible(false);
  }

  return (
    <Popup show={isVisible} onClose={() => setIsVisible(false)}>
      <section className="flex flex-col p-6 font-medium bg-white rounded-xl shadow-xl max-w-[400px]">
        <h2 className="text-lg leading-7 text-gray-900">
          {user.email}
          <br/>
          Are you sure you want to delete selected users?
        </h2>
        <div className="flex gap-3 mt-8 text-sm leading-5 whitespace-nowrap">
          <Button
            className="flex-1 justify-center px-4 py-2.5 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-slate-700"
            onClick={deleteUser}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 justify-center px-4 py-2.5 text-white bg-violet-500 rounded-lg border border-violet-500 border-solid shadow-sm"
            onClick={() => setIsVisible(false)}
          >
            Confirm
          </Button>
        </div>
      </section>
    </Popup>
  );
};

export default DeleteUser;
