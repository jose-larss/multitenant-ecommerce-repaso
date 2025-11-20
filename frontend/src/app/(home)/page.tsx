"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const fetchSession = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me/`, {
            method: "GET",
            credentials: "include",   // 👈 equivalente a withCredentials: true
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            //Manejo de errores si el backend devuelve un estado no existoso
            const errorData = await response.json();
            //console.error("Error en el backend", errorData)
            return errorData
        }
        //si la respuesta es exitosa
        const data = response.json()
        console.log(data)
        return data;

    } catch (error) {
        //Manejo de errores de red o conexion
        console.error("Error al enviar datos:", error)
    }
}


const Home = () => {
  const {data, isLoading, error} = useQuery({queryKey: ['session'], queryFn: fetchSession,})

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error cargando sesión</p>

  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        <div>
          <Button variant={"elevated"}>Soy un botón</Button>
        </div>
        <div>
          <Input placeholder="Soy un input"/>
        </div>
        <div>
          <Progress value={50}/>
        </div>
        <div>
          <Textarea placeholder="Soy un text area"/>
        </div>
        <div>
          <Checkbox />
        </div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      
    </div>
  );
}
export default Home;
