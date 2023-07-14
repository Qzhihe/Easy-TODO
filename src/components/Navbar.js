import { Fragment } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavItem from './NavItem';

import {
    faBars
} from '@fortawesome/free-solid-svg-icons';

import {
    faSun
} from '@fortawesome/free-regular-svg-icons';

import {
    Box,
    List,
    IconButton
} from '@mui/material';

const Navbar = (props) => {

    return (
        <Fragment>
            <StyledBox id='navbar'>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                }}>
                    <IconButton ><FontAwesomeIcon icon={faBars} /></IconButton>
                </Box>
                <List>
                    <NavItem icon={faSun} title='我的一天'></NavItem>
                </List>
            </StyledBox>
        </Fragment>
    );
};

export default Navbar;

const StyledBox = styled(Box)`
    & {
        display: flex;
        flex-flow: column nowrap;

        width: 20rem;
        height: 100%;

        box-shadow: 1px 0 4px rgba(0, 0, 0, .1);
        background-color: rgb(255, 255, 255);

        & > div {
            height: 6rem;
        }
    }

    .menu__item {
        height: 3rem;

        padding: 0 24px;
    }
`;