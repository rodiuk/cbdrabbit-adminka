import PropTypes from "prop-types";

// material-ui
import Box from "@mui/material/Box";
import MainCard from "../Cards/MainCard";

// project import

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

interface AuthCardWrapperProps {
  children: React.ReactNode;
}

const AuthCardWrapper = ({ children, ...other }: AuthCardWrapperProps) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
      },
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

AuthCardWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthCardWrapper;
