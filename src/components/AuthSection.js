"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";

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

                <ConfirmationModal
                    isOpen={showConfirmation}
                    onClose={() => setShowConfirmation(false)}
                    onConfirm={handleSignOut}
                    title="Sign Out?"
                    message="Are you sure you want to sign out of your account?"
                    confirmText="Sign Out"
                    cancelText="Cancel"
                />
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