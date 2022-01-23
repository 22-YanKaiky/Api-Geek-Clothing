import { DateTime } from 'luxon';
import {
  BaseModel as LucidBaseModel,
  beforeCreate,
  column,
} from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuid } from 'uuid';

export class BaseModel extends LucidBaseModel { }
export default class GuidModel extends BaseModel {
  @column({ isPrimary: true })
  public guid: string;

  @beforeCreate()
  public static async createUUID(group: GuidModel) {
    group.guid = uuid();
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
