function Register() {
  return (
    <form className="space-y-3">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Şifre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Adres */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
          placeholder="Örnek Mah. 1234 Sk."
        />
      </div>

      {/* Şehir ve İlçe (Yan yana görünmesi için grid eklenebilir, şu an alt alta) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all">
          <option>Seçiniz...</option>
          <option>Merkez</option>
          <option>Diğer</option>
        </select>
      </div>

      {/* Posta Kodu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Posta Kodu</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Checkbox */}
      <div className="flex items-center my-4">
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400 cursor-pointer"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
          Şartları kabul ediyorum
        </label>
      </div>

      {/* Butonlar */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="w-1/2 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition-colors shadow-sm"
        >
          Kayıt Ol
        </button>
        <button
          type="button"
          className="w-1/2 py-2 bg-gray-100 text-gray-700 border border-gray-300 font-semibold rounded hover:bg-gray-200 transition-colors"
        >
          Hakkında
        </button>
      </div>
    </form>
  );
}

export default Register;