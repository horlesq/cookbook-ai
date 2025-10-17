"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthSection() {
    const { data: session } = useSession();
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        setShowConfirmation(false);
        toast.success("Signed out successfully");
        router.refresh();
    };

    if (session) {
        return (
            <>
                <button
                    onClick={() => setShowConfirmation(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                    <span className="hidden sm:inline">Sign Out</span>
                </button>

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowConfirmation(false)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-gray-900">
                                Sign Out?
                            </h3>
                            <p className="text-gray-600">
                                Are you sure you want to sign out of your
                                account?
                            </p>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="flex-1 px-4 py-2 rounded-full bg-primary text-white hover:bg-secondary transition-colors font-medium"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <a
            href="/auth/signin"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-secondary transition-colors text-sm font-medium"
        >
            <span className="hidden sm:inline">Sign In</span>
        </a>
    );
}
