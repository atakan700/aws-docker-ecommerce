import { useEffect, useState } from "react";
import { addProduct } from "../../hooks/ProductHooks";
import { getCategories, type Category } from "../../hooks/CategoriesHooks";

export default function AddProductForm() {
    //Kategori verileri geliyo
    useEffect(() => {
        // Veriyi çekme fonksiyonu
        const fetchData = async () => {
            const data = await getCategories();
            setCategories(data);
            setSelectedCategoryId(data[0]?.id ?? "");

        };
        // Sayfa açıldığında veriyi çek
        fetchData();
    }, []);

    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
    const [selectedSubCatId, setSelectedSubCatId] = useState<number>();
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

        const [product, setProduct] = useState<addProduct>({
            name: "",
            description: "",
            pictureUrl: "",
            subCategoryId: 0,
            price: 0,
            stock: 0,
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setProduct((prev: any) => ({
                ...prev,
                [name]: name === "price" || name === "stock" || name === "subCategoryId"
                    ? Number(value) 
                    : value,
            }));
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const result = await addProduct(product);
            console.log("Sonuç:", result);
        };

        return (
        <div>
            <form onSubmit={handleSubmit}>

                <h5 className="text-lg font-medium">Temel Bilgiler</h5>

                <input
                    type="text"
                    placeholder="Ürün adı"
                    className="px-3 py-2 border rounded-md w-full"
                    value={product.name}
                    onChange={handleChange}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block mb-1">Kategori</label>
                        <select
                            value={selectedCategoryId}
                            onChange={(e) => {
                                const id = Number(e.target.value);
                                setSelectedCategoryId(id);
                            }}
                            className="px-2 py-2 border rounded-md w-full"
                        >
                            <option value="">Kategori Seç</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1">Alt kategori</label>
                        <select
                            value={selectedSubCatId}
                            onChange={(e) =>
                                setSelectedSubCatId(Number(e.target.value)
                                )}
                            className="px-2 py-2 border rounded-md w-full"
                            disabled={!selectedCategory} // kategori seçilmediyse alt kategori seçilemez
                        >
                            <option value="">Alt Kategori Seç</option>
                            {selectedCategory?.subCategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block mb-1">Stok Sayısı</label>
                        <input
                            className="px-2 py-2 border rounded-md w-full"
                            type="number"
                            value={product.stock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1">Fiyat</label>
                        <input
                            className="px-2 py-2 border rounded-md w-full"
                            type="number"
                            step="1.o"
                            value={product.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Ürün Açıklaması</label>
                    <textarea
                        className="p-3 border rounded-md w-full min-h-[120px]"
                        placeholder="Ör: Saf pamuk..."
                        value={product.description}
                    />
                </div>
            </form>
            </div>
        )
    
}