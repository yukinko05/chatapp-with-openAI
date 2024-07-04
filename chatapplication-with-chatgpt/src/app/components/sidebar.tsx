import React from "react";

const Sidebar = () => {
    return (
    <div className="bg-custom-blue h-full overflow-y-auto px-5 flex-col">
        <div className="flex-grow">
            <div className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150">
                <span className="text-white p-4 text-2x1">＋</span>
                <h1 className="text-white texd-xl font-semibold p-4">New Chat</h1>
            </div>

        </div>
        <ul>
            <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150">
                Room 1
            </li>
            <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150">
                Room 2
            </li>
            <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150">
                Room 3
            </li>
        </ul>
    </div>
    );
};

export default Sidebar;