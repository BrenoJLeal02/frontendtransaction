import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function RegisterPage(){
    return(
        <>
            <Text color="#fff">Registro</Text>
            <Button>
                <Link  to="/">Voltar</Link>
            </Button>
        </>
    )
}