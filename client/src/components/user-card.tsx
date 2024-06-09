import { useState } from "react";
import DeleteUser from "./delete-user";
import EditUser from "./edit-user";

export const UserRow = (user: User) => {

  const [isVisible, setIsVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  return (
    <>
      <EditUser isVisible={isEditFormVisible} setIsVisible={setIsEditFormVisible} user={user} />
      <DeleteUser isVisible={isVisible} setIsVisible={setIsVisible} id={user.id} />
      <tr className="border-b border-gray-200">
          <td className="px-6 py-4 text-left flex flex-row">
              {user.avatar ? (
                  <img loading="lazy" src={user.avatar} alt={`Avatar of ${user.name}`} className="shrink-0 w-10 aspect-square inline-block mr-2" />
              ) : (
                  <div className="inline-block justify-center items-center px-2 text-base font-medium leading-6 text-center text-violet-500 bg-purple-50 rounded-[200px] mr-2">
                      {user.initials}
                  </div>
              )}
              <div className="">
                <span className="font-medium text-gray-900">{user.name}</span>
                <div className="text-gray-500">{user.username}</div>
              </div>
          </td>
          <td className="px-6 py-4">{user.status}</td>
          <td className="px-6 py-4">{user.role}</td>
          <td className="px-6 py-4">{user.email}</td>
          <td className="px-6 py-4">
              <div className="flex gap-1">
                  {user.teams.map((team, index) => (
                      <span
                          key={index}
                          className={`justify-center px-2 py-0.5 rounded-2xl ${team === "+4" ? 
                              "bg-gray-100 text-slate-700" :
                              `bg-${team.toLowerCase()}-50 text-${team.toLowerCase()}-700`}`}
                      >
                          {team}
                      </span>
                  ))}
              </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex gap-1">
              <button className="" onClick={() => setIsVisible(true)}>Del</button>
              <button className="" onClick={() => setIsEditFormVisible(true)}>Edit</button>
            </div>
          </td>
      </tr>
    </>
  );
};
