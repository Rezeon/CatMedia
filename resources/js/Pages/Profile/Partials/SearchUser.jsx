import { useState } from "react";
import axios from "axios";
import AddFriends from "@/Components/AddFriends";

export default function SearchUser() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        setQuery(e.target.value);

        if (e.target.value.length > 1) {
            const response = await axios.get(route("users.search"), {
                params: { query: e.target.value },
            });
            setResults(response.data);
        } else {
            setResults([]);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search users by name or email..."
                className="w-full border border-gray-300 rounded px-3 py-2"
            />

            <ul className="mt-3 space-y-2">
                {results.map((user) => (
                    <li
                        key={user.id}
                        className="p-2 border rounded flex justify-between hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <div>
                            {user.friend_status === null && (
                                <AddFriends
                                    postUserId={user.id}
                                    friendStatus={user.friend_status}
                                />
                            )}
                            {user.friend_status === "accepted" && (
                                <span className="text-green-500">Friend</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
