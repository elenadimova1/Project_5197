import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from './components/Header/Sidebar/Sidebar';
import Notes from './components/Notes/Notes';
import Archive from './components/Archive/Archives';
import Trash from './components/Trash/TrashNotes';
import CompleteNotes from './components/completed/completeNotes';
import WaitingNotes from './components/waiting/waitingNotes';
import TaskNotes from './components/task/taskNotes';
import InformationNotes from './components/information/informationNotes';
import MemoNotes from './components/memo/memoNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function App() {
  return (
    <Box style={{ display: 'flex', width: '100%' }}>
      <Router>
        <Header />
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ p: 3, width: '100%' }}>
            <DrawerHeader />
            <Routes>
              <Route path="/" element={<Notes />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/trash" element={<Trash />} />
              <Route path='/waiting' element={<WaitingNotes />}/>
              <Route path='/task' element={<TaskNotes />}/>
              <Route path='/memo' element={<MemoNotes />}/>
              <Route path='/information' element={<InformationNotes />}/>
              <Route path='/completed' element={<CompleteNotes />}/>
            </Routes>
          </Box>
        </Box>
      </Router>
    </Box>
  );
}

export default App;