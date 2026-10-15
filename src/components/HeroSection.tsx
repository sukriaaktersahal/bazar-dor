// hero/ banner section
export default function HeroSection(){
    return(
        <section className = "bg-gradient-to-br from-green-50 via-white to-white border-b border-gray-100">
            <div className = "max-w-6xl mx-auto px-4 py-8 md:py-12">
                <div className = "grid md:grid-cols-2 gap-8 items-center">

                    {/* left side */}
                    <div>
                        <p className = "text-xs md:text-sm font-medium text-green-700 mb-2">প্রতিদিন আপডেট • নির্ভরযোগ্য দাম</p>
                        <h1 className = "text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">আজকের বাজারের দাম 
                            <br />
                            <span className = "text-green-700">এক নজরে</span>
                        </h1>
                        <p className = "text-sm md:text-base text-gray-600 mb-5 leading-relaxed">চাল, ডাল, তেল, সবজি, মাছ, মাংস — বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম জেনে নিন সবচেয়ে সহজে।</p>
                        <a href = "#সব-পণ্য" className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm md:text-base font-medium px-5 py-2.5 rounded-md transition-colors" >সব পণ্য দেখুন ↓</a>
                    </div>

                    {/* right side */}
                    <div className = "flex justify-center md:justify-end">
                        <div className = "w-48 h-48 md:w-64 md:h-64 bg-green-100 rounded-full flex items-center justify-center relative">
                            <div className = "text-7xl md:text-9xl">🛒</div>
                            <div className = "absolute -top-2 -right-2 text-4xl md:text-5xl">🍎</div>
                            <div className = "absolute -bottom-2 -left-2 text-4xl md:text-5xl">🍚</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
