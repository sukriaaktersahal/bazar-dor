// footer for all page

export default function Footer(){
    return(
        <footer className = "bg-white border-t border-gray-200 mt-auto py-6">
            <div className = "max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm text-gray-600">
                <div><strong className = "text-gray-800">বাজার দর</strong> — প্রয়োজনীয় পণ্যের দাম এক নজরে।</div>
                <div className = "text-gray-500">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</div>
            </div> 
        </footer>
    );
}

