import { useToast } from "@chakra-ui/react";

export default function ChakraToastStatus(props) {
    const toast = useToast()
    const status = props.status; // status can be "success", "error", "warning" or "info"
  
    return (
        toast({
            title: props.message,
            status: status,
            duration: 9000,
            isClosable: true,
        })
    );
}
