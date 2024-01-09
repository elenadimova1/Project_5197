import React, { useContext} from "react";
import { DataContext } from "../../Context/DataProvider";
import {
  Box,
  Typography,
  Grid,
  Container,
} from "@mui/material";

import InformationNote from "./informationNote";

const InformationNotes = () => {
  const { informationNotes } = useContext(DataContext);


  return (
    <React.Fragment>
      {informationNotes.length === 0 ? (
        <React.Fragment>
         <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "8rem",
            }}
          >
           
            <Typography
              sx={{ fontSize: "1.375rem" }}
              align="center"
              variant="h6"
              color="#5f6368"
            >
              No notes in Information
            </Typography>
          </Box>
        </React.Fragment>
      ) : (
        <Container maxWidth="lg">

          <Grid spacing={2} container>
            {informationNotes.map((trashNote) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <InformationNote information={trashNote} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
};

export default InformationNotes;
