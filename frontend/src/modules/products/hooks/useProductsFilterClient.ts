import { useQueryStates, parseAsString, parseAsArrayOf, parseAsStringLiteral} from "nuqs";

const sortValues = ["clasificacion", "tendencia", "caliente_y_nuevo"] as const

const params = {
    sort: parseAsStringLiteral(sortValues).withDefault("clasificacion"),
    minPrice: parseAsString.withOptions({clearOnDefault: true}).withDefault(""),
    maxPrice: parseAsString.withOptions({clearOnDefault: true}).withDefault(""),   
    tags: parseAsArrayOf(parseAsString).withOptions({clearOnDefault: true}).withDefault([]),
}

export const useProductsFilters = () => {
    return useQueryStates(params)
}

