import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AddUser from "@/Assets/User_Add.png";

export default function AddFriends({ postUserId, friendStatus }) {
    const { auth } = usePage().props;
    const [loading, setLoading] = useState(false);

    const handleAddFriend = () => {
        setLoading(true);

        router.post(
            route("friend.store"),
            { receiver_id: postUserId },
            {
                onSuccess: () => alert("Permintaan pertemanan dikirim!"),
                onError: () => alert("Gagal mengirim permintaan."),
                onFinish: () => setLoading(false),
            }
        );
    };

    if (postUserId === auth.user.id) return null; 

    if (friendStatus === "accepted") {
        return <span className="text-green-600 text-sm">Friends</span>;
    }

    if (friendStatus === "pending") {
        return <span className="text-yellow-500 text-sm">Requested</span>;
    }

    return (
        <button
            onClick={handleAddFriend}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-2 py-1 rounded text-sm flex items-center gap-1"
        >
            {loading ? (
                "Requesting..."
            ) : (
                <>
                    <img src={AddUser} alt="add" className="w-4 h-4" />
                    Add Friend
                </>
            )}
        </button>
    );
}
