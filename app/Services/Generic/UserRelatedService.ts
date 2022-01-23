import GenericRepository from "App/Database/Repositories/GenericRepository";
import GuidModel from "App/Models/Base/GuidModel";

export default class UserRelatedService<T extends GuidModel> {
    constructor(
        private respository: GenericRepository<T>
    ) { }

    async getAllByUser(user_guid: string) {
        return this.respository.getAll(q => q.where('user_guid', user_guid));
    }
}