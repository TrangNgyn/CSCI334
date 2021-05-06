import foodImage from "../../assets/food.jpg";

const layerStyles = {
  mainBG: {
    bgGradient: "linear(to-br, #8BF3B5, #2FE562, )",
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
};

export default layerStyles;
