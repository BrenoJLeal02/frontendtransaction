import { Header } from "../../components/Header/Header";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";

export function TransactionPage(){
    return (
            <div>
                <Header/>
                <TransactionTable />
            </div>
    )
}