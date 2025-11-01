  
function Tables(){

return(
  <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Ürünler</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Ad</th>
                <th className="py-2">Kategori</th>
                <th className="py-2">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2">Ürün 1</td>
                <td className="py-2">Kategori 1</td>
                <td className="py-2">$100</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2">Ürün 2</td>
                <td className="py-2">Kategori 2</td>
                <td className="py-2">$150</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2">Ürün 3</td>
                <td className="py-2">Kategori 1</td>
                <td className="py-2">$200</td>
              </tr>
            </tbody>
          </table>
        </div>
    )
}

export default Tables