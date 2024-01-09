import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [notes, setNotes] = useState(() => {
        const storedNotes = localStorage.getItem("notes");
        return storedNotes ? JSON.parse(storedNotes) : [];
    });
    const [archivedNotes, setArchivedNotes] = useState(() => {
        const storedArchivedNotes = localStorage.getItem("archivedNotes");
        return storedArchivedNotes ? JSON.parse(storedArchivedNotes) : [];
    });
    const [deletedNotes, setDeletedNotes] = useState(() => {
        const storedDeletedNotes = localStorage.getItem("deletedNotes");
        return storedDeletedNotes ? JSON.parse(storedDeletedNotes) : [];
    });

    const [completedNotes, setCompletedNotes] = useState(() => {
        const filteredNotes = notes.filter((note) => note.status === 'completed');
        return filteredNotes || [];
      });
    
    useEffect(() => {
        setCompletedNotes(notes.filter((note) => note.status === 'completed'));
    },[notes]);

    //task
    const [taskNotes, setTaskNotes] = useState(() => {
        const filteredNotes = notes.filter((note) => note.status === 'task');
        return filteredNotes || [];
      });
    
    useEffect(() => {
        setTaskNotes(notes.filter((note) => note.status === 'task'));
    },[notes]);

    //waiting
    const [waitingNotes, setWaitingNotes] = useState(() => {
        const filteredNotes = notes.filter((note) => note.status === 'waiting');
        return filteredNotes || [];
      });
    
    useEffect(() => {
        setWaitingNotes(notes.filter((note) => note.status === 'waiting'));
    },[notes]);

    //information
    const [informationNotes, setInformationNotes] = useState(() => {
        const filteredNotes = notes.filter((note) => note.status === 'information');
        return filteredNotes || [];
      });
    
    useEffect(() => {
        setInformationNotes(notes.filter((note) => note.status === 'information'));
    },[notes]);

    //memo
    const [memoNotes, setMemoNotes] = useState(() => {
        const filteredNotes = notes.filter((note) => note.status === 'memo');
        return filteredNotes || [];
      });
    
    useEffect(() => {
        setMemoNotes(notes.filter((note) => note.status === 'memo'));
    },[notes]);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
    }, [archivedNotes]);

    useEffect(() => {
        localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
    }, [deletedNotes]);

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            archivedNotes,
            setArchivedNotes,
            deletedNotes,
            setDeletedNotes,
            completedNotes,
            setCompletedNotes,
            waitingNotes,
            setWaitingNotes,
            taskNotes,
            setTaskNotes,
            informationNotes,
            setInformationNotes,
            memoNotes,
            setMemoNotes
        }}>
            {children}
        </DataContext.Provider>
    )
};

export default DataProvider;