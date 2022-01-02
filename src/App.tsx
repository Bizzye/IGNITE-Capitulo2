import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionsModal";
import { GlobalStyle } from "./styles/global";

Modal.setAppElement('#root')

export function App() {

  const [newTransactionModelOpen, setNewTransactionModelOpen] = useState(false);

    function handleOpenNewTransactionModal(){
        setNewTransactionModelOpen(true)
    }

    function handleCloseNewTransactionModal(){
        setNewTransactionModelOpen(false)
    }

  return (
    <>
     <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
     <Dashboard />

     <NewTransactionModal isOpen={newTransactionModelOpen} onRequestClose={handleCloseNewTransactionModal} />
      
     <GlobalStyle />
    </>
  );
}
