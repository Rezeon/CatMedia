import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import UploadImage from "@/Components/UploadImage";

export default function ChatBox({ receiver }) {
    const [messages, setMessages] = useState([]);
    const [message, setContent] = useState("");
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editingContent, setEditingContent] = useState("");
    const [auth, setAuth] = useState(null);
    const [openPopupId, setOpenPopupId] = useState(null);
    const [imageResetCounter, setImageResetCounter] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);

    const togglePopup = (id) => {
        if (openPopupId === id) {
            setOpenPopupId(null);
        } else {
            setOpenPopupId(id);
        }
    };

    const fetchMessages = async () => {
        if (!receiver?.id) return;
        const response = await axios.get(
            route("message.index", { receiverId: receiver.id })
        );
        setMessages(response.data);
        if (!auth) {
            setAuth(response.data.find((m) => m.is_own)?.auth);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [receiver]);

    const handleSend = async () => {
        const formData = new FormData();

        if (editingMessageId) {
            formData.append("message", editingContent);
            await axios.post(
                route("message.update", editingMessageId),
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setEditingMessageId(null);
            setEditingContent("");
        } else {
            formData.append("receiver_id", receiver.id);
            formData.append("message", message);
            if (imageUrl) formData.append("photo", imageUrl);

            await axios.post(route("message.store"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setContent("");
            setImageUrl(null);
            setImageResetCounter((prev) => prev + 1); 
        }

        fetchMessages();
    };

    const handleEdit = (msg) => {
        setEditingMessageId(msg.id);
        setEditingContent(msg.message);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure to delete this message?")) {
            await axios.delete(route("message.destroy", id));
            fetchMessages();
        }
    };

    return (
        <div className="w-full h-[80vh] flex flex-col">
            <h2 className="font-semibold mb-2">{receiver.name}</h2>
            <div className="flex-1 overflow-y-auto bg-gray-100 p-2 mb-2">
                {messages.map((msg, index) => {
                    const currentDate = dayjs(msg.created_at).format(
                        "YYYY-MM-DD"
                    );
                    const prevDate =
                        index > 0
                            ? dayjs(messages[index - 1].created_at).format(
                                  "YYYY-MM-DD"
                              )
                            : null;
                    const showDateHeader = currentDate !== prevDate;

                    const isOwnMessage =
                        msg.is_own || msg.sender_id !== receiver.id;

                    return (
                        <div key={msg.id}>
                            {showDateHeader && (
                                <div className="text-center text-sm text-gray-500 my-2">
                                    {dayjs(msg.created_at).format(
                                        "D MMMM YYYY"
                                    )}
                                </div>
                            )}
                            <div
                                className={`mb-1 flex ${
                                    isOwnMessage
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div className="max-w-[80%] relative group">
                                    <div className="flex flex-col px-3 py-2 bg-white rounded shadow">
                                        <span className="text-xs text-gray-400">
                                            {isOwnMessage
                                                ? "You"
                                                : receiver.name}
                                        </span>
                                        {msg.photo && (
                                            <img
                                                src={msg.photo}
                                                alt="Attachment"
                                                className="mt-2 max-w-[200px] rounded"
                                            />
                                        )}

                                        <span>
                                            {editingMessageId === msg.id ? (
                                                <input
                                                    value={editingContent}
                                                    onChange={(e) =>
                                                        setEditingContent(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border p-1 rounded w-full"
                                                />
                                            ) : (
                                                msg.message
                                            )}
                                            {isOwnMessage && (
                                                <div className="relative inline-block group gap-1">
                                                    <button
                                                        onClick={() =>
                                                            togglePopup(msg.id)
                                                        }
                                                        className="text-gray-400 px-1 ml-2 rounded-sm"
                                                    >
                                                        :
                                                    </button>

                                                    {openPopupId === msg.id && (
                                                        <div className="absolute right-0 top-6 bg-white border rounded shadow z-10">
                                                            {editingMessageId ===
                                                            msg.id ? (
                                                                <button
                                                                    onClick={
                                                                        handleSend
                                                                    }
                                                                    className="block text-blue-500 text-sm px-3 py-1 hover:bg-gray-100 w-full text-left"
                                                                >
                                                                    Save
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        handleEdit(
                                                                            msg
                                                                        );
                                                                        setOpenPopupId(
                                                                            null
                                                                        );
                                                                    }}
                                                                    className="block text-blue-500 text-sm px-3 py-1 hover:bg-gray-100 w-full text-left"
                                                                >
                                                                    Edit
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    handleDelete(
                                                                        msg.id
                                                                    );
                                                                    setOpenPopupId(
                                                                        null
                                                                    );
                                                                }}
                                                                className="block text-red-500 text-sm px-3 py-1 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </span>
                                        <div className="text-[10px] text-gray-500 mt-1 text-right">
                                            {dayjs(msg.created_at).format(
                                                "HH:mm"
                                            )}
                                            {msg.updated_at !==
                                                msg.created_at && (
                                                <span className="text-red-400 ml-2">
                                                    Edited
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-2 border-t pt-2 mt-2 bg-white p-2">
                <input
                    type="text"
                    value={editingMessageId ? editingContent : message}
                    onChange={(e) =>
                        editingMessageId
                            ? setEditingContent(e.target.value)
                            : setContent(e.target.value)
                    }
                    className="flex-1 border rounded px-2 py-1"
                    placeholder="Type your message"
                />

                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-3 rounded"
                >
                    {editingMessageId ? "Update" : "Send"}
                </button>
            </div>
            <UploadImage
                setData={(key, value) => {
                    if (key === "photo") setImageUrl(value);
                }}
                resetTrigger={imageResetCounter}
                className="mb-4"
                classNameImage="rounded-md border-gray-300 shadow-sm"
            />
        </div>
    );
}
