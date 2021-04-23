import {createContext, useContext} from 'react'
import AccountStore from './accountStore';
import BlogStore from './blogStore';

interface Store {
    blogStore: BlogStore,
    accountStore: AccountStore
}

export const store: Store = {
    blogStore: new BlogStore(),
    accountStore: new AccountStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}