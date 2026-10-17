// signup page
"use client"

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signUp, signIn} from "@/lib/auth-client";
import toast  from "react-hot-toast";

// sign up page function
export default function SignUpPage(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : "",
});

// handle change function
function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setFormData({ ...formData, [e.target.name]: e.target.value });
}

// handle submit function
async function handleSubmit(e:React.FormEvent){
    e.preventDefault();

    // valid ?
    if(!formData.name || !formData.email || !formData.password){
        toast.error("সব ফিল্ড পূরণ করুন");
        return;
    }
    if(formData.password.length < 8){
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if(formData.password !== formData.confirmPassword){
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }
    setLoading(true);
    const { error } = await signUp.email({
      name : formData.name,
      email : formData.email,
      password : formData.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }
    // success notification
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    setTimeout(() => router.push("/signin"), 800);
}
  
  // social Sign Up — Google
  async function handleGoogleSignUp(){
    try{
      setLoading(true);
      await signIn.social({provider : "google", callbackURL: "/",});
        }catch{
          toast.error("Google দিয়ে রেজিস্ট্রেশন ব্যর্থ হয়েছে");
          setLoading(false);
      }
  }

    // social sign up - github
    async function handleGithubSignUp(){
        try{
        setLoading(true);
        await signIn.social({provider: "github", callbackURL: "/",});
          }catch{
          toast.error("GitHub দিয়ে সাইন আপ ব্যর্থ হয়েছে");
          setLoading(false);
        }
    }

  return (
    <main className = "min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className = "w-full max-w-md">
        {/* header */}
        <div className = "text-center mb-6">
          <h1 className = "text-2xl font-bold text-gray-900 mb-1">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className = "text-sm text-gray-500"> বিনামূল্যে অ্যাকাউন্ট খুলে বাজার দর দেখুন</p>
        </div>

        {/* card */}
        <div className = "bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <form onSubmit = {handleSubmit} className = "space-y-4">
            {/* name */}
            <div>
              <label className = "block text-sm font-medium text-gray-700 mb-1">নাম </label>
                <input  type = "text"
                        name = "name"
                        value = {formData.name}
                        onChange = {handleChange}
                        placeholder = "আপনার পূর্ণ নাম"
                        className = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
            </div>

            {/* mail */}
            <div>
              <label className = "block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                <input  type = "email"
                        name = "email"
                        value = {formData.email}
                        onChange = {handleChange}
                        placeholder = "you@example.com"
                        className = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
            </div>

            {/* password*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
                 <input type = "password"
                        name = "password"
                        value = {formData.password}
                        onChange = {handleChange}
                        placeholder = "কমপক্ষে ৮ অক্ষর"
                        className = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>

            {/* confirm password */}
            <div>
              <label className = "block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input  type = "password"
                      name = "confirmPassword"
                      value = {formData.confirmPassword}
                      onChange = {handleChange}
                      placeholder = "আবার পাসওয়ার্ড দিন"
                      className = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
            </div>

            {/* submit button */}
                <button type = "submit"
                        disabled = {loading}
                        className = "w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2.5 rounded-md transition-colors">
                        {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}</button>
          </form>

          {/* divider */}
          <div className = "relative my-6">
            <div className = "absolute inset-0 flex items-center">
              <div className = "w-full border-t border-gray-200"></div>
            </div>

            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">অথবা</span>
            </div>
          </div>

          {/*google sign up button*/}
           <button  type = "button"
                    onClick = {handleGoogleSignUp}
                    disabled = {loading}
                    className = "w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-md transition-colors">
                    <svg className = "w-5 h-5" viewBox = "0 0 24 24">
                    <path fill = "#4285F4" d = "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill = "#34A853" d = "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill = "#FBBC05" d = "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill = "#EA4335" d = "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg> Google দিয়ে সাইন আপ
          </button>

          {/*github sign up button*/}
          <button type = "button"
                  onClick = {handleGithubSignUp}
                  disabled = {loading}
                  className = "w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-md transition-colors mt-3">
                  <svg className = "w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 
                    17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 
                    1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 
                    1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg> GitHub দিয়ে সাইন আপ
            </button>

          {/* login linkk */}
          <p className = "text-center text-sm text-gray-600 mt-6">অ্যাকাউন্ট আছে?{" "}
            <Link href = "/signin" className = "text-green-700 font-medium hover:underline">সাইন ইন করুন</Link>
          </p>
        </div>
      </div>
    </main>
  );
}