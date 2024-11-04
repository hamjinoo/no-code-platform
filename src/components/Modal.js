// Modal.js
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

function Modal({ open, onClose, onConfirm, title, children, confirmText = "확인", cancelText = "취소" }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby="modal-title">
      <DialogTitle id="modal-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
