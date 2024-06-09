import * as React from "react";
import { Button } from "./button";
import { Popup } from "./popup";
import API from "../services";

type DeleteUser = {
  id: number;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteUser = ({ id, isVisible, setIsVisible }: DeleteUser) => {
  const [isDeleted, setIsDeleted] = React.useState(false);

  const deleteUser = async () => {
    try {
      await API.DELETE_MEMBER(id);
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    setIsDeleted(false);
    setIsVisible(false);
  };

  return (
    <Popup show={isVisible} onClose={onClose}>
      {isDeleted ? (
        <UserDeleted />
      ) : (
        <section className="flex flex-col p-6 font-medium bg-white rounded-xl shadow-xl max-w-[400px]">
          <h2 className="text-lg leading-7 text-gray-900">
            Are you sure you want to delete selected users?
          </h2>
          <div className="flex gap-3 mt-8 text-sm leading-5 whitespace-nowrap">
            <Button
              className="flex-1 justify-center px-4 py-2.5 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-slate-700"
              onClick={() => setIsVisible(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 justify-center px-4 py-2.5 text-white bg-violet-500 rounded-lg border border-violet-500 border-solid shadow-sm"
              onClick={deleteUser}
            >
              Confirm
            </Button>
          </div>
        </section>
      )}
    </Popup>
  );
};

export default DeleteUser;

const UserDeleted = () => (
  <section className="flex flex-col p-6 text-lg font-medium leading-7 text-gray-900 bg-white rounded-xl max-w-[400px]">
    <p className="mt-5">User deleted successfully</p>
  </section>
);
