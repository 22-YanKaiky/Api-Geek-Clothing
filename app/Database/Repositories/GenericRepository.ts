import GuidModel from 'App/Models/Base/GuidModel';
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm';
import IGenericRepository, { BasicModel, CreateModel, EditModel } from './Interfaces/IGenericRepository';
import merge from 'lodash/merge';

function getTypeName(type: typeof GuidModel) {
    function name<T>(type: (new () => T)): string {
        return type.name;
    }

    return name(type);
}

export default abstract class GenericRepository<T extends GuidModel> implements IGenericRepository<T>  {

    constructor(
        private type: typeof GuidModel
    ) { }

    async getAll(filterQuery?: (query: ModelQueryBuilderContract<typeof GuidModel, T>) =>
        ModelQueryBuilderContract<typeof GuidModel, T>
    ): Promise<BasicModel<T>[]> {
        let query = this.type.query() as ModelQueryBuilderContract<typeof GuidModel, T>;

        if (filterQuery) {
            query = filterQuery(query);
        }

        const all = await query.exec();

        return all.map(c => c.serialize() as BasicModel<T>);
    }

    async first(
        filterQuery?: (query: ModelQueryBuilderContract<typeof GuidModel, T>) => ModelQueryBuilderContract<typeof GuidModel, T>
    ): Promise<BasicModel<T> | null> {
        let query = this.type.query() as ModelQueryBuilderContract<typeof GuidModel, T>;

        if (filterQuery) {
            query = filterQuery(query);
        }

        const first = await query.first();

        return first?.$attributes as BasicModel<T>;
    }

    async getByGuid(guid: string): Promise<BasicModel<T> | null> {
        return await this.getBy('guid', guid);
    }

    async getBy(key: string, value: unknown): Promise<BasicModel<T> | null> {
        const entry = await this.type.findBy(key, value);

        return entry?.$attributes as BasicModel<T>;
    }

    async insert(entry: CreateModel<T>): Promise<BasicModel<T>> {
        if (entry instanceof this.type) {
            const saved = await entry.save();
            return saved.$attributes as BasicModel<T>;
        }

        let created = new this.type();
        created.merge(entry);

        created = await created.save();

        return created.$attributes as BasicModel<T>;
    }

    async update(entry: EditModel<T>): Promise<BasicModel<T>> {
        if (entry instanceof this.type) {
            const savedEntry = await entry.save();

            return savedEntry.$attributes as BasicModel<T>;
        }

        let savedEntry = await this.type.findBy('guid', entry.guid);

        if (savedEntry == null) {
            throw new Error(`Entity of type "${getTypeName(this.type)}" with guid "${entry.guid}" was not found`);
        }

        savedEntry = merge(savedEntry, entry);

        const updated = await savedEntry?.save();

        return updated?.$attributes as BasicModel<T>;
    }

    async delete(entry: EditModel<T>): Promise<void> {
        if (entry instanceof this.type) {
            entry.delete();
            return;
        }

        const foundEntry = await this.type.find(entry.guid);
        foundEntry?.delete();
    }

    async deleteByGuid(guid: string): Promise<void> {
        const entry = await this.type.findBy('guid', guid);

        entry?.delete();
    }
}
