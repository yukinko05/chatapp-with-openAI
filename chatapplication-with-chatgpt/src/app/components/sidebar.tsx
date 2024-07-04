"use client"

import React, {useEffect} from "react";
import {RiLogoutBoxLine} from "react-icons/ri";
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "../../../firebase";

const Sidebar = () => {

    useEffect(() => {

        const fetchRooms = async () => {
            const roomCollectionRef = collection(db, "rooms");
            const q = query(roomCollectionRef, orderBy("createdAt"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const rewRooms = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                console.log(rewRooms);
            });
        };
        fetchRooms();

    }, []);

    return (
        <div className="bg-custom-blue h-full overflow-y-auto px-5 flex flex-col">
            <div className="flex-grow">
                <div
                    className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150">
                    <span className="text-white p-4 text-2x1">＋</span>
                    <h1 className="text-white texd-xl font-semibold p-4">New Chat</h1>
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

            <div
                className=" flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:bg-slate-700">
                <RiLogoutBoxLine/>
                <span>ログアウト</span>
            </div>
        </div>
    );
};

export default Sidebar;