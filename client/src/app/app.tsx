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

const users: User[] = [
    { id: "1", name: "Olivia Rhye", username: "@olivia", email: "olivia@untitledui.com", role: "Product Designer", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/e86244f6c2383583656d93479ca11b75ec85a17667c490284493d52e8419636f?apiKey=d1982213c0344b17af133010773a2a3d&" },
    { id: "2", name: "Phoenix Baker", username: "@phoenix", email: "phoenix@untitledui.com", role: "Product Manager", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d885e402ed1e3397bcc6e43482c3d7d3bc44022ad23677366dc8830aa36ca26?apiKey=d1982213c0344b17af133010773a2a3d&" },
    { id: "3", name: "Lana Steiner", username: "@lana", email: "lana@untitledui.com", role: "Frontend Developer", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/56fcd49f4dedb1fc20b6fa549d5032c4bf81c5f31066dbb63d4c9934d9e8d679?apiKey=d1982213c0344b17af133010773a2a3d&" },
    { id: "4", name: "Demi Wilkinson", username: "@demi", email: "demi@untitledui.com", role: "Backend Developer", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c87c6e3a3f25ab94bbd4d1a51b75934d6cb24430df28be35e5b27627aca5d84?apiKey=d1982213c0344b17af133010773a2a3d&" },
    { id: "5", name: "Candice Wu", username: "@candice", email: "candice@untitledui.com", role: "Fullstack Developer", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], initials: "CW" },
    { id: "6", name: "Natali Craig", username: "@natali", email: "natali@untitledui.com", role: "UX Designer", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/9abae13febadd5320cdcefa760cdd3500a5e07ae56fe75e04f1bc8aafc8603c5?apiKey=d1982213c0344b17af133010773a2a3d&" },
    { id: "7", name: "Drew Cano", username: "@drew", email: "drew@untitledui.com", role: "UX Copywriter", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/75fb20867aa8bb5a4eb9789084560ae99af115326ccea90f984b1431f9beebf7?apiKey=d1982213c0344b17af133010773a2a3d&" },
    { id: "8", name: "Orlando Diggs", username: "@orlando", email: "orlando@untitledui.com", role: "UI Designer", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], initials: "OD" },
    { id: "9", name: "Andi Lane", username: "@andi", email: "andi@untitledui.com", role: "Product Manager", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eb0f0fc3c5520bfb44b24f9c9ca5bd50dc2d5e1dd71433a284653bec8687338?apiKey=d1982213c0344b17af133010773a2a3d&" },
    { id: "10", name: "Kate Morrison", username: "@kate", email: "kate@untitledui.com", role: "QA Engineer", status: "Active", teams: ["Design", "Product", "Marketing", "+4"], avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/085ebda3ccf190eade621f1fbf6dc66aeb3d3cc56003e4d7325ea29a7363abc2?apiKey=d1982213c0344b17af133010773a2a3d&" },
];

const UserRow: React.FC<User> = ({ avatar, initials, name, username, status, role, email, teams }) => {
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

const MyComponent: React.FC = () => {
    return (
        <section className="flex flex-col bg-white rounded-lg border border-gray-200">
            <header className="flex items-center px-6 py-7 bg-white text-lg font-medium">
                <h2 className="text-gray-900 mr-5">Team members</h2>
                <span className="px-2 py-0.5 text-xs text-violet-700 bg-purple-50 rounded-2xl">100 users</span>
            </header>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50 text-xs font-medium text-gray-500 text-left">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Email address</th>
                            <th className="px-6 py-3">Teams</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-500">
                        {users.map((user) => (
                            <UserRow key={user.id} {...user} />
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="flex justify-between items-center px-6 py-3 border-t border-gray-200 text-sm font-medium text-slate-700">
                <button className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-lg border border-gray-300 shadow-sm">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/df2bcf5f72691ee9326be9c547e724c01e89468d8eaa3c94790a8a85b087e9de?apiKey=d1982213c0344b17af133010773a2a3d&" alt="" className="w-5" />
                    Previous
                </button>
                <div className="flex gap-0.5">
                    <button className="px-4 py-2.5 bg-purple-50 text-violet-500 rounded-lg">1</button>
                    <button className="px-4 py-2.5 rounded-lg">2</button>
                    <button className="px-4 py-2.5 rounded-lg">3</button>
                    <button className="px-3.5 py-2.5 rounded-lg">...</button>
                    <button className="px-4 py-2.5 rounded-lg">8</button>
                    <button className="px-4 py-2.5 rounded-lg">9</button>
                    <button className="px-3 py-2.5 rounded-lg">10</button>
                </div>
                <button className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-lg border border-gray-300 shadow-sm">
                    Next
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/88c7d6d7365989a9d25aa36da7b11fd63b16ac73bdba84b851b035d393bb39f4?apiKey=d1982213c0344b17af133010773a2a3d&" alt="" className="w-5" />
                </button>
            </footer>
        </section>
    );
};

export default MyComponent;