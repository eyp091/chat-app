import { createContext, useContext, useState } from "react";

// yeni oluşturulan bir bağlam, bunu uygulamanın başka yerlerinde kullanarak kullanıcı kimlik bilgilerini paylaşabilirsin.
export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

// bağlam sağlayıcısıdır. bu bileşen altında bulunan diğer bileşenlere bağlamı sağlar. "children" bu sağlayıcının kapsadığı bileşenleri temsil eder.
export const AuthContextProvider = ({children}) => {
    // tarayıcının localstorage'ında bulunan "caht-user" verisini alır.kimlik doğrulaması yapılmış kullanıcı verilerini içerir.
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    //const [authUser, setAuthUser] = useState(JSON.parse(sessionStorage.getItem("chat-user")) || null);

    return <AuthContext.Provider value={{authUser, setAuthUser}} >{children}</AuthContext.Provider>
}