import foodImage from "../../assets/food.jpg";

const layerStyles = {
  mainBG: {
    bgGradient: "linear(to-br, #8BF3B5, #2FE562)",
  },
  grayBG: {
    bg: "#EFEFEF",
  },
  function: {
    bg: "#efefef",
  },
  foodBG: {
    backgroundImage: `url(${foodImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  accordButton: {
    bg: "white",
    border: "none",
    paddingTop: "3",
    paddingBottom: "3",
    marginBottom: "3",
    borderRadius: "xl",
    shadow: "base",
  },
  statItem: {
    px: "4",
    mx: "4",
    marginBottom: "2",
    bg: "#fdfdfd",
    borderRadius: "xl",
    color: "gray.500",
  },
};

export default layerStyles;
