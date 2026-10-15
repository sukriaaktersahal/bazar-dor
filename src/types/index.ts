// marketPrice interface
export interface MarketPrice{
  market : string;      
  division : string;    
  min : number;         
  max : number;         
}

// price change interface
export interface PriceChange{
    dir : "up" | "down" | "flat";
    pct : number;
}

// product interface
export interface Product{
  id : number;
  nameBn : string;          
  slug : string;                   
  category : string;      
  categoryNameBn : string;
  categoryIcon : string;  
  unit : string;
  image : string;               
  today : number;               
  yesterday : number;           
  lastWeek : number;
  lastMonth : number;          
  change : PriceChange;
  markets : MarketPrice[];
}

// category interface
export interface Category{
  id : string;
  name : string;          
  slug : string;          
  icon : string;         
}

// helper unit
export function unitToBengali(unit : string) : string{
  const map : Record<string, string> ={
    kg : "প্রতি কেজি",
    litre : "প্রতি লিটার",
    dozen : "প্রতি ডজন",
    piece : "প্রতি পিস",
    gram : "প্রতি গ্রাম",
  };
  return map[unit] || `প্রতি ${unit}`;
}