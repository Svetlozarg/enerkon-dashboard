import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function generate(element: React.ReactElement) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default function DocumentsList() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginTop: '2rem'
            }}
          >
            <TextField
              style={{ width: '100%' }}
              variant="outlined"
              placeholder="Търси файл по име..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          <Demo>
            <List sx={{ height: '400px', overflow: 'auto', mt: '1rem' }}>
              {generate(
                <ListItem
                  secondaryAction={
                    <Tooltip title="Изтрий">
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <InsertDriveFileIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Име на файл" secondary="PDF" />
                </ListItem>
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
