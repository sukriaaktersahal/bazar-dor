// not found - 404 page
import Link from "next/link";

// notFound function
export default function NotFound(){
    return(
        <main className = "min-h-[70vh] flex items-center justify-center px-4">
            <div className = "text-center max-w-md">
                <p className = "text-7xl mb-4"> 🛒 </p>
                <h1 className = "text-4xl font-bold text-gray-900 mb-2"> 404 </h1>
                <h2 className = "text-xl font-semibold text-gray-700 mb-3">পেজটি খুঁজে পাওয়া যায়নি</h2>
                <p className = "text-gray-500 mb-6">আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।</p>
                <Link href = "/" className = "inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-md transition-colors">
                হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}

