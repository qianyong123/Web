//树形下拉框
export function getTrees(list,parentId) {
    let items= {};
    // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
    for (let i = 0; i < list.length; i++) {
        let key = list[i].parent_id;
        if (items[key]) {
            items[key].push(list[i]);
        } else {
            items[key] = [];
            items[key].push(list[i]);
        }
    }
     return formatTree(items, parentId);
}
function formatTree(items, parentId) {
    let result = [];
    if (!items[parentId]) {
        return result;
    }
    for (let t of items[parentId]) {
        t.children = formatTree(items, t.department_id)
        result.push(t);
    }
    return result;
}