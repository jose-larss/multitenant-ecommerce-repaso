import { Suspense } from "react"
import { ProductSort } from "../ui/components/product-sort"
import { ProductFilters } from "../ui/components/products-filters"
import { ProductListSkeleton, ProductsList } from "../ui/components/products-list";


interface Props {
    category?: string;
    subcategory?: string;
    tenant?: string;
    //para que se vea menos delgada la card del tenant
    narrowView?: boolean;
};

export const ProductListView = ({category, subcategory, tenant, narrowView}: Props) => {
    return(
        <div className="p-4 lg:px-12 py-8 flex flex-col gap-4">  
            
            <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
                <p className="text-2xl font-medium">Conservado para ti</p>
                <ProductSort />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
                <div className="lg:col-span-2 xl:col-span-2">
                    <div className="border p-2">
                        <ProductFilters/>
                    </div>
                </div>
            
                <div className="lg:col-span-4 xl:col-span-6">
                    <Suspense fallback={<ProductListSkeleton narrowView={narrowView}/>}>
                        <ProductsList
                            category={category}
                            subcategory={subcategory}
                            tenant={tenant}
                            narrowView={narrowView}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}