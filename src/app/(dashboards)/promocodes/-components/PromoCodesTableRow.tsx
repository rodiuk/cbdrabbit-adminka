import React from "react";
import {
  Chip,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Promocode } from "@prisma/client";
import PopConfirm from "@/features/PopConfirm";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { PromoCodeActions } from "./PromoCodeActions";

interface PromoCodesTableRowProps {
  promocodes: Promocode;
}

export const PromoCodesTableRow = (
  props: PromoCodesTableRowProps
): React.JSX.Element => {
  const { promocodes } = props;

  const theme = useTheme() as any;

  return (
    <TableRow hover>
      <TableCell>
        <Typography variant="subtitle1" component="div">
          {promocodes.code}
        </Typography>
      </TableCell>
      <TableCell>
        {!!promocodes.percentDiscount && (
          <Chip color="secondary" variant="outlined" label="Відсоток знижки" />
        )}
        {!!promocodes.newPrice && (
          <Chip color="primary" variant="outlined" label="Фіксована сума" />
        )}
      </TableCell>
      <TableCell>
        {promocodes.iasActive && (
          <Chip
            label="Active"
            size="small"
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? theme.palette.dark.main
                  : theme.palette.success.light + 90,
              color: theme.palette.success.dark,
            }}
          />
        )}
        {!promocodes.iasActive && (
          <Chip
            label="Disabled"
            size="small"
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? theme.palette.dark.main
                  : theme.palette.orange.light + 80,
              color: theme.palette.orange.dark,
            }}
          />
        )}
      </TableCell>

      <TableCell align="center" sx={{ pr: 3 }}>
        <PromoCodeActions promoCode={promocodes} />
      </TableCell>
    </TableRow>
  );
};
