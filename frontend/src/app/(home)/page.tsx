"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";


const Home = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const categories = async () => {

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          //Manejo de errores si el backend devuelve un estado no existoso
          const errorData = await response.json();
          console.error("Error en el backend", errorData)
          return;
        }
        //si la respuesta es exitosa
        const data = await response.json()
    
        setCategories(data)
      } catch (error) {
        //Manejo de errores de red o conexion
        console.error("Error al enviar datos:", error)
      }
    }
    categories();
  }, [])

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
      </div>
      {JSON.stringify(categories, null, 2)}
    </div>
  );
}
export default Home;
