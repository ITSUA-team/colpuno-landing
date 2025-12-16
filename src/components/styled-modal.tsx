import { Box, IconButton, Modal } from '@mui/material';
import { motion } from 'framer-motion';

import { IconCrossSmall } from '../assets';

const StyledModal = ({
    open,
    onClose,
    children,
    style,
    smallHeightModal = false,
    overflowY = 'auto',
    noCloseIcon,
    widthVideoXs = '92%',
}: {
    open: any;
    onClose: any;
    children: any;
    style?: any;
    smallHeightModal?: boolean;
    overflowY?: 'auto' | 'scroll' | 'hidden' | 'none';
    noCloseIcon?: boolean;
    widthVideoXs?: string;
}) => (
        <Modal
        sx={{
            overflowY,
            display: 'flex',
            alignItems: { xs: !smallHeightModal ? 'center' : 'flex-end', md: 'center' },
            justifyContent: 'center',
            zIndex: 1300,
            '& .MuiBackdrop-root': {
                overflowY: 'auto',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(15,23,42,0.5)',
            },
        }}
        open={!!open}
        onClose={(event, reason) => {
            if (style?.forceModal || style?.isThirdPartyTocModal) {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
            }
            onClose(event, reason);
        }}
    >
        <motion.div 
            key={open} 
            initial={{ y: 100, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 100, opacity: 0 }}
            transition={{ stiffness: 300, damping: 10 }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    width: { xs: widthVideoXs, md: '770px' },
                    p: { xs: '30px 10px 10px', sm: '20px', md: '64px' },
                    margin: { xs: '0px auto 0', md: '0px auto' },
                    maxHeight: { xs: 'calc(100vh - 20px)', md: 'calc(100vh - 40px)' },
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    position: 'relative',
                    ...style,
                }}
            >
                {!noCloseIcon && (
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: { xs: '10px', md: '20px' },
                            right: { xs: '10px', md: '20px' },
                            zIndex: 10,
                        }}
                        onClick={onClose}
                    >
                        <IconCrossSmall black />
                    </IconButton>
                )}
                {children}
            </Box>
        </motion.div>
    </Modal>
);

export default StyledModal;

