const Button = {
  baseStyle: {
    borderRadius: "md",
    border: "none",
    shadow: "base",
    width: "100%",
    py: "26px",
    textTransform: "uppercase",
    _hover: {
      cursor: "pointer",
      opacity: ".8",
    },
  },
  sizes: {},
  variants: {
    green: {
      bg: "#47cf6d",
      color: "white",
    },
    gray: {
      bg: "#dadada",
      color: "gray.600",
    },
    orange: {
      bg: "#ef8421",
      color: "white",
    },
    red: {
      bg: "#ea525b",
      color: "white",
    },
  },
};

export default Button;
