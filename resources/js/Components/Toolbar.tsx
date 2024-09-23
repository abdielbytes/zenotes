import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Toolbar({ title, setTitle }) {
    const user = usePage().props.auth.user;

    return (
        <div className="bg-white w-full max-w-7xl flex justify-between items-center p-4 border-b border-gray-200 shadow-md mb-6">
            {/* Left side: Title Input */}
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-xl font-semibold bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Untitled Document"
                />
            </div>

            {/* Center: Toolbar */}
            {/*<div className="flex space-x-4">*/}
            {/*    <button className="text-gray-600 hover:text-gray-900"><strong>B</strong></button>*/}
            {/*    <button className="text-gray-600 hover:text-gray-900 italic">I</button>*/}
            {/*    <button className="text-gray-600 hover:text-gray-900 underline">U</button>*/}
            {/*    <button className="text-gray-600 hover:text-gray-900 line-through">S</button>*/}
            {/*    <button className="text-gray-600 hover:text-gray-900">🔗</button>*/}
            {/*    <button className="text-gray-600 hover:text-gray-900">🖼️</button>*/}
            {/*</div>*/}

            {/* Right side: User Profile and Logout */}
            <div className="flex items-center space-x-4">

                <Dropdown>
                    <Dropdown.Trigger>
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none"
                        >
                            <span>{user.name}</span>
                            <svg
                                className="ml-2 -mr-0.5 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}
