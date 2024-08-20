import Link from "next/link";
import { useAtom } from "jotai";
import ButtonBase from "@mui/material/ButtonBase";
import { Theme, useMediaQuery } from "@mui/material";
import { leftDrawerOpenedAtom } from "@/libs/atoms/app.atoms";

const LogoSection = () => {
  const isUpSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const [, setState] = useAtom(leftDrawerOpenedAtom);

  return (
    <ButtonBase
      disableRipple
      onClick={() => {
        if (!isUpSm) {
          setState(true);
        }
      }}
      component={Link}
      href={"/dashboard"}
      sx={{
        fontSize: "1.3rem",
        fontWeight: "700",
        color: "secondary.main",
      }}
    >
      CBD Rabbit
    </ButtonBase>
  );
};

export default LogoSection;
