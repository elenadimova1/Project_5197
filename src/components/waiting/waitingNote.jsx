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

const WaitingNote = ({ waiting }) => {
  const [showActions, setShowActions] = useState(false);

  const { setNotes, waitingNotes ,setArchivedNotes, setWaitingNotes, setDeletedNotes } = useContext(DataContext);

  const archiveNote = (waiting) => {
    const updatedNotes = waitingNotes.filter(data => data.id !== waiting.id);
    setWaitingNotes(updatedNotes);
    setNotes(updatedNotes);
    setArchivedNotes(prevArr => [...prevArr, waiting]);
}

  const deleteNote = (waiting) => {
    const updatedNotes = waitingNotes.filter(data => data.id !== waiting.id);
    setWaitingNotes(updatedNotes);
    setDeletedNotes(prevArr => [...prevArr, archiveNote]);
}

  return (
    <React.Fragment>
      <TrashCard
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <CardHeader style={{textAlign:"right",padding:"5px 5px 0 0"}} subheader={toCapitalize(waiting.status)}/>
        <CardContent sx={{ wordWrap: "break-word" }}>
          <Typography>{waiting.title}</Typography>
          <Typography>{waiting.text}</Typography>
        </CardContent>
        <CardActions>
        <Tooltip title="Unarchive">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => archiveNote(waiting)}
                    >
                        <UnarchiveOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => deleteNote(waiting)}
                    >
                        <DeleteOutlineOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
        </CardActions>
      </TrashCard>
    </React.Fragment>
  );
};

export default WaitingNote;
