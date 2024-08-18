import React from "react";

// material-ui
import Collapse from "@mui/material/Collapse";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";
import Zoom from "@mui/material/Zoom";

// ==============================|| TRANSITIONS ||============================== //

interface Props {
  in: boolean;
  children: React.ReactNode;
  type: "grow" | "fade" | "collapse" | "slide" | "zoom";
  position:
    | "top-left"
    | "top-right"
    | "top"
    | "bottom-left"
    | "bottom-right"
    | "bottom";
  direction: "up" | "down" | "left" | "right";
  elevation?: number;
}

const Transitions = React.forwardRef<HTMLDivElement, Props>(
  ({ children, position, type, direction, ...others }, ref) => {
    let positionSX = {
      transformOrigin: "0 0 0",
    };

    switch (position) {
      case "top-right":
        positionSX = {
          transformOrigin: "top right",
        };
        break;
      case "top":
        positionSX = {
          transformOrigin: "top",
        };
        break;
      case "bottom-left":
        positionSX = {
          transformOrigin: "bottom left",
        };
        break;
      case "bottom-right":
        positionSX = {
          transformOrigin: "bottom right",
        };
        break;
      case "bottom":
        positionSX = {
          transformOrigin: "bottom",
        };
        break;
      case "top-left":
      default:
        positionSX = {
          transformOrigin: "0 0 0",
        };
        break;
    }

    return (
      <Box ref={ref}>
        {type === "grow" && (
          <Grow {...others}>
            <Box sx={positionSX}>{children}</Box>
          </Grow>
        )}
        {type === "collapse" && (
          <Collapse {...others}>
            <Box sx={positionSX}>{children}</Box>
          </Collapse>
        )}
        {type === "fade" && (
          <Fade {...others}>
            <Box sx={positionSX}>{children}</Box>
          </Fade>
        )}
        {type === "slide" && (
          <Slide {...others} direction={direction}>
            <Box sx={positionSX}>{children}</Box>
          </Slide>
        )}
        {type === "zoom" && (
          <Zoom {...others}>
            <Box sx={positionSX}>{children}</Box>
          </Zoom>
        )}
      </Box>
    );
  }
);

export default Transitions;
