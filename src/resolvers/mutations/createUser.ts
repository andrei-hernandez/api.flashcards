import { User, UserMDB } from '../../models/user';

export const insertUser = async (NewItemUser: User): Promise<void> => {
  console.log('el usuario se está insertando');
  const newUser = new UserMDB({
    userName: NewItemUser.userName,
    email: NewItemUser.email,
    password: NewItemUser.password
  });
  await newUser.save(function (err) {
    if (err) return console.log(err);
    // saved!
  });
}

