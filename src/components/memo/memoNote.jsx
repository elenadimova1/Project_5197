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

const MemoNote = ({ memo }) => {
  const [showActions, setShowActions] = useState(false);

  const { setNotes, memoNotes,setArchivedNotes, setMemoNotes, setDeletedNotes } = useContext(DataContext);

  const archiveNote = (memo) => {
    const updatedNotes = memoNotes.filter(data => data.id !== memo.id);
    setMemoNotes(updatedNotes);
    setNotes(updatedNotes);
    setArchivedNotes(prevArr => [...prevArr, memo]);
}

  const deleteNote = (memo) => {
    const updatedNotes = memoNotes.filter(data => data.id !== memo.id);
    setMemoNotes(updatedNotes);
    setDeletedNotes(prevArr => [...prevArr, archiveNote]);
}

  return (
    <React.Fragment>
      <TrashCard
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <CardHeader style={{textAlign:"right",padding:"5px 5px 0 0"}} subheader={toCapitalize(memo.status)}/>
        <CardContent sx={{ wordWrap: "break-word" }}>
          <Typography>{memo.title}</Typography>
          <Typography>{memo.text}</Typography>
        </CardContent>
        <CardActions>
        <Tooltip title="Unarchive">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => archiveNote(memo)}
                    >
                        <UnarchiveOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => deleteNote(memo)}
                    >
                        <DeleteOutlineOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
        </CardActions>
      </TrashCard>
    </React.Fragment>
  );
};

export default MemoNote;
