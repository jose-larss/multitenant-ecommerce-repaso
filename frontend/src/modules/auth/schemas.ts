import z from "zod";

export const registerSchema = z.object({
    email: z.email({message: "Email inválido"}),
    password: z.string().min(6, "Password tiene que tener al menos 6 caracteres"),
    username: z
        .string()
            .refine((val) => !val.includes("--"), "Usuario no puede contener guiones consecutivos")
            .min(3, "Usuario tiene que tener al menos 3 caracteres")
            .max(63, "Usuario tiene que tener como máximo 63 carateres")
            .regex(
                /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
                "Usuario solo pude contener letras minúsculas, numeros y guiones. Tiene que empezar y terminar con una letra o numero"
            )
            .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
    email: z.email({message: "Email inválido"}),
    password: z.string()
}) 
    
