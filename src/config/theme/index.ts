import { createTheme, ThemeOptions } from "@mui/material/styles";

// assets
import colors from "../../../public/styles/default.module.scss";

// project imports
import themePalette from "./palette";
import themeTypography from "./typography";
import componentStyleOverrides from "./compStyleOverride";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization: any) => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    shapes: {
      default: "12px",
    },
    customization,
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "8px 16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
          padding: "16px",
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions as ThemeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
