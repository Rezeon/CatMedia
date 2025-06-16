import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReactModal from "react-modal";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import FriendRequests from "./Partials/FriendRequests";
import AddUser from "@/Assets/User_Add.png";
import Delete from "@/Assets/Trash.png";
import SearchUser from "./Partials/SearchUser";
import User from "@/Assets/User_01.png";
import chat from "@/Assets/Chat_Circle_Dots.png";
import ChatBox from "./ChatBox";

export default function FriendUser() {
    const { friends, requests, auth } = usePage().props;
    const [popUp, setPop] = useState(false);
    const [FriendUp, setFriendUp] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [selectedBioFriend, setSelectedBioFriend] = useState(null);

    return (
        <AuthenticatedLayout>
            <div className="ml-[10%] h-[90%] sm:ml-[6%] mr-2 relative top-3 border p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Friend</h2>
                    <div className="flex flex-row gap-3">
                        <button
                            onClick={() => {
                                setFriendUp(true);
                            }}
                            className="relative bg-blue-500 rounded-md p-2 text-white flex flex-row w-fit justify-between items-center gap-2"
                        >
                            <img
                                src={User}
                                alt="preview"
                                className="w-4 h-4 filter"
                            />{" "}
                            Search Friend
                        </button>
                        <button
                            onClick={() => {
                                setPop(true);
                            }}
                            className="text-gray-500 text-sm relative"
                        >
                            {requests.length >= 1 && (
                                <div className="absolute w-5 h-5  -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10 shadow-md">
                                    {requests.length}
                                </div>
                            )}
                            <img
                                src={AddUser}
                                alt="add"
                                className="w-9 h-9 bg-blue-500 rounded-md p-2"
                            />
                        </button>
                    </div>
                    <ReactModal
                        isOpen={FriendUp}
                        onRequestClose={() => setFriendUp(false)}
                        style={{
                            overlay: {
                                backgroundColor: "transparent",
                                zIndex: 1000,
                            },
                            content: {
                                width: "50%",
                                margin: "auto",
                                backgroundColor: "white",
                            },
                        }}
                    >
                        <SearchUser />
                    </ReactModal>
                </div>
                <ReactModal
                    isOpen={popUp}
                    onRequestClose={() => setPop(false)}
                    style={{
                        overlay: {
                            backgroundColor: "transparent",
                            zIndex: 1000,
                        },
                        content: {
                            width: "40%",
                            left: "55%",
                            backgroundColor: "white",
                        },
                    }}
                >
                    <FriendRequests requests={requests} />
                </ReactModal>
                <hr />
                <div className="flex h-full flex-row justify-between">
                    <ul className="space-y-4 w-[100%]">
                        {friends.map((friend, index) => {
                            const user =
                                friend.sender.id === auth.user.id
                                    ? friend.receiver
                                    : friend.sender;

                            return (
                                <li
                                    key={index}
                                    className="cursor-pointer border p-4 rounded-md w-[90%] mt-2 shadow gap-4 flex flex-col ml-[6%] sm:ml-[0%]"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="text-lg font-semibold flex flex-row gap-2 items-center ">
                                            <img
                                                src={user.photo}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <span className="text-lg font-semibold ">
                                                {user.name}
                                            </span>
                                        </div>
                                        <div className="flex gap-1 sm:gap-3 items-center">
                                            <button
                                                onClick={() =>
                                                    {setSelectedFriend(user);
                                                    setSelectedBioFriend(null);}
                                                }
                                            >
                                                <img
                                                    src={chat}
                                                    alt="preview"
                                                    className="w-6 h-6 filter brightness-0 "
                                                />{" "}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    {setSelectedBioFriend(user);
                                                    setSelectedFriend(null);}
                                                }
                                            >
                                                <img
                                                    src={User}
                                                    alt="preview"
                                                    className="w-6 h-6 filter brightness-0 "
                                                />{" "}
                                            </button>
                                            <Link
                                                href={route(
                                                    "friend.delete",
                                                    friend.id
                                                )}
                                                method="delete"
                                                as="button"
                                                className="flex items-center justify-center"
                                            >
                                                <img
                                                    src={Delete}
                                                    alt="preview"
                                                    className="w-5 h-5  "
                                                />{" "}
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="w-[100%] mt-2 border p-4 rounded bg-white shadow">
                        {selectedBioFriend ? (
                            <>
                                <h3 className="text-xl font-semibold mb-2">
                                    Bio
                                </h3>
                                <img
                                    src={selectedBioFriend.photo}
                                    alt="profile"
                                    className="w-24 h-24 rounded-full mb-4 object-cover"
                                />
                                <p>
                                    <strong>Name:</strong>{" "}
                                    {selectedBioFriend.name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {selectedBioFriend.email}
                                </p>
                                <p>
                                    <strong>Bio:</strong>{" "}
                                    {selectedBioFriend.bio || "Tidak ada bio."}
                                </p>
                            </>
                        ) : selectedFriend ? (
                            <ChatBox receiver={selectedFriend} />
                        ) : (
                            <p className="text-gray-500">
                                Klik teman untuk melihat bio atau chat
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
