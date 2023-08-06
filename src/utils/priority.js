const priorityMapping = new Map([
    [0, { title: null, color: [162, 162, 162] }],
    [1, { title: "低优先级", color: [71, 114, 249] }],
    [2, { title: "中优先级", color: [255, 176, 0] }],
    [3, { title: "高优先级", color: [224, 49, 48] }],
]);

export function getPriorityProp(priority, prop) {
    if (priorityMapping.has(priority)) {
        return priorityMapping.get(priority)[prop];
    }

    return null;
}
