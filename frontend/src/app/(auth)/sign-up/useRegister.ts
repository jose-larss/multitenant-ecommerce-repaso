import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const UseRegister = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: async (values: {email: string, username: string, password: string}) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                //Manejo de errores si el backend devuelve un estado no existoso
                const errorData = await response.json().catch(() => ({}));
                //console.error("Error en el backend", errorData)
                throw errorData || {detail: "something went wrong"}
                //return errorData
            }

            return response.json()
        },
        onError: (error: any) => {
            //error viene del throw results
            if (error && typeof error === "object") {
                //POr ejemplo si django devuelve {password: ["Demasiado corta"]}
                Object.values(error).forEach((errArray: any) => {
                    if (Array.isArray(errArray)) {
                        errArray.forEach((msg) => toast.error(msg))
                    }
                })
            } else {
                toast.error("Error desconocido al registrar")
            }
        },
        onSuccess: () => {
            toast.success("Usuario registrado correctamente")
            router.push("/")
        }
    })
}