"use client";

import { useState, useRef, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// third-party

// project imports
import MainCard from "@/components/Cards/MainCard";
import Transitions from "@/components/Wrappers/Transitions";
import { Logout, Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme() as any;
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef<any>(null);
  const handleLogout = async () => {
    signOut();
  };

  const handleClose = (e: any) => {
    if (anchorRef.current && anchorRef.current?.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event: any, index: number, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      router.push(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={""}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <Settings
            sx={{
              fontSize: "1.5rem",
            }}
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            in={open}
            {...TransitionProps}
            type="grow"
            position="bottom-right"
            direction="down"
          >
            <Paper
              sx={{
                borderRadius: "12px",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                  sx={{
                    borderRadius: "12px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ p: 2, pb: 0 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4" fontWeight={500}>
                          Привіт👋,{" "}
                        </Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 700 }}
                        >
                          {user?.name}
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          display: "flex",
                          my: 1,
                        }}
                      >
                        <Chip label={user?.role} size="small" color="primary" />
                      </Box>
                    </Stack>

                    <Divider />
                  </Box>
                  <Box
                    style={{
                      height: "100%",
                      maxHeight: "calc(100vh - 250px)",
                      overflowX: "hidden",
                    }}
                  >
                    <Box sx={{ p: 2, pt: 0 }}>
                      {/* <Card
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          my: 2,
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid item>
                              <Grid
                                item
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    Start DND Mode
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    color="primary"
                                    checked={sdm}
                                    onChange={(e) => setSdm(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid
                                item
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    Allow Notifications
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    checked={notification}
                                    onChange={(e) =>
                                      setNotification(e.target.checked)
                                    }
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Divider /> */}
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5,
                          },
                        }}
                      >
                        <ListItemButton
                          selected={selectedIndex === 0}
                          onClick={(event) =>
                            handleListItemClick(event, 0, "/settings")
                          }
                          sx={{
                            borderRadius: "8px",
                          }}
                        >
                          <ListItemIcon>
                            <Settings
                              sx={{
                                fontSize: "1.3rem",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                Налаштування
                              </Typography>
                            }
                          />
                        </ListItemButton>

                        <ListItemButton
                          selected={selectedIndex === 2}
                          onClick={handleLogout}
                          sx={{
                            borderRadius: "8px",
                          }}
                        >
                          <ListItemIcon>
                            <Logout
                              sx={{
                                fontSize: "1.3rem",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Вийти</Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
