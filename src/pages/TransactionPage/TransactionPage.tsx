import { Box } from "@chakra-ui/react";
import { Header } from "../../components/Header/Header";
import { Summary } from "../../components/Summary/Summary";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";

export function TransactionPage(){
    return (
            <Box>
                <Header/>
                <Summary/>
                <TransactionTable/>
            </Box>
    )
}
