import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";

const NavItems = [
    {
        id: "0",
        title: "我的一天",
        icon: faSun,
        to: "/views/today",
    },
    {
        id: "1",
        title: "四象限",
        icon: faBorderAll,
        to: "/views/four-quadrant",
    },
];

export default NavItems;

export const getActiveNavId = (routePath) => {
    return NavItems.filter((item) => item.to === routePath)[0]?.id;
};
