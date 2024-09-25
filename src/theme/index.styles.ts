import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__close-button--light {
    color: white;
  }
  .Toastify__toast {
    background-color: ${COLORS.THEME_COLOR};
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }
  .Toastify__toast-body {
    color: white;
  }
  .Toastify__progress-bar {
    background-color: white;
  }

  .Toastify__toast-container {
    // width: 320px;
  }
  .Toastify__toast--default {
    background: #fff;
    color: #aaa;
  }
  .Toastify__toast--info {
    background: ${COLORS.THEME_COLOR};
  }
  .Toastify__toast--success {
    background: ${COLORS.THEME_COLOR};
  }
  .Toastify__toast--warning {
    background: ${COLORS.GREEN_THEME};
  }
  .Toastify__toast--error {
    background: ${COLORS.RED_100};
  }
`;
