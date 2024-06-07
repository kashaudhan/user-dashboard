import React from "react";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  teams: string[];
  avatar?: string;
  initials?: string;
}

const UserRow: React.FC<User> = ({ avatar, initials, name, username, status, role, email, teams }) => {
  return (
    <div className="flex gap-3 px-6 py-4 border-b border-gray-200 border-solid max-md:px-5">
      <div className="flex w-1/5 gap-3">
        <div className="shrink-0 my-auto w-5 h-5 bg-white rounded-md border border-gray-300 border-solid" />
        {avatar ? (
          <img loading="lazy" src={avatar} alt={`Avatar of ${name}`} className="rounded-full h-10 w-10 aspect-square" />
        ) : (
          <div className="justify-center items-center px-2 text-base font-medium leading-6 text-center text-violet-500 bg-purple-50 rounded-[200px]">
            {initials}
          </div>
        )}
        <div className="flex flex-col">
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-gray-500">{username}</div>
        </div>

      </div>
      <div className="text-center text-emerald-700 w-[12.5%]">{status}</div>
      <div className="text-sm text-gray-500 w-[15%]">{role}</div>
      <div className="text-sm text-gray-500 w-[15%]">{email}</div>
      <div className="flex gap-2 w-[25%]">
        {teams.map((team, index) => (
          <span key={index} className={`justify-center text-center px-2 py-0.5 rounded-2xl ${team === "+4" ? "bg-gray-100 text-slate-700" : `bg-${team.toLowerCase()}-50 text-${team.toLowerCase()}-700`}`}>
            {team}
          </span>
        ))}
      </div>
      <div className="flex gap-1 w-[0%]">
          <button>X</button>
          <button>Y</button>
      </div>
    </div>
  );
};

const MyComponent: React.FC = () => {
  return (
    <section className="flex flex-col bg-white rounded-lg border border-gray-200 border-solid shadow-md">
      <header className="flex flex-col justify-center items-start px-6 py-7 w-full font-medium bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2 pr-20 max-md:flex-wrap max-md:pr-5">
          <h2 className="text-lg leading-7 text-gray-900">Team members</h2>
          <span className="justify-center px-2 py-0.5 my-auto text-xs leading-5 text-center text-violet-700 bg-purple-50 rounded-2xl">100 users</span>
        </div>
      </header>
      <header className="flex w-full bg-gray-50 max-md:flex-wrap max-md:max-w-full border-b border-gray-200 border-solid max-md:px-5">
        <div className="flex flex-col w-[22.5%]">
          <div className="flex gap-3 px-6 py-3 text-xs font-medium leading-5 text-gray-500 whitespace-nowrap">
            <div className="shrink-0 w-5 h-5 bg-white rounded-md border border-gray-300 border-solid" />
            <span>Name</span>
          </div>
        </div>
        <div className="flex w-[10%] flex-col text-xs font-medium leading-5 text-emerald-700 whitespace-nowrap items-center justify-center align-">
          <div className="flex flex-col justify-center items-center px-6 py-3 w-full text-gray-500">
            <span className="flex gap-1">
              <span>Status</span>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7bb513c4635c91484ea64107c768f81175dea9abf07844c16ae84bbc43d08ab?apiKey=d1982213c0344b17af133010773a2a3d&" alt="" className="shrink-0 self-start w-4 aspect-square" />
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[15%] text-sm leading-5 text-gray-500">
          <div className="flex flex-col justify-center items-start px-6 py-3 w-full text-xs font-medium leading-5 whitespace-nowrap">
            <span className="flex gap-1">
              <span>Role</span>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a8d4f4c07aeba1b880a477e0c9eeaca98f945d5238274337849f53ad040c0a8?apiKey=d1982213c0344b17af133010773a2a3d&" alt="" className="shrink-0 self-start w-4 aspect-square" />
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[15%] text-sm leading-5 text-gray-500">
          <div className="justify-center items-start px-6 py-3 text-xs font-medium leading-5">Email address</div>
        </div>
        <div className="flex flex-col justify-center items-center w-[15%] text-xs font-medium leading-5 whitespace-nowrap">
          <div className="justify-center items-start px-6 py-3 text-gray-500">Teams</div>
        </div>
        <div className="flex flex-col justify-center items-center w-[5%] text-xs font-medium leading-5 whitespace-nowrap">
          <div className="justify-center items-start px-6 py-3 text-gray-500"></div>
        </div>
      </header>
      {users.map((user) => (
        <UserRow key={user.id} {...user} />
      ))}
      <Pagination />
    </section>
  );
};

const Pagination = () => {
  return <footer className="flex gap-5 justify-between items-start px-6 pt-3 pb-3.5 w-full text-sm font-medium leading-5 whitespace-nowrap border-0 border-gray-200 border-solid text-slate-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
  <nav className="flex gap-2 justify-center px-3.5 py-2 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/df2bcf5f72691ee9326be9c547e724c01e89468d8eaa3c94790a8a85b087e9de?apiKey=d1982213c0344b17af133010773a2a3d&" alt="" className="shrink-0 w-5 aspect-square" />
    <span>Previous</span>
  </nav>
  <div className="flex gap-0.5 self-stretch text-gray-500">
    <button className="justify-center items-center px-4 w-10 h-10 text-violet-500 bg-purple-50 rounded-lg">1</button>
    <button className="justify-center items-start px-4 py-2.5 rounded-lg">2</button>
    <button className="justify-center px-4 py-2.5 rounded-lg">3</button>
    <button className="justify-center px-3.5 py-2.5 rounded-lg">...</button>
    <button className="justify-center items-start px-4 py-2.5 rounded-lg">8</button>
    <button className="justify-center items-start px-4 py-2.5 rounded-lg">9</button>
    <button className="justify-center px-3 py-2.5 rounded-lg">10</button>
  </div>
  <nav className="flex gap-2 justify-center px-3.5 py-2 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
    <span>Next</span>
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/88c7d6d7365989a9d25aa36da7b11fd63b16ac73bdba84b851b035d393bb39f4?apiKey=d1982213c0344b17af133010773a2a3d&" alt="" className="shrink-0 w-5 aspect-square" />
  </nav>
</footer>
}

export default MyComponent;

const users: User[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    username: "@olivia",
    email: "olivia@untitledui.com",
    role: "Product Designer",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/e86244f6c2383583656d93479ca11b75ec85a17667c490284493d52e8419636f?apiKey=d1982213c0344b17af133010773a2a3d&",
  },
  {
    id: "2",
    name: "Phoenix Baker",
    username: "@phoenix",
    email: "phoenix@untitledui.com",
    role: "Product Manager",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d885e402ed1e3397bcc6e43482c3d7d3bc44022ad23677366dc8830aa36ca26?apiKey=d1982213c0344b17af133010773a2a3d&",
  },
  {
    id: "3",
    name: "Lana Steiner",
    username: "@lana",
    email: "lana@untitledui.com",
    role: "Frontend Developer",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/56fcd49f4dedb1fc20b6fa549d5032c4bf81c5f31066dbb63d4c9934d9e8d679?apiKey=d1982213c0344b17af133010773a2a3d&",
  },
  {
    id: "4",
    name: "Demi Wilkinson",
    username: "@demi",
    email: "demi@untitledui.com",
    role: "Backend Developer",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c87c6e3a3f25ab94bbd4d1a51b75934d6cb24430df28be35e5b27627aca5d84?apiKey=d1982213c0344b17af133010773a2a3d&",
  },
  {
    id: "5",
    name: "Candice Wu",
    username: "@candice",
    email: "candice@untitledui.com",
    role: "Fullstack Developer",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    initials: "CW"
  },
  {
    id: "6",
    name: "Natali Craig",
    username: "@natali",
    email: "natali@untitledui.com",
    role: "UX Designer",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/9abae13febadd5320cdcefa760cdd3500a5e07ae56fe75e04f1bc8aafc8603c5?apiKey=d1982213c0344b17af133010773a2a3d&",
  },
  {
    id: "7",
    name: "Drew Cano",
    username: "@drew",
    email: "drew@untitledui.com",
    role: "UX Copywriter",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/75fb20867aa8bb5a4eb9789084560ae99af115326ccea90f984b1431f9beebf7?apiKey=d1982213c0344b17af133010773a2a3d&",
  },
  {
    id: "8",
    name: "Orlando Diggs",
    username: "@orlando",
    email: "orlando@untitledui.com",
    role: "UI Designer",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    initials: "OD"
  },
  {
    id: "9",
    name: "Andi Lane",
    username: "@andi",
    email: "andi@untitledui.com",
    role: "Product Manager",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eb0f0fc3c5520bfb44b24f9c9ca5bd50dc2d5e1dd71433a284653bec8687338?apiKey=d1982213c0344b17af133010773a2a3d&",
  },
  {
    id: "10",
    name: "Kate Morrison",
    username: "@kate",
    email: "kate@untitledui.com",
    role: "QA Engineer",
    status: "Active",
    teams: ["Design", "Product", "Marketing", "+4"],
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/085ebda3ccf190eade621f1fbf6dc66aeb3d3cc56003e4d7325ea29a7363abc2?apiKey=d1982213c0344b17af133010773a2a3d&",
  },
];