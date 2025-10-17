"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function AuthSection({ isMobile = false, onMobileClose }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        setShowConfirmation(false);
        toast.success("Signed out successfully");
        if (isMobile && onMobileClose) {
            onMobileClose();
        }
        router.refresh();
    };

    const handleSignInClick = () => {
        if (isMobile && onMobileClose) {
            onMobileClose();
        }
    };

    if (status === "loading") {
        return (
            <div
                className={`bg-gray-200 rounded-full animate-pulse ${
                    isMobile ? "w-32 h-11" : "w-24 h-9"
                }`}
            />
        );
    }

    if (session) {
        return (
            <>
                <button
                    onClick={() => setShowConfirmation(true)}
                    className={`flex items-center gap-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium ${
                        isMobile ? "px-8 py-3 text-base" : "px-4 py-2 text-sm"
                    }`}
                >
                    <LogOut size={isMobile ? 20 : 16} />
                    Sign Out
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
            onClick={handleSignInClick}
            className={`flex items-center gap-2 rounded-full bg-primary text-white hover:bg-secondary transition-colors font-medium ${
                isMobile ? "px-8 py-3 text-base" : "px-4 py-2 text-sm"
            }`}
        >
            <LogIn size={isMobile ? 20 : 16} />
            Sign In
        </a>
    );
}
