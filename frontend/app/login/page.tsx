import React from 'react'
import LoginForm from '../components/Forms/login.form'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/dashboard');
    }

    return (
        <div className='w-full min-h-[100svh] flex flex-col items-center justify-center gap-4'>
            <LoginForm />
        </div>
    )
}
