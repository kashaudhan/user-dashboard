import React, { useEffect, useState } from "react";
import { UserRow } from "components/user-card";
import API from "../services"
import Pagination from "components/pagination";

const Table: React.FC = () => {

    const [usersData, setUsersData] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    const fetchUsers = async () => {
        try {
            const { data } = await API.GET_MEMBERS(page);

            setUsersData(data.data.members);
            setTotalRows(data.data.row_count);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        API.INIT_API();
        fetchUsers();
    }, []);

    return (
        <section className="flex flex-col bg-white">
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
                        {usersData.map((user) => (
                            <UserRow key={user.id} {...user} />
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="flex justify-between items-center px-6 py-3 border-t border-gray-200 text-sm font-medium text-slate-700">
                <Pagination totalRows={totalRows} rowsPerPage={10} />
            </footer>
        </section>
    );
};

export default Table;