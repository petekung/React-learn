import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Home() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [ipAddress, setIpAddress] = React.useState('');


    const Logout = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        setOpen(false);
        localStorage.removeItem('token');
        window.location.assign("/login")
    };




    const url = 'http://localhost:3333'
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.post(url + '/authen', {
        }, {
            headers: {
                'Authorization': ' Bearer ' + token
            }
        }).then(function (response) {
            if (response.data.status != 'Sucess') {
                window.location.assign("/login")
                localStorage.clear()
            }
            if (response.data.status == 'Sucess') {
                let input = {
                    "email": response.data.decoded.email
                }
                const users = 'http://localhost:3333'
                // toast.success('Login Success!', {
                //     position: toast.POSITION.TOP_CENTER,
                //     theme: "colored"
                // });
                axios.post(users + '/users', input, {
                }
                ).then(function (res) {
                    console.log(res.data.users[0].fname);
                    setName(res.data.users[0].fname)
                }).catch(function (error) {
                    console.log(error)
                });

            }

        })
            .catch(function (error) {
                console.log(error)
            });

    }, [])
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3333/get',
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data.address));
            setIpAddress(response.data.address)
        })
        .catch((error) => {
            console.log(error);
        });
    return (
        <><Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Welcom ,   {name}
                    </Typography>
                    <Button color="inherit" onClick={Logout} variant="contained" color='error' >Logout</Button>
                </Toolbar>
            </AppBar>
            <ToastContainer />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Your IP Address {ipAddress}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>

                    </Grid>
                </Container>
            </main>

        </Box>





            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure you want to Logout?"}</DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} variant="contained">Cancel</Button>
                    <Button onClick={handleLogout} variant="contained" color='error'>Logout</Button>
                </DialogActions>
            </Dialog>
        </>



    )
}

export default Home
