import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext(); // uygulama genelinde socketio bağlantısına erişimi sağlar

export const useSocketContext = () => { // başka bielşenlerin kullanması için hook
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser._id,
                }
            });

			setSocket(socket);

            // socket.on is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]); // authUser her değiştiğinde çalışır

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};


// import { createContext, useEffect, useState } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from 'socket.io-client';

// export const SocketContext = createContext();

// export const SocketContextProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const { authUSer } = useAuthContext();

//     useEffect(() => {
//         if (authUSer) {
//             const socket = io("http://localhost:5000");

//             setSocket(socket);

//             return () => socket.close()
//         } else {
//             if (socket) {
//                 socket.close();
//                 setSocket(null);
//             }
//         }
//     }, [])

//     return (
//         <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
//     )
// }