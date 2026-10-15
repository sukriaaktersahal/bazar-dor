// converting product price in bangla
export function toBengaliNumber(num : number) : string{
    const formatted = num.toLocaleString("en-IN");
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return formatted.replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
}

// change precentage
export function formatChange(change : number) : string{
    if(change > 0){
        return `▲ ${toBengaliNumber(Math.abs(change))}%`;
    }else if(change < 0){
        return `▼ ${toBengaliNumber(Math.abs(change))}%`;
    }
    return `-০.০%`;
}

// change type
export function getChangeType(change : number) : "up" | "down" | "flat"{
    if(change > 0) return "up";
    if(change < 0) return "down";
    return "flat";
}

