import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Button,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import pciNpcSealImg from '../../../assets/pci-npc-seal.png';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.darker,
  color: theme.palette.common.white,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  height: '100%',
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Magra, serif',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(1),
  fontWeight: 600,
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Open Sans, sans-serif',
  color: theme.palette.font.white60,
  marginBottom: theme.spacing(0.5),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  fontFamily: 'Open Sans, sans-serif',
  color: theme.palette.font.white60,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.common.white,
    textDecoration: 'none',
  },
  whiteSpace: 'nowrap',
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.primary.dark}`,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  textAlign: 'center',
  marginTop: theme.spacing(5),
  width: '100%',
}));

const FooterBottomText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Open Sans, sans-serif',
  color: theme.palette.font.white60,
  margin: 0,
}));

const LoginButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Open Sans, sans-serif',
  marginTop: theme.spacing(1.5),
  width: '100%',
  maxWidth: '300px',
  whiteSpace: 'normal',
  height: 'auto',
  textAlign: 'center',
  overflowWrap: 'anywhere',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const SealContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  },
}));

const LandingFooter: React.FC = () => {
    return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={4} 
            sx={{
            mb: 3,
            justifyContent: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
          }} 
          alignItems="stretch"
        >
          {/* COLPUNO Section */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
              <FooterTitle variant="h6">COLPUNO</FooterTitle>
              <FooterText variant="body2" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                Empowering Filipino Nurses:
                <br />
                The first and only digital career companion designed to help Filipino nurses grow their careers locally and globally.
              </FooterText>
              <Link
                href="https://www.colpuno.com/login"
                target="_blank"
                rel="noopener"
                sx={{ textDecoration: 'none' }}
              >
                <LoginButton
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Click here to LOGIN to your COLPUNO account
                </LoginButton>
              </Link>
            </FooterSection>
          </Grid>

          {/* Privacy Seal Section */}
          <Grid item xs={12} sm={6} md={2} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <SealContainer>
              <Link
                href={typeof pciNpcSealImg === 'string' ? pciNpcSealImg : (pciNpcSealImg as any).src}
                target="_blank"
                rel="noopener"
                aria-label="View privacy seal (PCI NPC)"
              >
                <Box
                  component="img"
                  src={typeof pciNpcSealImg === 'string' ? pciNpcSealImg : (pciNpcSealImg as any).src}
                  alt="Privacy Seal (PCI NPC)"
                  sx={{
                    width: 84,
                    height: 140,
                    display: 'block',
                  }}
                />
              </Link>
            </SealContainer>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
              <FooterTitle variant="h6">Contact</FooterTitle>
              <FooterText variant="body2">
                Email: <Link href="mailto:info@colpuno.com" sx={{ color: 'inherit', textDecoration: 'none' }}>info@colpuno.com</Link>
              </FooterText>
              <FooterText variant="body2">
                Phone: <Link href="tel:+41412440707" sx={{ color: 'inherit', textDecoration: 'none' }}>+41 41 244 07 07</Link>
              </FooterText>
            </FooterSection>
          </Grid>

          {/* Social & Legal Section */}
          <Grid item xs={12} sm={6} md={4}>
            <FooterSection sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
              <FooterTitle variant="h6">Follow Us</FooterTitle>
            <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                    }}
                >
                <FooterLink
                  href="https://www.facebook.com/profile.php?id=61572945996479"
                  target="_blank"
                  rel="noopener"
                >
                  Facebook
                </FooterLink>
                <FooterLink
                  href="https://www.instagram.com/growwithcolpuno"
                  target="_blank"
                  rel="noopener"
                >
                  Instagram
                </FooterLink>
                <FooterLink
                  href="https://www.tiktok.com/@colpuno"
                  target="_blank"
                  rel="noopener"
                >
                  TikTok
                </FooterLink>
              </Box>

              <FooterTitle variant="h6" sx={{ mt: 2 }}>
                More about COLPUNO
              </FooterTitle>
              <Box
                        sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                        }}
                    >
                <FooterLink
                  href="https://www.colpuno.com/faq"
                  target="_blank"
                  rel="noopener"
                >
                  FAQ
                </FooterLink>
                <FooterLink
                  href="https://www.colpuno.com/terms-and-conditions"
                  target="_blank"
                  rel="noopener"
                >
                  Terms & Conditions
                </FooterLink>
                <FooterLink
                  href="https://www.colpuno.com/privacy-notice"
                  target="_blank"
                  rel="noopener"
                        >
                            Privacy Notice
                </FooterLink>
                <FooterLink
                  href="https://www.colpuno.com/disclaimer"
                  target="_blank"
                  rel="noopener"
                        >
                            Disclaimer
                </FooterLink>
                <FooterLink
                  href="https://www.colpuno.com/imprint"
                  target="_blank"
                  rel="noopener"
                        >
                            Imprint
                </FooterLink>
            </Box>
            </FooterSection>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <FooterBottom>
          <FooterBottomText variant="body2">
            &copy; 2025 Pro-Care International AG
          </FooterBottomText>
        </FooterBottom>
      </Container>
    </StyledFooter>
    );
};

export default LandingFooter;
