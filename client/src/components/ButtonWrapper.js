import { Button } from "@chakra-ui/react";
import { UserStore } from "../stores/UserStore";
import { observer } from "mobx-react";

// wrapper for buttons used in forms or any sort of api/async request to disable while loading 
function ButtonWrapper({...props}) {
    const userStore = UserStore;

    return(
        <Button
            disabled={userStore.isLoading}
            {...props}
        >
            {props.children}
        </Button>
    );
}

export default observer(ButtonWrapper);
