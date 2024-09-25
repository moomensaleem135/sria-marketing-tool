import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as React from 'react';

import { StyledMenuItems } from './Menu.styles';

interface BasicMenuProps {
  buttonTitle: string;
  menuItems: string[];
  onItemClick: (item: string) => void;
}

const BasicMenu: React.FC<BasicMenuProps> = ({ buttonTitle, menuItems, onItemClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (containerRef.current) {
      setAnchorEl(containerRef.current);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item: string) => {
    onItemClick(item);
    handleClose();
  };

  const handleMouseEnter = () => {
    handleOpen();
  };

  // const handleMouseLeave = (e: React.MouseEvent) => {
  //   const target = e.relatedTarget as HTMLElement;
  //   if (containerRef.current && target && !containerRef.current.contains(target)) {
  //     handleClose();
  //   }
  // };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <Button
        id="basic-button"
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        endIcon={<ExpandMoreIcon />}
        style={{
          padding: 0,
          color: '#003165',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        {buttonTitle}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {menuItems.map((item, index) => (
          <StyledMenuItems key={index} onClick={() => handleItemClick(item)}>
            {item}
          </StyledMenuItems>
        ))}
      </Menu>
    </div>
  );
};

export default BasicMenu;
