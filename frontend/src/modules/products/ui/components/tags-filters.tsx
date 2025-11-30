import apiService from "@/app/services/apiServices";
import { useInfiniteQuery } from "@tanstack/react-query"
import { DEFAULT_LIMIT_PAGINATION } from "../../../../../constants";
import { CustomTags } from "@/app/(home)/types";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderIcon } from "lucide-react";

interface TagsFilterProps {
    value?: string[] | null
    onChange: (value: string[]) => void
}

export const TagsFilters = ({value, onChange}: TagsFilterProps) => {
    
    const {data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage} = useInfiniteQuery({
                        queryKey: ["tags"], 
                        queryFn: ({ pageParam }) => {
                            return apiService.getInfiniteQueries(pageParam)},
                        initialPageParam: `${process.env.NEXT_PUBLIC_API_URL}/tags/?limit=${DEFAULT_LIMIT_PAGINATION}`,
                        getNextPageParam: (lastPage) => {
                            return lastPage.next || undefined}, // DRF cursor devuelve "next"
        });
   
    const onClickTag = (tag: string) => {
        if (value?.includes(tag)) {
            onChange(value?.filter((t) => t !== tag) || []);
        } else {
            onChange([...(value || []), tag]);
        }
    }

    return(
        <div className="flex flex-col gap-y-2">
            {isLoading ? (
                <div className="flex items-center justify-between p-4">
                    <LoaderIcon className="size-4 animate-spin"/>
                </div>
            ) : (
                data?.pages.map((page) => 
                    page.results.map((tag: CustomTags) => (
                        <div
                            key={tag.id}
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => onClickTag(tag.name)}
                        >
                            <p className="font-medium">{tag.name}</p>
                            <Checkbox 
                                className="cursor-pointer"
                                checked={value?.includes(tag.name)}
                                onCheckedChange={() => onClickTag(tag.name)}
                            />
                        </div>
                    ))
                )
            )}
            {hasNextPage && (
                <button
                    disabled={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    className="underline font-medium justify-start text-start disabled:opacity-50 cursor-pointer"
                >
                    Cargar más...
                </button>
            )}
        </div>
    )
}