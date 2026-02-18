export const isKey = <T extends Object>(key: any, data: T): key is keyof T => key in data
export const objectKeys = <T extends object, K = keyof T>(obj: T) => Object.keys(obj) as Array<K>;