import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateTenantSlugURL(tenantSlug: string){
  return `/tenants/${tenantSlug}`
}

export function formatCurrent(value: number | string) {
  return  new Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 2
          }).format(Number(value))
}