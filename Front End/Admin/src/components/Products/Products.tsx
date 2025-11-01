import { useEffect, useState } from "react";
import Table from "./ProductsSet";
import ProductAdd from "./ProductAdd";
import type { TableColumn } from "../../assets/types/table";
import { getProduct } from "../../hooks/ProductHooks";
import ImageUpload from "./ImageUpload";


interface Product {
    id: number;
    name: string;
    description?: string;
    pictureUrl?: string;
    subCategoryId: number;
    price: number;
    stock: number;
}
function Proucts() {

    const [product, setProduct] = useState<Product[]>([])
    const [selectedProductId, setSelectedProductId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProduct();
            console.log("Ürünler:", data)
            setProduct(data)
            //burada ise gelen ilk kategori seçiliyor ve alt kategori görüntülenmesine yardımcı oluyo 

        };

        // Sayfa açıldığında veriyi çek
        fetchData();
    }, []);

  const handleProductAdded = (id: number) => {
    setSelectedProductId(id); // yeni eklenen ürünün ID'si burada tutuluyor
  };

    const tableData: Product[] = product;

    const tableColumns: TableColumn<Product>[] = [
        { header: 'id', accessor: 'id' },
        { header: 'Ürün Adı', accessor: 'name' },
        { header: 'Açıklama', accessor: 'description' },
        { header: 'Fiyat', accessor: 'price' },
        { header: 'Stok Sayısı', accessor: 'stock' },
        {header:'ilk parametre',accessor:'pictureUrl'}
    ] as const;

    return (
        <div>
            <div className="flex flex-col space-y-4 max-w-7xl h-1/2">
                <ProductAdd onProductAdded={handleProductAdded} />
            </div>
            <Table data={tableData} columns={tableColumns} />

        </div>
    )
}
export default Proucts