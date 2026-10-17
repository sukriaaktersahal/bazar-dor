// hero/ banner section
import Image from "next/image";

export default function HeroSection(){

    // for today date on bangla
    const today = new Date();
    const banglaDate = today.toLocaleDateString("bn-BD",{
        timeZone : "Asia/Dhaka",
        weekday : "long",
        year : "numeric",
        month : "long",
        day : "numeric",
    });
    return(
        <section className = "bg-gradient-to-br from-green-50 via-white to-white border-b border-gray-100">
            <div className = "max-w-6xl mx-auto px-4 py-8 md:py-12">
                <div className = "grid md:grid-cols-2 gap-8 items-center">

                    {/* left side */}
                    <div>
                        <div className = "inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-3">{banglaDate}</div>
                        <p className = "text-xs md:text-sm font-medium text-green-700 mb-2">প্রতিদিন আপডেট • নির্ভরযোগ্য দাম</p>
                        <h1 className = "text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">আজকের বাজারের দাম 
                            <br />
                            <span className = "text-green-700">এক নজরে</span>
                        </h1>
                        <p className = "text-sm md:text-base text-gray-600 mb-5 leading-relaxed">চাল, ডাল, তেল, সবজি, মাছ, মাংস — বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম জেনে নিন সবচেয়ে সহজে।</p>
                        <a href = "#সব-পণ্য" className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm md:text-base font-medium px-5 py-2.5 rounded-md transition-colors" >সব পণ্য দেখুন ↓</a>
                    </div>

                    {/* right side hero image */}
                    <div className = "flex justify-center md:justify-end">
                        <div className = "relative w-64 h-64 md:w-80 md:h-80">
                            <Image src="/bazar-hero.png" alt="বাজারের ঝুড়ি" fill className ="object-contain" priority/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
