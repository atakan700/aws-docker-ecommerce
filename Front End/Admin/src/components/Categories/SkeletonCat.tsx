export default function(){
    return(
       <div>
      <aside className="h-4/5 w-4/5 bg-slate-100 text-slate-950 p-4 rounded border shadow-sm flex flex-row space-x-4 animate-pulse">

        {/* Sol taraf - Kategoriler */}
        <div className="w-1/2 py-2 px-2">
          <div className="h-5 bg-gray-300 w-24 mb-4 rounded"></div> {/* Başlık */}
          
          {/* Ekle butonu yerine geçici kutu */}
          <div className="h-8 bg-gray-200 w-32 rounded mb-3"></div>
          
          {/* Kategori listesi skeleton */}
          <ul className="py-3 pl-0 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className="flex items-center justify-between px-3 py-2 bg-gray-200 rounded-sm"
              >
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-6"></div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ taraf - Alt kategoriler */}
        <div className="w-2/3 px-2 py-2">
          <div className="h-5 bg-gray-300 w-32 mb-4 rounded"></div> {/* Başlık */}
          <div className="h-8 bg-gray-200 w-40 rounded mb-3"></div> {/* Ekle butonu */}
          
          <div className="max-h-64 overflow-y-auto rounded border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">
                    <div className="h-4 bg-gray-300 w-16 rounded"></div>
                  </th>
                  <th className="p-2 text-left">
                    <div className="h-4 bg-gray-300 w-20 rounded"></div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">
                      <div className="h-4 bg-gray-200 w-24 rounded"></div>
                    </td>
                    <td className="p-2">
                      <div className="h-4 bg-gray-200 w-16 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </aside>
    </div>
    )
}