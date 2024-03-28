import { GetProp, TreeSelectProps } from "antd";

export const datasource = [
    {
        label: '选项1',
        value: 1,
        children: [
            {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
            },
            {
                title: 'Child Node2',
                value: '0-0-1',
                key: '0-0-1',
            },
            {
                title: 'Child Node3',
                value: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        label: '选项2',
        value: 2,
        children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
            },
        ],
    },
];

export async function fetchLink(linkage: number) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/form/tree-select-linker`, {
      method: 'POST',
      body: JSON.stringify({ linkage }),
      headers: {
          "Content-type": "application/json",
      },
  });

  const data: DefaultOptionType[] = await res.json();
  return data;
}

export async function fetchData(pid: number) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/form/tree-select/${pid}`);
    const data: AsyncOptionTypes = await res.json();

    return data;
}

export type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];
export type AsyncOptionTypes = Omit<DefaultOptionType, 'label'>[];