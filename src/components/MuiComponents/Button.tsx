import { Button as MUIButton, useTheme } from '@mui/material';

interface ButtonProps {
  icon?: React.ReactElement<any, any>;
  text: string;
  type?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, type, onClick }) => {
  const theme = useTheme();

  return (
    <MUIButton
      sx={{
        fontSize: '1rem',
        bgcolor:
          type === 'success'
            ? theme.palette.success.main
            : type === 'error'
            ? theme.palette.error.main
            : theme.palette.primary.main,
        '&:hover': {
          bgcolor:
            type === 'success'
              ? theme.palette.success.dark
              : type === 'error'
              ? theme.palette.error.dark
              : theme.palette.primary.dark
        }
      }}
      variant="contained"
      onClick={onClick ? onClick : undefined}
    >
      {icon && <>{icon} </>}
      {text}
    </MUIButton>
  );
};

export default Button;
