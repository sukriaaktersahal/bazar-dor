// product page
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/api";
import { unitToBengali } from "@/types";
import { toBengaliNumber,formatChange, getChangeColor } from "@/lib/format";

interface Props{
    params : Promise<{slug : string}>;
}

export default async function ProductDetailsPage({params} : Props){
    const {slug} = await params;
    const product = await getProductBySlug(slug);

    if(!product){
    notFound();
  }

//   calculating min., max.
    const marketPrices = product.markets.map((m)=> (m.min + m.max) / 2);
    const avgPrice = marketPrices.length > 0? Math.round(marketPrices.reduce((a, b)=> a + b, 0) / marketPrices.length) : product.today;
    const minPrice = product.markets.length > 0? Math.min(...product.markets.map((m)=> m.min)) : product.today;
    const maxPrice = product.markets.length > 0? Math.max(...product.markets.map((m)=> m.max)) : product.today;

    return(
        <main className = "max-w-6xl mx-auto px-4 py-8">
            {/* breadcrumb */}
            <nav className = "text-sm text-gray-500 mb-4 flex items-center gap-2 flex-wrap">
                <Link href="/" className = "hover:text-green-700"> হোম </Link>
                <span>›</span>
                <Link href = {`/category/${product.category}`} className = "hover:text-green-700">{product.categoryNameBn}</Link>
                <span>›</span>
                <span className = "text-gray-900">{product.nameBn}</span>
            </nav>


            {/* top summary card */}
            <div className = "bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className = "flex items-start justify-between gap-4 flex-wrap">

                    {/* left side */}
                    <div className = "flex items-start gap-4 flex-1">
                        <div className = "w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-5xl shrink-0">{product.image}</div>
                        <div >
                            <h1 className = "text-2xl font-bold text-gray-900 mb-1">{product.nameBn}</h1>
                            <p className = "text-sm text-gray-500 mb-2">{product.categoryNameBn} · {unitToBengali(product.unit)}</p>
                            <p className = "text-sm text-gray-600 mb-3">সর্বনিম্ন {toBengaliNumber(minPrice)} টাকা | সর্বোচ্চ {toBengaliNumber(maxPrice)} টাকা | গড় {toBengaliNumber(avgPrice)} টাকা</p>
                            <div className = "flex flex-wrap gap-2">
                            <span className = "bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">{product.categoryNameBn}</span>
                            <span className = "bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{unitToBengali(product.unit)}</span>
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className = "bg-green-50 border border-green-100 rounded-lg p-4 min-w-[160px] text-right">
                        <p className = "text-xs text-gray-500 mb-1">আজকের দাম</p>
                        <p className = "text-3xl font-bold text-gray-900">{toBengaliNumber(product.today)}{" "}
                            <span className = "text-base font-medium">টাকা</span>
                        </p>
                        <p className = "text-xs text-gray-500 mt-1">প্রতি {unitToBengali(product.unit).replace("প্রতি ", "")}</p>
                        <span className = {`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded ${getChangeColor(product.change.dir)}`}>
                            {formatChange(product.change.pct, product.change.dir)}
                        </span>
                    </div>
                </div>
            </div>


            {/*price summary*/}
            <div className = "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className = "bg-white border border-gray-200 rounded-lg p-4">
                    <p className = "text-xs text-gray-500 mb-1">সর্বনিম্ন দাম</p>
                    <p className = "text-xl font-bold text-green-700">{toBengaliNumber(minPrice)} টাকা</p>
                    <p className = "text-xs text-gray-400 mt-1">বাজারের সর্বনিম্ন</p>
                </div>

                <div className = "bg-white border border-gray-200 rounded-lg p-4">
                    <p className = "text-xs text-gray-500 mb-1">সর্বোচ্চ দাম</p>
                    <p className = "text-xl font-bold text-red-600">{toBengaliNumber(maxPrice)} টাকা</p>
                    <p className = "text-xs text-gray-400 mt-1">বাজারের সর্বোচ্চ</p>
                </div>

                <div className = "bg-white border border-gray-200 rounded-lg p-4">
                    <p className = "text-xs text-gray-500 mb-1">গড় দাম</p>
                    <p className = "text-xl font-bold text-gray-900">{toBengaliNumber(avgPrice)} টাকা </p>
                    <p className = "text-xs text-gray-400 mt-1">সব বাজারের গড়</p>
                </div>
            </div>


            {/* maret price table */}
            <div className = "bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className = "px-6 py-4 border-b border-gray-100">
                    <h2 className = "text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
                    <p className = "text-sm text-gray-500">বিভিন্ন বাজারে এই পণ্যের সর্বনিম্ন ও সর্বোচ্চ দাম</p>
                </div>

                <div className = "overflow-x-auto">
                    <table className = "w-full">
                        <thead className = "bg-gray-50 text-xs text-gray-500 uppercase">
                            <tr>
                                <th className = "text-left px-6 py-3">বাজারের নাম</th>
                                <th className = "text-left px-6 py-3">বিভাগ</th>
                                <th className = "text-right px-6 py-3">সর্বনিম্ন</th>
                                <th className = "text-right px-6 py-3">সর্বোচ্চ</th>
                            </tr>
                        </thead>

                        <tbody className = "divide-y divide-gray-100">{product.markets.map((market, idx) =>(<tr key={idx} className = "hover:bg-gray-50">
                            <td className = "px-6 py-3 text-sm text-gray-900">{market.market}</td>
                            <td className = "px-6 py-3 text-sm text-gray-600">{market.division}</td>
                            <td className = "px-6 py-3 text-sm text-right font-medium text-green-700">{toBengaliNumber(market.min)} টাকা</td>
                            <td className = "px-6 py-3 text-sm text-right font-medium text-red-600">{toBengaliNumber(market.max)} টাকা</td>
                          </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* footer */}
                <div className = "px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <p className = "text-xs text-gray-500 text-center">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
                </div>
            </div>
        </main>
    );

}
