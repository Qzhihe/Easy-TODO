import { Fragment } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faSun
} from '@fortawesome/free-regular-svg-icons';

const Container = (props) => {
    return (
        <Fragment>
            <Wrapper>
                <section id="info">
                    <div>
                        <FontAwesomeIcon icon={faSun} size="2xl" />
                        <div id="display-mode">我的一天</div>
                    </div>
                    <div id="date">七月 10日 星期一</div>
                </section>
                <section id="todo-box"></section>
                <section id="done-box"></section>
            </Wrapper>
        </Fragment>
    );
};

export default Container;

const Wrapper = styled.div`
    & {
        width: 100%;

        padding: 2rem;
    }

    #info {
        display: flex;
        flex-flow: column nowrap;

        padding: 8px;
    }

    #info > div {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    #display-mode {
        margin-left: 8px;

        font-size: 2rem;
    }

    #date {
        margin-top: 8px;

        font-size: 1rem;
        font-weight: 100;
    }
`;