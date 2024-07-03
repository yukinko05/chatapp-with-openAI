"use client"

import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../../firebase";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

type Inputs = {
    email: string;
    password: string;
}
const Register = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password).then((userCrendential) => {
            const user = userCrendential.user;
            router.push("/auth/login");
        })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    alert("このメールアドレスはすでに使用されています。");
                } else {
                    alert(error.message);
                }
            });
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="mb-4 text-2xl text-gray-700 font-medium">新規登録</h1>
                <div className="mb-4">
                    <label className="block  text-sm font-medium text-gray-600">Email</label>
                    <input
                        {...register("email", {
                            required: "メールアドレスは必須です。",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                                message: "不適切なメールアドレスです。"
                            }
                        })} type="text"
                        className="mt-1 border-2 rounded-md w-full p-2"
                    />
                    {errors.email && <span className="text-red-700">{errors.email.message}</span>}
                </div>
                <div className="mb-4">
                    <label className="block  text-sm font-medium text-gray-600">Password</label>
                    <input
                        {...register("password", {
                            required: "パスワードは必須です。",
                            minLength: {
                                value: 6,
                                message: "6文字上入力してください。"
                            }
                        })}
                        type="password" className="mt-1 border-2 rounded-md w-full p-2"
                    />
                    {errors.password && <span className="text-red-700">{errors.password.message}</span>}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                        新規登録
                    </button>
                </div>
                <div className="mt-4">
                    <span className="text-gray-600 text-sm">
                        すでにアカウントをお持ちですか？
                    </span>
                    <button className="text-blue-500 text-sm font-bold ml-1 hover:text-blue-700">
                        ログインページへ
                    </button>
                </div>
            </form>
        </div>
    )
};

export default Register;