// converting product price in bangla
export function toBengaliNumber(num : number | undefined | null) : string{
    if(num === undefined || num === null || isNaN(Number(num))){
        return "০";
    }
    const formatted = Number(num).toLocaleString("en-IN");
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return formatted.replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
}

// change precentage
export function formatChange(pct: number | undefined | null, dir? : "up" | "down" | "flat" ) : string{
    const num = Number(pct) || 0;
    const direction = dir || (num > 0 ? "up" : num < 0 ? "down" : "flat");
    if(direction === "up") return `▲ ${toBengaliNumber(Math.abs(num))}%`;
    if(direction === "down") return `▼ ${toBengaliNumber(Math.abs(num))}%`;
    return `-০.০%`;
}

// change color
export function getChangeColor(dir : "up" | "down" | "flat") : string{
    if(dir === "up") return "text-red-600 bg-red-50";
    if(dir === "down") return "text-green-600 bg-green-50";
    return "text-gray-500 bg-gray-50";
}

