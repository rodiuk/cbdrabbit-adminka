"use client";

import AuthCardWrapper from "@/components/Wrappers/AuthCardWrapper";
import AuthWrapper from "@/components/Wrappers/AuthWrapper";
import {
  Divider,
  Grid,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import AuthLogin from "./-components/Authlogin";
import { Suspense } from "react";

export default function SignIn() {
  const downMD = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  return (
    <AuthWrapper>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <Link href="#" aria-label="logo">
                      {/* <Logo /> */}
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={{ xs: "column-reverse", md: "row" }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            component="h2"
                            color="secondary.main"
                            gutterBottom
                            textAlign={"center"}
                            variant={downMD ? "h3" : "h2"}
                          >
                            Привіт👋! Клієнти вже чекають на цукерочки
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Suspense fallback={false}>
                      <AuthLogin />
                    </Suspense>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                    >
                      <Typography
                        component={Link}
                        href="/signUp"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Ще немає акаунту?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
