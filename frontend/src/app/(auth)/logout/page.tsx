import { redirect } from "next/navigation";

const Logout = () => {
    // Redirige a login
    redirect("/");

    return <p>Desconectando...</p>;
}
export default Logout;