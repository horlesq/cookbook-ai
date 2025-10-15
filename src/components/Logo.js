import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 z-10">
            <Image
                src="/assets/logo.png"
                height={60}
                width={60}
                quality={100}
                alt="CoockbookAI Logo"
            />
            <span className="text-2xl font-bold text-gray-900">CoockbookAI</span>
        </Link>
    );
}
