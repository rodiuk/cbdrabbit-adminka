import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { IOrderForList } from "@/types/interfaces/order.interface";

interface OrderMetaProps {
  order: IOrderForList;
}

export const OrderMeta = (props: OrderMetaProps): React.JSX.Element => {
  const { order } = props;

  return (
    <Accordion
      sx={{
        "&.MuiPaper-root": {
          p: "0px!important",
          backgroundColor: "primary.light",
          borderRadius: "16px!important",
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography fontWeight={600}>Мета дані замовлення</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          pt: "0px!important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            width: "100%",
          }}
        >
          <Typography>
            <strong>Source:</strong> {order.utm_source}
          </Typography>
          <Typography>
            <strong>Medium:</strong> {order.utm_medium}
          </Typography>
          <Typography>
            <strong>Campaign:</strong> {order.utm_campaign}
          </Typography>
          <Typography>
            <strong>Content:</strong> {order.utm_content}
          </Typography>
          <Typography>
            <strong>Term:</strong> {order.utm_term}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
