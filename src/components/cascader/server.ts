export async function fetchData(value: number, name: string) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/form/cascader-linker`, {
    method: "POST",
    body: JSON.stringify({ linkage: value, name }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data: LinkItem[] = await res.json();
  return data;
}

export type LinkItem = {
  label: string;
  value: number;
  isLeaf?: boolean;
};
