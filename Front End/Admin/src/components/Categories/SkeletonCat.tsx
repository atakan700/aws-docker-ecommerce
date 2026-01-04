const CATEGORY_SKELETON_COUNT = 5;
const SUBCATEGORY_SKELETON_COUNT = 4;

export default function SkeletonCat() {
  return (
    <div>
      <aside className="h-4/5 w-4/5 bg-slate-100 text-slate-950 p-4 rounded border shadow-sm flex flex-row space-x-4 animate-pulse">
        {/* Sol taraf - Kategoriler */}
        <div className="w-1/2 py-2 px-2">
          <div className="h-6 bg-gray-300 w-28 mb-4 rounded"></div>

          {/* Ekle butonu skeleton */}
          <div className="h-10 bg-gray-200 w-36 rounded mb-4"></div>

          {/* Kategori listesi skeleton */}
          <ul className="py-3 pl-0 space-y-2">
            {Array.from({ length: CATEGORY_SKELETON_COUNT }).map((_, index) => (
              <li
                key={`category-skeleton-${index}`}
                className="flex items-center justify-between px-3 py-2 bg-gray-200 rounded-sm"
              >
                <div className="h-5 bg-gray-300 rounded w-2/3"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-6 bg-gray-300 rounded"></div>
                  <div className="h-6 w-6 bg-gray-300 rounded"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ taraf - Alt kategoriler */}
        <div className="w-2/3 px-2 py-2">
          <div className="h-6 bg-gray-300 w-36 mb-4 rounded"></div>
          <div className="h-10 bg-gray-200 w-44 rounded mb-4"></div>

          <div className="max-h-64 overflow-y-auto rounded border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left">
                    <div className="h-4 bg-gray-300 w-16 rounded"></div>
                  </th>
                  <th className="p-3 text-left">
                    <div className="h-4 bg-gray-300 w-24 rounded"></div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: SUBCATEGORY_SKELETON_COUNT }).map((_, index) => (
                  <tr key={`subcategory-skeleton-${index}`} className="border-b">
                    <td className="p-3">
                      <div className="h-4 bg-gray-200 w-32 rounded"></div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </aside>
    </div>
  );
}