import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostUser from './Profile/PostUser';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <PostUser />
        </AuthenticatedLayout>
    );
}
