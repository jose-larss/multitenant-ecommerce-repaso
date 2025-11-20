"use client";

import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Capriola} from "next/font/google";

import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseRegister } from "./useRegister";

const caPriola = Capriola({
  subsets: ["latin"],
  weight: ["400"], // o el peso que necesites
})

export const SignUpView = () => {
    const registerMutation = UseRegister()

    const form = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        }
    });

    const username = form.watch("username")
    const usernameErrors = form.formState.errors.username

    const showPreview = username && !usernameErrors

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log(values)
        registerMutation.mutate(values)
    }   

    return(
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-8 lg:p-16"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <Link href={"/"}>
                                <span className={cn("text-2xl font-semibold", caPriola.className)}>
                                    funroad
                                </span>
                            </Link>

                            <Button
                                asChild
                                variant={"ghost"}
                                size={"sm"}
                                className="text-base border-none underline"
                            >
                                <Link prefetch href={"/sign-in"}>
                                    Sign in
                                </Link>
                            </Button>
                        </div>

                        <h1 className="text-4xl font-medium">
                            Únete a más de 1.500 creadores que ganan dinero en funroad
                        </h1>

                        <FormField 
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Usuario 
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormDescription className={cn("hidden", showPreview && "block")}>
                                        Tu tienda estará disponible en&nbsp;
                                        {/* TODO: Use proper method to generate preview url */}
                                        <strong>{username}</strong>.shop.com
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Email 
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Contraseña 
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            size={"lg"}
                            variant={"elevated"}
                            className="bg-black text-white hover:bg-blue-400 hover:text-primary"
                        >
                            {registerMutation.isPending ? "Registrando..." :  "Crear cuenta"}
                        </Button>

                    </form>
                </Form>
            </div>

            <div 
                style={{backgroundImage: "url('/auth-bg.png')", backgroundSize: "cover", backgroundPosition: "center"}}
                className="h-screen w-full lg:col-span-2 hidden lg:block"
            />
        </div>
    )
}