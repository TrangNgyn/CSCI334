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
    ...layerStyles,
  },
  components: {
    Button,
    Text,
  },
};

export default extendTheme(overrides);
