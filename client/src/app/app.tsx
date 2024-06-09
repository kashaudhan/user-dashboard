import React, { useEffect, useState } from "react";
import { UserRow } from "components/user-card";
import { users } from "../constants/data";
import API from "../services"


const Table: React.FC = () => {

    const [usersData, setusersData] = useState([]);

    const fetchUsers = async () => {
        try {
            const { data } = await API.GET_MEMBERS();

            console.log("Data: ", data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        API.INIT_API();
        fetchUsers();
    }, []);

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

export default Table;