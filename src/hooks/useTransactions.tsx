import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

// type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'category' | 'type'>

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider(props: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('/transactions')
        .then( res => setTransactions(res.data.transactions))
    }, []);

    async function createTransaction(transactionInput : TransactionInput) {
      const res = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date()
      })
      const { transaction } = res.data;

      setTransactions([...transactions, transaction]);
    }

    return(
      <TransactionsContext.Provider value={{ transactions, createTransaction }}>
        {props.children}
      </TransactionsContext.Provider>
    );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}