"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <button
            onClick={handleBack}
            className="absolute top-4 left-4 p-2 bg-white rounded-full hover:bg-primary transition-colors shadow-md"
        >
            <ArrowLeft size={20} className="text-gray-700 hover:text-white" />
        </button>
    );
}
