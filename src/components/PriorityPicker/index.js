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
            <li className="flex flex-col gap-y-2">
                <p className="text-sm text-zinc-400">优先级</p>
                <ul className="flex gap-x-3" onClick={handleClick}>
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
