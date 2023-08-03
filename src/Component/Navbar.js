import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Header = () => {


  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ ml: 11 }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 0,
                width: "15%",
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Weather App
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
