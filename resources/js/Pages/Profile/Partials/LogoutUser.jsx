import { router } from '@inertiajs/react';

export default function LogoutButton() {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 px-4 py-2 rounded"
        >
            Logout
        </button>
    );
}
