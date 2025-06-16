import PostedUser from "./Partials/PostedUser";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function PostUser() {

    return (
        <AuthenticatedLayout>
          <div className=" p-4">
            <PostedUser />
          </div>
        </AuthenticatedLayout>
    );
}
