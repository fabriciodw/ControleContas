import { Container } from "./slyles";
import { Summary } from "../Summary";
import { TrasactionsTable } from "../TrasactionsTable";

export function Dashboard(){
    return(
        <Container>
            <Summary />
            <TrasactionsTable />
        </Container>
    );
}