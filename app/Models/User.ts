import { column } from '@ioc:Adonis/Lucid/Orm'
import { Gender } from 'App/Helpers/Gender'
import { DateTime } from 'luxon'
import GuidModel from './Base/GuidModel'

export default class User extends GuidModel {
  @column()
  public name: string;

  @column()
  public last_name?: string;

  @column()
  public cpf_cnpj: string;

  @column()
  public email: string;
  
  @column()
  public password: string;
  
  @column.date()
  public date_of_birth: DateTime;
  
  @column()
  public image_url?: string;

  @column()
  public phone?: string;

  @column()
  public gender: Gender;
}
