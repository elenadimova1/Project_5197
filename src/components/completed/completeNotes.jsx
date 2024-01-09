import React, { useContext} from "react";
import { DataContext } from "../../Context/DataProvider";
import {
  Box,
  Typography,
  Grid,
  Container,
} from "@mui/material";

import CompleteNote from "./completeNote";

const CompleteNotes = () => {
  const { completedNotes } = useContext(DataContext);


  return (
    <React.Fragment>
      {completedNotes.length === 0 ? (
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
              No notes in Completed
            </Typography>
          </Box>
        </React.Fragment>
      ) : (
        <Container maxWidth="lg">

          <Grid spacing={2} container>
            {completedNotes.map((trashNote) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CompleteNote completed={trashNote} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
};

export default CompleteNotes;
