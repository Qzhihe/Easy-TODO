import { Menu } from "@mui/material";

import PriorityRadio from "./PriorityRadio";

const PriorityPicker = (props) => {
    const { value, onPriorityChange, ...others } = props;

    function isItActive(priority) {
        return value.priority === priority;
    }

    function handleClick(ev) {
        const priority = parseInt(ev.target.getAttribute("data-priority"));
        onPriorityChange(priority);
    }

    return (
        <Menu
            MenuListProps={{
                disablePadding: true,
                sx: {
                    padding: "1rem",
                },
            }}
            {...others}
        >
            <li
                style={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    gap: "0.5rem 0",
                }}
            >
                <p
                    style={{
                        fontSize: "0.8rem",
                        color: "rgba(0, 0, 0, 0.3)",
                    }}
                >
                    优先级
                </p>
                <ul
                    onClick={handleClick}
                    style={{
                        display: "flex",
                        gap: "0 0.75rem",
                    }}
                >
                    <PriorityRadio priority={3} active={isItActive(3)} />
                    <PriorityRadio priority={2} active={isItActive(2)} />
                    <PriorityRadio priority={1} active={isItActive(1)} />
                    <PriorityRadio priority={0} active={isItActive(0)} />
                </ul>
            </li>
        </Menu>
    );
};

export default PriorityPicker;
