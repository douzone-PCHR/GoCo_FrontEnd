import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export const MainButtonStyles1 = {
  color: '#00AAFF',
  fontSize: '180%',
  fontWeight: 'bold',
};
export const MainButtonStyles2 = {
  color: 'gray',
  fontSize: '100%',
};

export const BoardTitleStyles = { width: '10%', fontWeight: 'bold', fontSize: '100%' };

export const WriteButtonStyles = {
  fontSize: 'medium',
  color: 'black',
  '&:hover': {
    fontWeight: 'bold',
  },
};

export const ClickBoard = {
  '&:hover': {
    backgroundColor: 'rgb(205, 234, 241)',
    cursor: 'pointer',
  },
};

export const BoardTypeStyle = {
  margin: '6% 0',
  fontWeight: 'bold',
  fontSize: '290%',
  textAlign: 'center',
};

export const BoardButtonStyle = {
  backgroundColor: '#64a1bd',
  '&:hover': {
    backgroundColor: '#267194',
  },
  width: '50%',
};
export const BoardCommentDeleteButton = {
  backgroundColor: '#64a1bd',
  '&:hover': {
    backgroundColor: '#267194',
  },
  padding: '0px',
  marginLeft: '1%',
};

export const BoardCommentUpdateButton = {
  backgroundColor: '#64a1bd',
  '&:hover': {
    backgroundColor: '#267194',
  },
  padding: '0px',
};

export const BoardCommentButton = {
  margin: '0 35%',
  backgroundColor: '#64a1bd',
  '&:hover': {
    backgroundColor: '#267194',
  },
  width: '50%',
  height: '100%',
};
