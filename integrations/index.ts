export class BaseCrudService<T> {
async list() { return { items: [] as T[] }; }
async get() { return null as T | null; }
async create(data: any) { return data as T; }
async update(id: string, data: any) { return data as T; }
async delete() { return true; }
}

export * from './members';
export * from './cms';
