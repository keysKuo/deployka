'use client';

import React from 'react'
import GitHubIcon from '../Icons/github.icon'
import GitLabIcon from '../Icons/gitlab.icon'
import BitBucketIcon from '../Icons/bitbucket.icon'
import { signIn } from "next-auth/react";

export default function LoginForm() {
    return (
        <div className="w-[350px] flex flex-col items-center justify-center min-h-screen text-white gap-2">
            <h1 className="text-3xl font-bold mb-8">Log in to Deployka</h1>

            {/* Login Github Button */}
            <button onClick={() => signIn("github")} className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md mb-4">
                <GitHubIcon /> Continue with GitHub
            </button>

            {/* Login GitLab Button */}
            <button className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-md mb-4">
                <GitLabIcon /> Continue with GitLab
            </button>

            {/* Login BitBucket Button */}
            <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md mb-4">
                <BitBucketIcon /> Continue with Bitbucket
            </button>

            <div className="mt-8 text-sm flex items-center gap-3">
                <a href="#" className="hover:underline">
                    Contact
                </a>{' '}
                <a href="#" className="hover:underline">
                    Sign Up
                </a>
            </div>
        </div>
    )
}
