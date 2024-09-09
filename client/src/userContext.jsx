import { createContext,useEffect,useState } from 'react';
import axios from 'axios';

export const userContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    //useeffect to not re-render when we refresh the page
    
        useEffect(()=>{
            if(!user){
            axios.get('/profile').then(({data})=>{
                setUser(data);
                setReady(true);
            })
            
            }
        },[])

   
    return (
        <userContext.Provider value={{user,setUser,ready}}>
            {children}
        </userContext.Provider>
        
    )
}