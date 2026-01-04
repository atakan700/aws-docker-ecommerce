function Login() {
  return (
    <div className="w-full">
      <form className="space-y-4"> {/* Elemanlar arası boşluk (mb-3 yerine) */}
        
        {/* Email Input */}
        <div>
          <label htmlFor="inputEmail4" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="inputEmail4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            placeholder="ornek@email.com"
          />
        </div>

        {/* Şifre Input */}
        <div>
          <label htmlFor="inputPassword4" className="block text-sm font-medium text-gray-700 mb-1">
            Şifre
          </label>
          <input
            type="password"
            id="inputPassword4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            placeholder="******"
          />
        </div>

        {/* Buton Alanı */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-1/2 py-2.5 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition-colors shadow-sm"
          >
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;