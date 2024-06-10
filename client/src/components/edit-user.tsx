import { useState } from "react";
import { Popup } from "./popup";
import API from "../services";

type EditUser = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

const roles = [
  "Product Manager",
  "Frontend Developer",
  "Data Scientist",
  "Marketing Manager",
  "UX Researcher",
];

const EditUser = ({ isVisible, setIsVisible, user }: EditUser) => {
  const [newUserDetail, setNewUserDetail] = useState<User>(user);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const handleOnRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUserDetail({ ...newUserDetail, role: event.target.value });
  };

  const handleOnCancel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsVisible(false);
  };

  const handleOnConfirm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await API.UPDATE_MEMBER(newUserDetail);
      setIsUserUpdated(true);
    } catch (error) {}
  };

  const handleOnClose = () => {
    setIsUserUpdated(false);
    setIsVisible(false);
  };
  return (
    <Popup show={isVisible} onClose={handleOnClose}>
      {isUserUpdated ? (
        <UserUpdated />
      ) : (
        <form className="flex flex-col p-6 text-sm font-medium leading-5 bg-white rounded-xl shadow-xl max-w-[482px] max-md:px-5">
          <header className="text-lg leading-7 text-gray-900 max-md:max-w-full">
            Edit User Details
          </header>
          <section className="mt-5">
            <h2 className="text-slate-700 max-md:max-w-full">Name</h2>
            <input
              value={newUserDetail.name}
              onChange={(e) =>
                setNewUserDetail({ ...newUserDetail, name: e.target.value })
              }
              className="justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-black bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full flex w-full"
            />
          </section>

          <section className="mt-5">
            <h2 className="text-slate-700 max-md:max-w-full">User role</h2>
            <div className="relative">
              <select
                value={newUserDetail.role}
                onChange={handleOnRoleChange}
                className="px-3.5 py-2.5 w-full bg-white border border-gray-200 rounded-md"
              >
                {roles.map((role, index) => (
                  <option
                    key={index}
                    value={role}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <section className="mt-5">
            <h2 className="text-slate-700 max-md:max-w-full">Email</h2>
            <input
              value={newUserDetail.email}
              onChange={(e) =>
                setNewUserDetail({ ...newUserDetail, email: e.target.value })
              }
              className="justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-black bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full flex w-full"
            />
          </section>

          <div className="flex gap-3 mt-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <button
              onClick={handleOnCancel}
              type="button"
              className="flex-1 justify-center items-center px-4 py-2.5 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-slate-700 max-md:px-5"
            >
              Cancel
            </button>
            <button
              onClick={handleOnConfirm}
              type="submit"
              className="flex-1 justify-center items-center px-4 py-2.5 text-white bg-violet-500 rounded-lg border border-violet-500 border-solid shadow-sm max-md:px-5"
            >
              Confirm
            </button>
          </div>
        </form>
      )}
    </Popup>
  );
};

export default EditUser;

const UserUpdated = () => (
  <section className="flex flex-col p-6 text-lg font-medium leading-7 text-gray-900 bg-white rounded-xl max-w-[400px]">
    <p className="mt-5">User updated successfully</p>
  </section>
);
