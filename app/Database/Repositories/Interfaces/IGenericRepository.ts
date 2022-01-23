import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm';
import GuidModel, { BaseModel } from 'App/Models/Base/GuidModel';

type WithRequired<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

export type BasicModel<T extends GuidModel> = Omit<T, keyof BaseModel>;

export type CreateModel<T extends GuidModel> = Omit<BasicModel<T>, keyof GuidModel>;

type PartialWithGuid<T extends Partial<GuidModel>> = WithRequired<T, 'guid'>;

export type EditModel<T extends GuidModel> = PartialWithGuid<BasicModel<T>>;


interface IGenericRepository<T extends GuidModel> {
  /**
   * Seleciona todos as entidades
   *
   * @returns lista com as entidades
   */
  getAll(): Promise<BasicModel<T>[]>;
  /**
   * Seleciona todos as entidades
   *
   * filterQuery será utilizada para filtrar os resultados
   *
   * @param filterQuery filtro a ser realizado na query
   * @returns lista com as entidades encontradas
   */
  getAll(filterQuery: (query: ModelQueryBuilderContract<typeof GuidModel, T>) =>
    ModelQueryBuilderContract<typeof GuidModel, T>
  ): Promise<BasicModel<T>[]>
  /**
   * Seleciona uma entidade filtrada pelo guid
   * @param guid guid da entidade a ser selecionada
   * @returns a entidade encontrada, ou null caso não seja encontrada
   */
  getByGuid(guid: string): Promise<BasicModel<T> | null>;
  getBy(key: string, value: unknown): Promise<BasicModel<T> | null>
  /**
   * Insere uma entidade no banco de dados
   * @param entry a entidade a ser inserida
   * @returns
   */
  first(filterQuery?: (query: ModelQueryBuilderContract<typeof GuidModel, T>) =>
    ModelQueryBuilderContract<typeof GuidModel, T>
  ): Promise<BasicModel<T> | null>
  insert(entry: CreateModel<T>): Promise<BasicModel<T>>;
  /**
   * Dá update em uma entidade
   * @param entry a entidade com os valores atualizados
   */
  update(entry: EditModel<T>): Promise<BasicModel<T>>;
  /**
   * Deleta uma entidade
   * @param entry A entidade a ser removida
   */
  delete(entry: EditModel<T>): Promise<void>;
  deleteByGuid(guid: string): Promise<void>;
}

export default IGenericRepository;
