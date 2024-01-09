import React, { useState, useRef, useContext } from "react";
import {
  Box,
  Container as MuiContainer,
  ClickAwayListener,
  TextField,
  Fab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
import { DataContext } from "../../Context/DataProvider";
import { Add } from "@mui/icons-material";
import "./index.css";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: "#e0e0e0";
  margin: auto;
  margin-bottom: 2rem;
  min-height: 30px;
  position: relative;
`;

const AddButton = styled(Fab)`
  position: absolute;
  right: 18px;
  bottom: -18px;
  background: #f5ba13;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
  &:hover {
    background: #f5ba13;
  }
`;

const note = {
  id: "",
  title: "",
  text: "",
  status: "started",
};

const statusOptions = [
  { id: "1", name: "Waiting", value: "waiting" },
  { id: "2", name: "Started", value: "started" },
  { id: "3", name: "Completed", value: "completed" },
  { id: "5", name: "Task", value: "task" },
  { id: "6", name: "Memo", value: "memo" },
  { id: "7", name: "Information", value: "information" },
];

const Form = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [addNote, setAddNote] = useState({ ...note, id: uuid() });
  const { setNotes } = useContext(DataContext);
  const containerRef = useRef();

  const onTextChange = (e) => {
    let changedNote = { ...addNote, [e.target.name]: e.target.value };
    setAddNote(changedNote);
  };

  const onStatusChange = (e) => {
    let changedNote = { ...addNote, status: e.target.value };
    setAddNote(changedNote);
  };

  const onSaveClick = () => {
    setShowTextField(false);
    containerRef.current.style.minHeight = "30px";
    setAddNote({ ...note, id: uuid(), status: "2" });
    if (addNote.title || addNote.text) {
      setNotes((prevArr) => [addNote, ...prevArr]);
    }
  };
  
  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowTextField(false);
        containerRef.current.style.minHeight = "30px";
        setAddNote({ ...note, id: uuid() });
        if (addNote.title || addNote.text) {
          setNotes((prevArr) => [addNote, ...prevArr]);
        }
      }}
    >
      <MuiContainer maxWidth="sm">
        <Container ref={containerRef}>
          {showTextField && (
            <>
              <TextField
                size="small"
                placeholder="Title"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{ marginBottom: 10, width: "100%" }}
                onChange={(e) => onTextChange(e)}
                name="title"
                value={addNote.title}
              />
              <label style={{
                position: "absolute",
                right: "15px",
              }} for="mySelect">Status</label>
              <select
                id="mySelect"
                className="selectBox"
                placeholder="Status"
                style={{
                  width: 'auto',
                  height: 40,
                  marginTop:"5px",
                  border: "transparent",
                  color: "#000",
                  position: "absolute",
                  right: "0",
                  background: "transparent",
                }}
                onChange={(e) => onStatusChange(e)}
                value={addNote.status}
                defaultValue={"started"}
              >
                {statusOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <TextField
            multiline
            placeholder="Take a note..."
            variant="standard"
            InputProps={{ disableUnderline: true }}
            onClick={() => {
              setShowTextField(true);
              containerRef.current.style.minHeight = "70px";
            }}
            onChange={(e) => onTextChange(e)}
            name="text"
            value={addNote.text}
          />

          <AddButton onClick={onSaveClick}>
            <Add />
          </AddButton>
        </Container>
      </MuiContainer>
    </ClickAwayListener>
  );
};

export default Form;
