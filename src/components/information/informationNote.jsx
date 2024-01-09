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

const InformationNote = ({ information }) => {
  const [showActions, setShowActions] = useState(false);

  const { setNotes, informationNotes,setArchivedNotes, setInformationNotes, setDeletedNotes } = useContext(DataContext);

  const archiveNote = (information) => {
    const updatedNotes = informationNotes.filter(data => data.id !== information.id);
    setInformationNotes(updatedNotes);
    setNotes(updatedNotes);
    setArchivedNotes(prevArr => [...prevArr, information]);
}

  const deleteNote = (information) => {
    const updatedNotes = informationNotes.filter(data => data.id !== information.id);
    setInformationNotes(updatedNotes);
    setDeletedNotes(prevArr => [...prevArr, archiveNote]);
}

  return (
    <React.Fragment>
      <TrashCard
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <CardHeader style={{textAlign:"right",padding:"5px 5px 0 0"}} subheader={toCapitalize(information.status)}/>
        <CardContent sx={{ wordWrap: "break-word" }}>
          <Typography>{information.title}</Typography>
          <Typography>{information.text}</Typography>
        </CardContent>
        <CardActions>
        <Tooltip title="Unarchive">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => archiveNote(information)}
                    >
                        <UnarchiveOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => deleteNote(information)}
                    >
                        <DeleteOutlineOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
        </CardActions>
      </TrashCard>
    </React.Fragment>
  );
};

export default InformationNote;
