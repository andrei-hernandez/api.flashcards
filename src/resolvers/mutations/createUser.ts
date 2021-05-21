import { User, UserMDB } from '../../models/user';
import { genSalt, hash } from 'bcrypt';

export const insertUser = async (NewItemUser: User): Promise<void> => {

  const saltRounds = 10;

  await genSalt(saltRounds, (err, salt): void => {
    hash(NewItemUser.password, salt, (err, hash): void => {
      const encPass = hash.toString();

      let newUser = new UserMDB({
        userName: NewItemUser.userName,
        email: NewItemUser.email,
        password: encPass
      });

      newUser.save(function (err) {
        if (err) return console.log(err);
        // saved!
      });
    });
  });
}



