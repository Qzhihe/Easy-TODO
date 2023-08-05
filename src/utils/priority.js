const priorityMapping = new Map([
    [0, { title: "无优先级", color: "#a3a3a3" }],
    [1, { title: "低优先级", color: "#4772f9" }],
    [2, { title: "中优先级", color: "#ffb000" }],
    [3, { title: "高优先级", color: "#e03130" }],
]);

export function getPriorityProp(priority, prop) {
    if (priorityMapping.has(priority)) {
        return priorityMapping.get(priority)[prop];
    }

    return null;
}
