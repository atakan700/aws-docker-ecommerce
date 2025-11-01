   

function StatsCard(){
return( 
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-xl font-bold">5</p>
            <p className="text-gray-600">Toplam kategori</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-xl font-bold">120</p>
            <p className="text-gray-600">Toplam ürün</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-xl font-bold">300</p>
            <p className="text-gray-600">Toplam kullanıcı</p>
          </div>
        </div>
    )
}

export default StatsCard