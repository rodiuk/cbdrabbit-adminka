import React from "react";
import { IOrderFull } from "@/types/interfaces/order.interface";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { CardGiftcard } from "@mui/icons-material";

interface Props {
  order: IOrderFull | null;
}

export const OrderInfoSection = (props: Props) => {
  const { order } = props;

  return (
    <Box
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "primary.light",
      }}
    >
      <List
        sx={{
          "& li": {
            py: 0.7,
          },
        }}
      >
        {order?.orderItems?.map((item) => (
          <ListItem key={item.id}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ListItemAvatar
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <Avatar
                  sx={{ width: "30px", height: "30px" }}
                  src={item.product.images[0].url}
                />
              </ListItemAvatar>
              <Typography sx={{ fontWeight: 700 }}>
                {item.product.productName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: "auto",
                gap: 0.5,
              }}
            >
              <Typography fontWeight={600} sx={{ opacity: 0.7 }}>
                {item.quantity} x{" "}
              </Typography>
              <Typography fontWeight={600} sx={{ color: "primary.dark" }}>
                {order?.itemPrice} ₴
              </Typography>
            </Box>
          </ListItem>
        ))}

        {order?.firstOrder && (
          <ListItem>
            <ListItemAvatar
              sx={{
                minWidth: "fit-content",
              }}
            >
              <CardGiftcard sx={{ fontSize: "30px", color: "primary.dark" }} />
            </ListItemAvatar>
            <Typography
              fontWeight={700}
              sx={{
                ml: 1,
                color: "primary.dark",
              }}
            >
              Подарунок
            </Typography>
            <Typography
              fontWeight={600}
              sx={{ ml: "auto", color: "primary.dark" }}
            >
              Rabbit Classic x 1
            </Typography>
          </ListItem>
        )}
        <ListItem>
          <Box>
            <Typography
              fontWeight={700}
              sx={{
                color: "primary.dark",
                fontSize: "16px",
              }}
            >
              Доставка
            </Typography>
            <Typography
              fontWeight={600}
              sx={{
                color: "primary.dark",
                fontSize: "14px",
              }}
            >
              За тарифами перевізника
            </Typography>
          </Box>
        </ListItem>

        <Divider
          sx={{
            maxWidth: "95%",
            mx: "auto",
            borderColor: "primary.main",
            opacity: 0.5,
            my: 1,
          }}
        />

        <ListItem>
          <Typography
            fontWeight={700}
            sx={{
              color: "primary.dark",
              fontSize: "16px",
            }}
          >
            Загальна сума
          </Typography>
          <Typography
            fontWeight={600}
            sx={{
              color: "primary.dark",
              fontSize: "16px",
              ml: "auto",
            }}
          >
            {order?.totalSum} ₴
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};
