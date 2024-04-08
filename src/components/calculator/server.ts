export const countValue = (items: ProjectsItem[]) => items.reduce((total, item) => total + item.total, 0);