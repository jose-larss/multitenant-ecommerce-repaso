"use client";

import { QueryClient , QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { useState } from "react";

interface Props {
    children: React.ReactNode;
}

export const ReactQueryProvider = ({children}: Props) => {
    //Cada cliente en el navegador debe tener su propio queryClient
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}