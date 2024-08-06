
import { AuthData } from "@/types/authDataTypes"

const authStore: string | null = localStorage.getItem("userData")

let authData: AuthData | null = null;

if(authStore){
    authData = JSON.parse(authStore) as AuthData
}



export default authData;