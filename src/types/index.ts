// product interface
export interface Product{
  _id? : string;
  id : string | number;
  name : string;          
  slug : string;          
  emoji : string;         
  category : string;      
  categoryName : string;  
  unit : string;          
  currentPrice : number;  
  previousPrice : number; 
  change : number;        
  changeType : "up" | "down" | "flat";
}

// category interface
export interface Category{
  id : string;
  name : string;          
  slug : string;          
  emoji : string;         
}

// api response interface
export interface ApiResponse<T>{
  success : boolean;
  data : T;
}