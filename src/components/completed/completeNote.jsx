import React, { useState, useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  CardHeader,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataContext } from "../../Context/DataProvider";
import { toCapitalize } from "../../utils/utils";
import { UnarchiveOutlined, DeleteOutlineOutlined } from '@mui/icons-material';

const TrashCard = styled(Card)`
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const CompleteNote = ({ completed }) => {
  const [showActions, setShowActions] = useState(false);

  const { setNotes, completedNotes,setArchivedNotes, setCompletedNotes, setDeletedNotes } = useContext(DataContext);

  const archiveNote = (completed) => {
    const updatedNotes = completedNotes.filter(data => data.id !== completed.id);
    setCompletedNotes(updatedNotes);
    setNotes(updatedNotes);
    setArchivedNotes(prevArr => [...prevArr, completed]);
}

  const deleteNote = (completed) => {
    const updatedNotes = completedNotes.filter(data => data.id !== completed.id);
    setCompletedNotes(updatedNotes);
    setDeletedNotes(prevArr => [...prevArr, archiveNote]);
}

  return (
    <React.Fragment>
      <TrashCard
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <CardHeader style={{textAlign:"right",padding:"5px 5px 0 0"}} subheader={toCapitalize(completed.status)}/>
        <CardContent sx={{ wordWrap: "break-word" }}>
          <Typography>{completed.title}</Typography>
          <Typography>{completed.text}</Typography>
        </CardContent>
        <CardActions>
        <Tooltip title="Unarchive">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => archiveNote(completed)}
                    >
                        <UnarchiveOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => deleteNote(completed)}
                    >
                        <DeleteOutlineOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
        </CardActions>
      </TrashCard>
    </React.Fragment>
  );
};

export default CompleteNote;
