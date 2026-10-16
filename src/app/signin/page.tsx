// sign in page
"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signIn} from "@/lib/auth-client";
import toast from "react-hot-toast";

// sign in page function
export default function SignInPage(){
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email : "",
    password : "",
  });

//   handle change function
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

// handle submit function
  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    if (!formData.email || !formData.password){
      toast.error("সব ফিল্ড পূরণ করুন");
      return;
    }
    setLoading(true);
    const {error} = await signIn.email({
      email : formData.email,
      password : formData.password,
    });
    setLoading(false);

    // if sign in failed
    if (error){
      toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
      return;
    }

    // if sign in success
    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    setTimeout(()=> router.push("/"), 500);
  }

  async function handleGoogleSignIn(){
    try{
      setLoading(true);
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    }catch{
      toast.error("Google দিয়ে সাইন ইন ব্যর্থ হয়েছে");
      setLoading(false);
    }
  }

  return(
    <main className = "min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className = "w-full max-w-md">
        {/* header */}
        <div className = "text-center mb-6">
          <h1 className = "text-2xl font-bold text-gray-900 mb-1">সাইন ইন</h1>
          <p className = "text-sm text-gray-500">  আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        <div className = "bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <form onSubmit = {handleSubmit} className = "space-y-4">
            {/* mail */}
            <div>
              <label className = "block text-sm font-medium text-gray-700 mb-1"> ইমেইল </label>
                 <input type = "email"
                        name = "email"
                        value = {formData.email}
                        onChange = {handleChange}
                        placeholder = "you@example.com"
                        className = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
            </div>

            {/* password  */}
            <div>
              <label className = "block text-sm font-medium text-gray-700 mb-1"> পাসওয়ার্ড</label>
              <div className = "relative">
                <input type = {showPassword ? "text" : "password"}
                        name = "password"
                        value = {formData.password}
                        onChange = {handleChange}
                        placeholder = "আপনার পাসওয়ার্ড"
                        className = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-16"/>
                <button type = "button" onClick = {()=> setShowPassword(!showPassword)} className = "absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs font-medium"> {showPassword ? "লুকান" : "দেখান"}</button>
              </div>
            </div>

            {/* submit */}
            <button type = "submit" disabled = {loading} className = "w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 rounded-md transition-colors">{loading ? "অপেক্ষা করুন..." : "সাইন ইন"} </button>
          </form>

          {/* divider */}
          <div className = "relative my-6">
            <div className = "absolute inset-0 flex items-center">
              <div className = "w-full border-t border-gray-200"></div>
            </div>

            <div className = "relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">অথবা</span></div>
          </div>

          {/* google sign in */}
            <button type = "button"
                    onClick = {handleGoogleSignIn}
                    disabled = {loading}
                    className = "w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-md transition-colors">
                    <svg className = "w-5 h-5" viewBox="0 0 24 24">
                    <path fill ="#4285F4" d ="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill ="#34A853" d ="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill ="#FBBC05" d ="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill ="#EA4335" d ="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg> Google দিয়ে সাইন ইন
            </button>

            <p className ="text-center text-sm text-gray-600 mt-6">অ্যাকাউন্ট নেই?{" "}
                <Link href = "/signup" className = "text-green-700 font-medium hover:underline"> সাইন আপ করুন</Link>
            </p>
        </div>
      </div>
    </main>
  );
}