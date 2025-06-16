import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import React from "react";
import UploadImage from "@/Components/UploadImage";

export default function ProfileUser({ auth, profile }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            bio: profile?.bio || "",
            photo: profile?.photo || Avatar,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route("bio.update"));
    };

    return (
        <section>
            <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                <InputLabel value="Profile" />
                

                <UploadImage
                    type="file"
                    name="photo"
                    className="mb-4"
                    classNameImage="h-60 rounded-xl border-gray-300 shadow-sm "
                    setData={setData}
                    defaultImage={data.photo}
                />
                
                <InputLabel value="Bio" />

                <TextInput
                    id="bio"
                    className="mt-1 block w-full"
                    value={data.bio}
                    onChange={(e) => setData("bio", e.target.value)}
                    required
                    isFocused
                    autoComplete="bio"
                />
                {errors.bio && <div style={{ color: "red" }}>{errors.bio}</div>}
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition>
            </form>
        </section>
    );
}
