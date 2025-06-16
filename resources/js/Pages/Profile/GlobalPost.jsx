import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import dayjs from "dayjs";
import Like from "@/Assets/like.png";
import UnLike from "@/Assets/unlike.png";
import Delete from "@/Assets/Trash.png";
import DropDown from "@/Assets/Hamburger.png";
import Plabet from "@/Assets/Planet.png";
import ReactModal from "react-modal";
import NullPhoto from "@/Assets/404.jpeg";
import AddFriends from "@/Components/AddFriends";

export default function GlobalPost() {
    const { data, setData, post, processing, reset } = useForm({
        post_id: "",
        comment: "",
    });

    const { posts, auth } = usePage().props;

    const [popUp, setPop] = useState(false);

    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [selectedPostForComment, setSelectedPostForComment] = useState(null);
    const [loadingIds, setLoadingIds] = useState([]);

    const user = auth.user;

    const handleAddFriend = (receiverId) => {
        setLoadingIds((prev) => [...prev, receiverId]);

        router.post(
            route("friend.store"),
            {
                receiver_id: receiverId,
            },
            {
                onSuccess: () => alert("Permintaan pertemanan dikirim!"),
                onError: () => alert("Gagal mengirim permintaan."),
                onFinish: () =>
                    setLoadingIds((prev) =>
                        prev.filter((id) => id !== receiverId)
                    ),
            }
        );
    };

    const submitComment = (e) => {
        e.preventDefault();
        if (!selectedPostForComment) return;

        post(route("comments.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setCommentModalOpen(false);
            },
        });
    };
    const handleLike = (postId) => {
        router.post(
            "/likes/give",
            {
                post_id: postId,
            },
            { preserveScroll: true }
        );
    };

    const handleUnlike = (likeId) => {
        router.delete(`/likes/${likeId}`, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className=" ml-[5%] p-4">
                <ul className="space-y-4">
                    {posts.map((post) => {
                        const userLike = post.likes.find(
                            (like) => like.user_id === user.id
                        );

                        return (
                            <li
                                key={post.id}
                                className="border p-4 rounded shadow gap-4 flex flex-col ml-[6%] sm:ml-[0%]"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-lg font-semibold">
                                        {post.user.name}
                                    </h2>
                                    <div>
                                        {user.id === post.user_id ? (
                                            <div
                                                className=" flex items-center justify-center w-5 h-5 cursor-pointer "
                                                onClick={() =>
                                                    setOpenDropdownId(
                                                        openDropdownId ===
                                                            post.id
                                                            ? null
                                                            : post.id
                                                    )
                                                }
                                            >
                                                <img
                                                    src={DropDown}
                                                    alt="preview"
                                                    className="w-fit "
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <AddFriends
                                                    postUserId={post.user.id}
                                                    friendStatus={
                                                        post.friend_status
                                                    }
                                                />
                                            </>
                                        )}
                                        {openDropdownId === post.id && (
                                            <ul className="absolute flex flex-col shadow border p-2 gap-1 bg-white rounded-sm z-40 mt-1 w-32 h-50 right-5">
                                                <li
                                                    onClick={() =>
                                                        setOpenDropdownId(null)
                                                    }
                                                >
                                                    <Link
                                                        href={route(
                                                            "post.edit",
                                                            post.id
                                                        )}
                                                        method="get"
                                                        as="button"
                                                        className="flex items-center justify-center"
                                                        onClick={() =>
                                                            setOpenDropdownId(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={Plabet}
                                                            alt="preview"
                                                            className="w-5 h-5 filter brightness-0 "
                                                        />{" "}
                                                        Update Post
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link
                                                        href={route(
                                                            "post.delete",
                                                            post.id
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="flex items-center justify-center"
                                                        onClick={() =>
                                                            setOpenDropdownId(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={Delete}
                                                            alt="preview"
                                                            className="w-5 h-5  "
                                                        />{" "}
                                                        Delete
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <hr />

                                {post.photo && (
                                    <div className="flex justify-center items-start mb-3">
                                        <img
                                            src={post.photo}
                                            alt="preview"
                                            className="w-fit max-w-96 mt-2 rounded-md"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = NullPhoto;
                                            }}
                                        />
                                    </div>
                                )}

                                <hr />
                                <p className="mt-1">{post.content}</p>
                                <hr />
                                <p className="text-sm text-gray-500 flex items-center justify-start gap-2">
                                    <button
                                        onClick={() =>
                                            userLike
                                                ? handleUnlike(userLike.id)
                                                : handleLike(post.id)
                                        }
                                        className="mr-2"
                                    >
                                        {userLike ? (
                                            <img
                                                src={Like}
                                                className="w-5 h-5 "
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                src={UnLike}
                                                className="w-5 h-5 "
                                                alt=""
                                            />
                                        )}
                                    </button>
                                    <span>{post.likes.length}</span>
                                    <button
                                        onClick={() => {
                                            setSelectedPost(post);
                                            setPop(true);
                                        }}
                                        className="text-gray-500 text-sm"
                                    >
                                        Likes
                                    </button>
                                    <ReactModal
                                        isOpen={popUp}
                                        onRequestClose={() => setPop(false)}
                                        style={{
                                            overlay: {
                                                backgroundColor: "transparent",
                                                zIndex: 1000,
                                            },
                                            content: {
                                                width: "20%",
                                                marginLeft: "5%",
                                                backgroundColor: "white",
                                            },
                                        }}
                                    >
                                        <button
                                            onClick={() => setPop(false)}
                                            className="text-red-500 mb-2"
                                        >
                                            Tutup
                                        </button>
                                        {selectedPost && (
                                            <div className="w-[40%] h-[80%] ">
                                                <p className="font-semibold">
                                                    <img
                                                        src={Like}
                                                        alt=""
                                                        className=" w-4 h-4"
                                                    />
                                                </p>
                                                <ul className="list-disc ml-5">
                                                    {selectedPost.likes.map(
                                                        (like) => (
                                                            <div key={like.id}>
                                                                <img
                                                                    src={
                                                                        like
                                                                            .user
                                                                            .photo
                                                                    }
                                                                    alt=""
                                                                    className="w-12 h-12 rounded-[50%]"
                                                                />
                                                                {like.user.name}
                                                            </div>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </ReactModal>
                                    |{" "}
                                    <button
                                        onClick={() => {
                                            setSelectedPostForComment(post);
                                            setData("post_id", post.id);
                                            setCommentModalOpen(true);
                                        }}
                                        className="text-gray-500 text-sm"
                                    >
                                        {post.comments.length} Komentar
                                    </button>
                                    <ReactModal
                                        isOpen={commentModalOpen}
                                        onRequestClose={() =>
                                            setCommentModalOpen(false)
                                        }
                                        style={{
                                            overlay: {
                                                backgroundColor: "transparent",
                                                zIndex: 1000,
                                            },
                                            content: {
                                                width: "50%",
                                                height: "60%",
                                                margin: "auto",
                                                padding: "20px",
                                                borderRadius: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                            },
                                        }}
                                    >
                                        {selectedPostForComment && (
                                            <div>
                                                <h2 className="font-bold mb-2 text-lg fixed w-full bg-white">
                                                    Comment
                                                </h2>
                                                <div className="flex-1 overflow-y-auto space-y-2 pr-2 pb-20 pt-16">
                                                    <ul>
                                                        {selectedPostForComment.comments.map(
                                                            (comment) => (
                                                                <li
                                                                    key={
                                                                        comment.id
                                                                    }
                                                                    className="border-b pb-2 flex flex-row gap-4 item-center mt-2"
                                                                >
                                                                    <hr />
                                                                    <img
                                                                        src={
                                                                            comment
                                                                                .user
                                                                                .photo
                                                                        }
                                                                        alt=""
                                                                        className="w-12 h-12 rounded-[50%]"
                                                                    />
                                                                    <div>
                                                                        <div className="font-semibold flex item-center justify-center gap-2">
                                                                            <div>
                                                                                {
                                                                                    comment
                                                                                        .user
                                                                                        .name
                                                                                }
                                                                            </div>
                                                                            <div className="text-gray-500 text-[11px]">
                                                                                {" "}
                                                                                {dayjs(
                                                                                    comment.created_at
                                                                                ).format(
                                                                                    "D MMMM YYYY, HH:mm"
                                                                                )}{" "}
                                                                            </div>
                                                                            <div>
                                                                                {user.id ===
                                                                                comment.user_id ? (
                                                                                    <Link
                                                                                        href={route(
                                                                                            "comments.delete",
                                                                                            comment.id
                                                                                        )}
                                                                                        onClick={() =>
                                                                                            setCommentModalOpen(
                                                                                                false
                                                                                            )
                                                                                        }
                                                                                        method="delete"
                                                                                        as="button"
                                                                                        className="flex items-center justify-center"
                                                                                    >
                                                                                        <img
                                                                                            src={
                                                                                                Delete
                                                                                            }
                                                                                            alt="preview"
                                                                                            className="w-4 h-4 right-5 mt-4 absolute "
                                                                                        />{" "}
                                                                                    </Link>
                                                                                ) : (
                                                                                    <div></div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="text-sm">
                                                                            {
                                                                                comment.comment
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                                <div className="relative">
                                                    <form
                                                        onSubmit={submitComment}
                                                        className="mt-4 space-y-2 fixed  bottom-36 w-[45%]"
                                                    >
                                                        <TextInput
                                                            className="w-full border rounded p-2"
                                                            placeholder="Tulis komentar..."
                                                            value={data.comment}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "comment",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                        <PrimaryButton
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            {processing
                                                                ? "Posting..."
                                                                : "Post Komentar"}
                                                        </PrimaryButton>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </ReactModal>
                                    <span>
                                        Posted:{" "}
                                        {dayjs(post.created_at).format(
                                            "D MMMM YYYY, HH:mm"
                                        )}
                                    </span>
                                    <span>
                                        {post.updated_at === post.created_at ? (
                                            <></>
                                        ) : (
                                            <div className="text-red-300">
                                                Edited{" "}
                                            </div>
                                        )}
                                    </span>
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
