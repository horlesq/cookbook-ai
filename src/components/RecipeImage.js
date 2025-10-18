"use client";

import { ArrowLeft, Image as DefaultImage } from "lucide-react";
import Image from "next/image";

export default function RecipeImage({ image, name, onBack }) {
    return (
        <div className="relative rounded-xl overflow-hidden mb-6 h-80 bg-gray-100 group flex-shrink-0 flex items-center justify-center">
            {image ? (
                <Image
                    src={image}
                    alt={name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-300">
                    <DefaultImage size={64} />
                    <span className="text-sm mt-2 text-gray-400">
                        No image available
                    </span>
                </div>
            )}
            <button
                onClick={onBack}
                className="absolute top-4 left-4 p-2 bg-white rounded-full hover:bg-primary transition-colors shadow-md"
            >
                <ArrowLeft
                    size={20}
                    className="text-gray-700 hover:text-white"
                />
            </button>
        </div>
    );
}
