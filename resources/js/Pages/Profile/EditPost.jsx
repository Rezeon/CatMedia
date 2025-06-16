import React from "react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import UploadImage from "@/Components/UploadImage";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import ErrorMessage from "@/Components/ErrorMessage";
export default function EditPost({post}) {

    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            content: post.content ,
            photo: post.photo || null ,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("post.update", post.id));
    };
    

    return (
        <section>
            <header className=" ml-[10%] sm:ml-[5%] text-large font-medium text-gray-900 p-5">
                Post
            </header>

            <ErrorMessage />
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className=" ml-[10%] sm:ml-[5%] space-y-6 bg-white p-4 shadow sm:rounded-lg sm:p-8"
                enctype="multipart/form-data"
            >
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-md text-gray-600">Posted.</p>
                </Transition>
                <InputLabel value="Photo Post " />

                <UploadImage
                    type="file"
                    name="photo"
                    className="mb-4"
                    classNameImage=" rounded-md border-gray-300 shadow-sm "
                    setData={setData}
                    defaultImage={data.photo}
                />
                
                {errors.photo && (
                    <p className="text-red-500 text-sm">{errors.photo}</p>
                )}

                <InputLabel value="Make Post " />

                <TextInput
                    id="content"
                    className="mt-1 block w-full"
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    required
                    isFocused
                    autoComplete="content"
                />
                <PrimaryButton disabled={processing} >{processing ? 'Post...' : 'Post'}</PrimaryButton>
                
            </form>
        </section>
    );
}
