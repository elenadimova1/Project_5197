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

const TaskNote = ({ task }) => {
  const [showActions, setShowActions] = useState(false);

  const { setNotes, taskNotes,setArchivedNotes, setTaskNotes, setDeletedNotes } = useContext(DataContext);

  const archiveNote = (task) => {
    const updatedNotes = taskNotes.filter(data => data.id !== task.id);
    setTaskNotes(updatedNotes);
    setNotes(updatedNotes);
    setArchivedNotes(prevArr => [...prevArr, task]);
}

  const deleteNote = (task) => {
    const updatedNotes = taskNotes.filter(data => data.id !== task.id);
    setTaskNotes(updatedNotes);
    setDeletedNotes(prevArr => [...prevArr, archiveNote]);
}

  return (
    <React.Fragment>
      <TrashCard
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <CardHeader style={{textAlign:"right",padding:"5px 5px 0 0"}} subheader={toCapitalize(task.status)}/>
        <CardContent sx={{ wordWrap: "break-word" }}>
          <Typography>{task.title}</Typography>
          <Typography>{task.text}</Typography>
        </CardContent>
        <CardActions>
        <Tooltip title="Unarchive">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => archiveNote(task)}
                    >
                        <UnarchiveOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => deleteNote(task)}
                    >
                        <DeleteOutlineOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
        </CardActions>
      </TrashCard>
    </React.Fragment>
  );
};

export default TaskNote;
