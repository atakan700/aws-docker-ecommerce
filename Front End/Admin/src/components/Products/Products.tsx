import { useEffect, useState } from "react";
import Table from "./ProductsSet";
import ProductAdd from "./ProductAdd";
import type { TableColumn } from "../../assets/types/table";
import { getProduct, type Product } from "../../hooks/ProductHooks"; // Import düzgün
import ImageUpload from "./ImageUpload";
import ProductImgCarousel from "./ProductImgCarousel";
import { GET_Image_URL } from "../../constans/ProductApiUrl";

function Products() { // Fonksiyon ismini düzelttim (Proucts -> Products)

    const [product, setProduct] = useState<Product[]>([])
    const [selectedProductId, setSelectedProductId] = useState(0);

    // CloudFront Domainini buraya ekle (Sonunda / olmasın)
   

    useEffect(() => {
        const fetchData = async () => {
            const Data = await getProduct();
        
            if (Array.isArray(Data)) {
                 setProduct(Data);
            } else {
                 setProduct([Data]); 
            }
        };
        fetchData();
    }, []);

    const handleProductAdded = (id: number) => {
        setSelectedProductId(id);
    };

    const tableColumns: TableColumn<Product>[] = [
        { header: 'id', accessor: 'id' },
        { header: 'Ürün Adı', accessor: 'name' },
        { header: 'Fiyat', accessor: 'price' },
        { header: 'Stok', accessor: 'stock' },
        { 
            header: 'Ürün Resmi', 
            accessor: 'pictures',
            render: (item) => (
            // Logic'i component'e devrettik, burası tertemiz kaldı
            <ProductImgCarousel 
                pictures={item.pictures || []} 
                cloudFrontDomain={GET_Image_URL} 
            />
                )
        }
    ] as const;

    return (
        <div>
            <div className="flex flex-col space-y-4 max-w-7xl h-1/2">
                <ProductAdd onProductAdded={handleProductAdded} />
            </div>
            {/* DÜZELTME: Data yerine product yazıldı */}
            <Table data={product} columns={tableColumns} />
        </div>
    )
}

export default Products;