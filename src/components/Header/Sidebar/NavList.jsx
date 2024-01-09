import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { LightbulbOutlined, ArchiveOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    sideBarActive: {
        backgroundColor: '#feefc3',
        borderBottomRightRadius: '50px',
        borderTopRightRadius: '50px',
        color: '#000',
    },
    '&:hover': {
        backgroundColor: '#f0f0f0',
        borderBottomRightRadius: '50px',
        borderTopRightRadius: '50px',
    }
})

const NavList = ({ open, setOpen }) => {

    const classes = useStyles();

    const location = useLocation();
    const navigate = useNavigate();

    const sidebarLinks = [
        {
            id: 1,
            label: 'Notes',
            icon: <LightbulbOutlined />,
            link: '/'
        },
        {
            id: 2,
            label: 'Archive',
            icon: <ArchiveOutlined />,
            link: '/archive'
        },
        {
            id: 3,
            label: 'Trash',
            icon: <DeleteOutlineOutlined />,
            link: '/trash'
        },
        {
            id: 4,
            label: 'Waiting',
            icon: <PendingOutlinedIcon />,
            link: '/waiting'
        },
        {
            id: 5,
            label: 'Task',
            icon: <BookmarkAddedOutlinedIcon />,
            link: '/task'
        },
        {
            id: 6,
            label: 'Memo',
            icon: <BookmarkAddedOutlinedIcon />,
            link: '/memo'
        },
        {
            id: 7,
            label: 'Information',
            icon: <BookmarkAddedOutlinedIcon />,
            link: '/information'
        },
        {
            id: 8,
            label: 'Completed',
            icon: <BookmarkAddedOutlinedIcon />,
            link: '/completed'
        },
    ];

    const handleDrawer = () => {
        setOpen(true);
    }

    return (
        <List>
            {sidebarLinks.map((list) => (
                <ListItem key={list.id} disablePadding sx={{ display: 'block' }}
                    className={location.pathname === list.link ? classes.sideBarActive : ''}
                    onClick={() => {
                        navigate(list.link);
                    }}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={handleDrawer}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                            className={location.pathname === list.link ? classes.sideBarActiveIcon : null}
                        >
                            {list.icon}
                        </ListItemIcon>
                        <ListItemText className={location.pathname === list.label ? classes.sideBarActive : null} primary={list.label} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default NavList;