

const apiService = {

    getRefreshToken: async function (): Promise<any> {
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`, {
                method: 'POST',
                credentials: "include",   // 👈 equivalente a withCredentials: true
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                //Manejo de errores si el backend devuelve un estado no existoso
                const errorData = await response.json();
                //console.error("Error en el backend", errorData)
                return errorData
            }
            //si la respuesta es exitosa
            const data = response.json()
            return data;

        } catch (error) {
            //Manejo de errores de red o conexion
            console.error("Error al enviar datos:", error)
        }
    },

    getNoCacheNoCredentials: async function (url: string): Promise<any> {
   
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'GET',
                cache: "no-store", // evita que nextJs use su propio cache
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                //Manejo de errores si el backend devuelve un estado no existoso
                const errorData = await response.json();
                //console.error("Error en el backend", errorData)
                return errorData
            }
            //si la respuesta es exitosa
            const data = response.json()
            return data;

        } catch (error) {
            //Manejo de errores de red o conexion
            console.error("Error al enviar datos:", error)
        }
    },

    get: async function (url: string): Promise<any> {
     
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'GET',
                credentials: "include",   // 👈 equivalente a withCredentials: true
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${token}`
                }
            });
          
            if (!response.ok) {
                /*
                //Manejo de errores si el backend devuelve un estado no existoso
                const errorData = await response.json();
                //console.error("Error en el backend", errorData)
                return errorData
                */
                
                const refreshToken = await apiService.getRefreshToken() || null;
                console.log("REFRESH TOKEN ES: ", refreshToken.message)
                if (refreshToken.message) {
                    // Reintentamos la MISMA petición, SOLO una vez
                    return apiService.get(url);
                }
                
                    
            }
            //si la respuesta es exitosa
            const data = response.json()
            return data;

        } catch (error) {
            //Manejo de errores de red o conexion
            console.error("Error al enviar datos:", error)
        }
    },
    /*
    post: async function (url: string, data: any): Promise<any> {
        console.log('POST', url, data);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    //'Authorization': `Bearer ${token}`
                }
            });

            const json = await response.json();
            console.log('Response:', json);

            return json;
        } catch (error) {
            throw error;
        }
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log('POST without token', url, data);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();
            console.log('Response:', json);

            return json;
        } catch (error) {
            throw error;
        }
    },
    */

};

export default apiService;
