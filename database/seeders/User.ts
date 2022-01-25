import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name: 'Yan Kaiky',
        last_name: 'Augusto dos Santos',
        cpf_cnpj: '134.245.519-37',
        email: 'yankaikys@gmail.com',
        password: 'Kaiky792293821',
        date_of_birth: '2002-12-22',
        image_url: 'https://github.com/22-YanKaiky.png',
        phone: '(47) 99955-6723',
        gender: 'Masculino'
      },
    ])
  }

}
