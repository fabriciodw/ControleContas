import { createContext, useEffect, useState, ReactNode, useContext} from 'react';
import { api } from '../services/api';


interface Transaction{
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionsInput = Omit<Transaction, 'id' | 'createdAt'> //herda todos os campos menos o ID

/*interface TransactionsInput{
    title: string;
    amount: number;
    type: string;
    category: string;
}*/
interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionsInput) => Promise<void>;
}

interface TransactionsProviderProps{
    children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData    
);

export function TransactionsProvider({ children } : TransactionsProviderProps){
    const [transactions,setTransaction] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')            
            .then(response=> setTransaction(response.data.transactions))
    },[]);

    async function createTransaction(transactionInput: TransactionsInput){        
        const response = await api.post('/transactions', {
             ...transactionInput,
             createdAt: new Date(),
        });
        const { transaction } =  response.data;
        setTransaction([ //mutabilidade
            ...transactions,
            transaction,
        ]);
    }



    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)
    return context;
}