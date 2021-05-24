import { Input } from "@chakra-ui/react";
import { UserStore } from "../stores/UserStore";
import { observer } from "mobx-react";

// wrapper for inputs used in forms or any sort of api/async request to disable while loading 
function InputWrapper({...props}) {
    const userStore = UserStore;

    return(
        <Input
            disabled={userStore.isLoading}
            {...props}
        />
    );
}

export default observer(InputWrapper);
