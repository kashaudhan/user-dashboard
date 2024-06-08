

export const UserRow: React.FC<User> = ({ avatar, initials, name, username, status, role, email, teams }) => {
  return (
      <tr className="border-b border-gray-200">
          <td className="px-6 py-4 text-left flex flex-row">
              {avatar ? (
                  <img loading="lazy" src={avatar} alt={`Avatar of ${name}`} className="shrink-0 w-10 aspect-square inline-block mr-2" />
              ) : (
                  <div className="inline-block justify-center items-center px-2 text-base font-medium leading-6 text-center text-violet-500 bg-purple-50 rounded-[200px] mr-2">
                      {initials}
                  </div>
              )}
              <div className="">
                <span className="font-medium text-gray-900">{name}</span>
                <div className="text-gray-500">{username}</div>
              </div>
          </td>
          <td className="px-6 py-4">{status}</td>
          <td className="px-6 py-4">{role}</td>
          <td className="px-6 py-4">{email}</td>
          <td className="px-6 py-4">
              <div className="flex gap-1">
                  {teams.map((team, index) => (
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
              <div className="">X</div>
              <div className="">X</div>
            </div>
          </td>
      </tr>
  );
};
