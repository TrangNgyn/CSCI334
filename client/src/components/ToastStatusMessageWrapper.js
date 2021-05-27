import { UserStore } from "../stores/UserStore";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { observer } from "mobx-react";

function ToastStatusMessageWrapper({...props}) {
    const userStore = UserStore;
    const toast = useToast();
  
    const returnSuccessToast = () => {
      toast({
        title: "Success",
        description: userStore.successMSG,
        status: "success",
  
        duration: 7000,
        isClosable: true,
      });
    }
    
    const returnWarningToast = () => {
      toast({
        title: "Error",
        description: userStore.errorMSG,
        status: "error",
  
        duration: 7000,
        isClosable: true,
      });
    }


    useEffect(() => {

      
    if(userStore.successMSG){
      if(userStore.successMSG.length > 0){
        returnSuccessToast();
        userStore.setProperty('successMSG', "");
      }
    }


    //   if(userStore.successMSG || userStore.successMSG.length > 0) {
    //     returnSuccessToast();
    //     userStore.setProperty('successMSG', "");
    //   }
    // }, [userStore.successMSG]);
  
    // useEffect(() => {
    //   if(userStore.errorMSG.length > 0) {
    //     returnWarningToast();
    //     userStore.setProperty('errorMSG', "");
    //   } 
    }, [userStore.errorMSG]);

    return(
        <>
            {props.children}
        </>
    );
}

export default observer(ToastStatusMessageWrapper);
