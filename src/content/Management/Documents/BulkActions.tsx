// import { useState, useRef } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import DownloadIcon from '@mui/icons-material/Download';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const ButtonSuccess = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.success.dark};
     color: ${theme.palette.success.contrastText};

     &:hover {
        background: ${theme.colors.success.main};
     }
    `
);

function BulkActions() {
  // const [onMenuOpen, menuOpen] = useState<boolean>(false);
  // const moreRef = useRef<HTMLButtonElement | null>(null);

  // const openMenu = (): void => {
  //   menuOpen(true);
  // };

  // const closeMenu = (): void => {
  //   menuOpen(false);
  // };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Групови действия:
          </Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
          >
            Изтрий
          </ButtonError>
          <ButtonSuccess
            sx={{ ml: 1 }}
            startIcon={<DownloadIcon />}
            variant="contained"
          >
            Изтегли
          </ButtonSuccess>
        </Box>
        {/* <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{ ml: 2, p: 1 }}
        >
          <MoreVertTwoToneIcon />
        </IconButton> */}
      </Box>

      {/* <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem button>
            <ListItemText primary="Bulk delete selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk edit selected" />
          </ListItem>
        </List>
      </Menu> */}
    </>
  );
}

export default BulkActions;
