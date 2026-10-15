// skkeleton of bazarDor
export default function ProductSkeleton(){
    return(
        <div className = "bg-white border border-gray-200 rounded-lg p-4 animate-pulse">

            {/* upper part */}
            <div className = "flex items-start gap-3 mb-3">
                <div className = "w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className = "flex-1">
                    <div className = "h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className = "h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>

            {/* lower part */}
            <div className = "flex items-end justify-between pt-2 border-t border-gray-100">
                <div className = "flex-1">
                    <div className = "h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className = "h-5 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className = "h-6 bg-gray-200 rounded w-16"></div>
            </div>
        </div>
    );
}

// more skeleton for grid
export function ProductSkeletonGrid({count = 8} : {count? : number}){
    return(
        <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({length : count}).map((_, i) =>(<ProductSkeleton key = {i} />))} </div>
    );
}

