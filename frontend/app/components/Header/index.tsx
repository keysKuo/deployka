'use client';

import React from 'react'
import { HiOutlineBell } from 'react-icons/hi'
import { signOut } from 'next-auth/react'

export default function Header({ session }: { session: any }) {
    return (
        <div className='w-full fixed top-0'>
            <nav className="w-full h-20 flex justify-between items-center px-4">
                <div></div>
                <div></div>
                {session ? <div className="flex items-center justify-center gap-4">
                    <button>Feedback</button>
                    <button>Changelog</button>
                    <button>Help</button>
                    <button>Docs</button>

                    <div onClick={() => signOut()} className="w-[35px] h-[35px] rounded-full border border-gray-700 flex items-center justify-center"><HiOutlineBell /></div>
                    <div className="w-[40px] h-[40px] rounded-full bg-slate-300"></div>
                </div> : ""}
            </nav>
        </div>
    )
}
