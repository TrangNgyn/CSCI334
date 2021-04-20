import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundational style overrides
import borders from "./foundations/borders";

// Component style overrides
import Button from "./components/button";
import Text from "./typography/text";

// LayerStyles
import layerStyles from "./layerStyles/layerStyles";

const overrides = {
  styles,
  borders,
  layerStyles: {
    mainBG: {
      bgGradient: "linear(to-br, #8BF3B5, #2FE562, )",
    },
  },
  components: {
    Button,
    Text,
  },
};

export default extendTheme(overrides);
