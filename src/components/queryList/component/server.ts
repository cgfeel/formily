export async function getQueryList(value: any): Promise<[]> {
    return await fetch(`${process.env.REACT_APP_API_URL}/form/query-list`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(value),
    }).then(res => res.json());
}