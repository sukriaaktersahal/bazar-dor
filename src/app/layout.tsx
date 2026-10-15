// layout for bazar dor
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

// here navbar is imported
import Navbar from "@/components/Navbar";

const hindSiliguri = Hind_Siliguri({
  subsets : ["bengali", "latin"],
  weight : ["300", "400", "500", "600", "700"],
  variable : "--font-hind-siliguri",
  display : "swap",
});

export const metadata = {
  title : "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description : "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার দর ট্র্যাক করুন।",
};

export default function RootLayout({
  children,
} : Readonly<{
  children : React.ReactNode;
}>){
  return(
    <html lang = "bn">
      <body className={`${hindSiliguri.variable} font-sans antialiased`}>
        {/* navbar will be on all page */}
        <Navbar />
        {/* page content */}
        {children}
      </body>
    </html>
  );
}