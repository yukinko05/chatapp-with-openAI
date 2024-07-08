"use client"

import React, {useEffect, useState} from "react";
import {RiLogoutBoxLine} from "react-icons/ri";
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, Timestamp, where} from "@firebase/firestore";
import {auth, db} from "../../../firebase";
import {useAppContext} from "@/context/AppContext";

type Room = {
    id: string;
    name: string;
    createdAt: Timestamp;
}

const Sidebar = () => {
    const {user, userId, setSelectedRoom, setSelectedRoomName} = useAppContext();

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        if (user) {
            const fetchRooms = async () => {
                const roomCollectionRef = collection(db, "rooms");
                const q = query(roomCollectionRef, where("userId", "==", userId), orderBy("createdAt"));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const newRooms: Room[] = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name,
                        createdAt: doc.data().createdAt,
                    }));
                    setRooms(newRooms);
                });
                return () => {
                    unsubscribe();
                };
            };
            fetchRooms();
        }
    }, [userId]);

    const selectRoom = (roomId: string, roomName: string) => {
        setSelectedRoom(roomId);
        setSelectedRoomName(roomName);
    };

    const addNewRoom = async () => {
        const roomName = prompt("ルーム名を入力してください。");
        if (roomName) {
            const newRoomRef = collection(db, "rooms");
            await addDoc(newRoomRef, {
                name: roomName,
                userId: userId,
                createdAt: serverTimestamp(),
            });
        }
    };

    const handleLogout = () => {
        auth.signOut()
    };

    return (
        <div className="bg-custom-blue h-full overflow-y-auto px-5 flex flex-col">
            <div className="flex-grow">
                <div
                    onClick={addNewRoom}
                    className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150">
                    <span className="text-white p-4 text-2x1">＋</span>
                    <h1 className="text-white texd-xl font-semibold p-4">New Chat</h1>
                </div>
                <ul>
                    {rooms.map((room) => (
                        <li key={room.id}
                            className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150"
                            onClick={() => selectRoom(room.id, room.name)}
                        >
                            {room.name}
                        </li>
                    ))}
                </ul>
            </div>

            {user && (
                <div className="mb-2 p-4 text-slate-100 text-lg font-medium">
                    {user.email}
                </div>
            )}
            <div
                onClick={() => handleLogout()}
                className=" flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:bg-slate-700">
                <RiLogoutBoxLine/>
                <span>ログアウト</span>
            </div>
        </div>
    );
};

export default Sidebar;