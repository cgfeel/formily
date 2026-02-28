import { FieldDataSource } from "@formily/core";

// 文档中通过 setTimeout 模拟网络延迟，这里通过 mockjs 的 delay 实现
export async function fetchData(value: string, callback: (data: FieldDataSource) => void) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/form/select-search?${value}`);
  const { result }: SearchResult = await res.json();

  const data: FieldDataSource = [];
  result.forEach(([label, value]) => data.push({ label, value }));

  callback(data);
}

export async function fetchLink(linkage: number) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/form/select-linker`, {
    method: "POST",
    body: JSON.stringify({ linkage }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data: LinkItem[] = await res.json();
  return data;
}

type LinkItem = Record<"label" | "value", string>;

type SearchItem = [string, number];
type SearchResult = {
  result: SearchItem[];
};
