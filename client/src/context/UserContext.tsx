import { createContext, useState, Dispatch, SetStateAction } from "react";
import { LoggedUser } from "../types/User";

type UserContextType = {
    user: LoggedUser | undefined;
    setUser: Dispatch<SetStateAction<LoggedUser | undefined>>;
};


export const UserContext = createContext({} as UserContextType);
type Props = {
	children: React.ReactNode;
};
export const UserProvider = ({ children }: Props) => {
	const [user, setUser] = useState<LoggedUser>()

	
	const contextValue = {
		user,
        setUser,
	};
	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};
