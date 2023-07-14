import { Fragment } from 'react';
import styled from 'styled-components';

import Topbar from './Topbar';

const Layout = (props) => {
    const {
        children
    } = props;

    return (
        <Fragment>
            <Wrapper>
                <Topbar></Topbar>

                <MainWrapper>
                    {children}
                </MainWrapper>
            </Wrapper>
        </Fragment>
    );
};

export default Layout;

const Wrapper = styled.div`
    & {
        width: 100%;
        height: 100%;

        background-color: rgb(245, 245, 245);

        overflow: hidden;
    }
`;

const MainWrapper = styled.main`
    & {
        display: flex;
        flex-flow: row nowrap;

        height: calc(100% - 3.5rem);
    }
`;