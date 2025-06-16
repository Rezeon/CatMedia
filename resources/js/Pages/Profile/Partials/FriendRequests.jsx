import { router } from "@inertiajs/react";

export default function FriendRequests({ requests }) {
    const handleResponse = (id, status) => {
        router.put(
            route("friend.update", id),
            { status },
            {
                onSuccess: () => alert(`Permintaan ${status}`),
                onError: () => alert("Gagal merespons permintaan"),
            }
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Permintaan Pertemanan</h1>

            {requests.length === 0 && <p>Tidak ada permintaan.</p>}

            <ul className="space-y-3">
                {requests.map((req) => (
                    <li
                        key={req.id}
                        className="border p-3 rounded flex justify-between items-center w-[100%]"
                    >
                        <div className="text-lg font-semibold flex flex-row gap-2 items-center ">
                            <img
                                src={req.sender.photo}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span>{req.sender.name}</span>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() =>
                                    handleResponse(req.id, "accepted")
                                }
                                className="bg-green-500 text-white px-2 py-1 rounded"
                            >
                                V
                            </button>
                            <button
                                onClick={() =>
                                    handleResponse(req.id, "declined")
                                }
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                X
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
