import { Stack } from '@mui/material';
import PropTypes from 'prop-types';

interface BaseLayoutProps {
  children?: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Stack height="100%" flex={1}>
      {children}
    </Stack>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
