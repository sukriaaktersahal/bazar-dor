// importing bangla font
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

// both bangla & english font can work
const hindSiliguri = Hind_Siliguri({
  subsets : ["bengali", "latin"],
  weight : ["300", "400", "500", "600", "700"],
  variable : "--font-hind-siliguri",
  display : "swap",
});

// for metadata
export const metadata = {
  title : "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার দর ট্র্যাক করুন। চাল, ডাল, সবজি, মাছ, মাংসের আজকের দাম এক জায়গায়।",
};

// rootlayout function
export default function RootLayout({
  children,
} : Readonly <{
  children : React.ReactNode;
}>) {
  return(
    <html lang = "bn">
      <body className = {`${hindSiliguri.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

