import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import Post from "@/Assets/Arrow_Circle_Up.png";
import Global from "@/Assets/Planet.png";
import AddUser from "@/Assets/Users_Group.png";
import Chat from "@/Assets/Chat_Circle_Dots.png";

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const Avatar = "https://res.cloudinary.com/dwwngau2q/image/upload/v1749269341/csleric1q0raxhkgreyx.png";
    const PhotoProfile = auth.user.photo || Avatar;
    return (
        <div>
            <aside className="fixed h-dvh bg-white w-[10%] sm:w-[5%] flex flex-col gap-y-9 border shadow">
                <div className="w-full h-[30%] gap-y-5 p-2">
                    <div className="flex shrink-0 items-center">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                    </div>
                    <div className="my-[20px] flex items-center text-wrap text-white">
                        <Link
                            href={route("profile.edit")}
                            className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                        >
                            <img
                                src={PhotoProfile}
                                alt=""
                                className="w-12 h-12 rounded-[50%]"
                            />
                        </Link>
                    </div>
                </div>
                <div className="w-full h-[30%] gap-y-9 sm:h-[40%] p-2">
                    <div className="flex items-center w-full h-fit p-2 ">
                        <Link href={route("post.post")}>
                            <img src={Post} className="w-full h-full filter brightness-0" />
                        </Link>
                    </div>
                    <div className="flex items-center w-full h-fit p-2 ">
                        <Link href={route("post.posts")}>
                            <img src={Global} className="w-full h-full filter brightness-0" />
                        </Link>
                    </div>
                    <div className="flex items-center w-full h-fit p-2 ">
                        <Link href={route("friend.index")}>
                            <img src={AddUser} className="w-full h-full filter brightness-0" />
                        </Link>
                    </div>
                </div>
            </aside>
            <main>{children}</main>
        </div>
    );
}
