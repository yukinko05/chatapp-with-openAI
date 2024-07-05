"use client"

import React, {useEffect, useState} from "react";
import {FaPaperPlane} from "react-icons/fa6";
import {addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, Timestamp} from "@firebase/firestore";
import {db} from "../../../firebase";
import {useAppContext} from "@/context/AppContext";

type Message = {
    text: string;
    sender: string;
    createdAt: Timestamp;
}

const Chat = () => {
    const {selectedRoom} = useAppContext();
    const [inputMessage, setInputMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (selectedRoom) {
            const fetchMessages = async () => {
                const roomDomRef = doc(db, "rooms", selectedRoom);
                const messagesCollectionRaf = collection(roomDomRef, "messages");

                const q = query(messagesCollectionRaf, orderBy("createdAt"));

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const newMessages = snapshot.docs.map((doc) => doc.data() as Message);
                    setMessages(newMessages);
                    console.log(newMessages);
                });

                return () => {
                    unsubscribe();
                };
            };
            fetchMessages();
        }
    }, [selectedRoom]);

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const messageData = {
            text: inputMessage,
            sender: "user",
            createdAd: serverTimestamp(),
        };

        const roomRef = doc(db, "rooms", "OhjTqIauzDGku1MOnrRv");
        const messageCollectionRef = collection(roomRef, "messages");
        await addDoc(messageCollectionRef, messageData);
    }
    return (
        <div className="bg-gray-500 h-full p-4 flex flex-col">
            <h1 className="text-2xl text-white font-semibold mb-4">
                Room1
            </h1>
            <div className="flex-grow overflow-y-auto mb-4">
                {messages.map((message) => (
                    <>
                        <div className="text-right">
                            <div className="bg-blue-500 inline-block rounded px-4 py-2 mb-2">
                                <p className="text-white font-medium">
                                    {message.text}
                                </p>
                            </div>
                        </div>
                        <div className="text-left">
                            <div className="bg-green-500 inline-block rounded px-4 py-2 mb-2">
                                <p className="text-white font-medium">
                                    {message.text}
                                </p>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            <div className="flex-shrink-0 relative">
                <input
                    type="text"
                    placeholder="Send a Message"
                    className="border-2 rounded w-full pr-10 focus:outline-none p-2"
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button
                    className="absolute inset-y-0 right-4 flex items-center"
                    onClick={() => sendMessage()}>
                    <FaPaperPlane/>
                </button>
            </div>
        </div>
    )
};

export default Chat;