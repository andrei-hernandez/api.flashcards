import { connect } from 'mongoose';

const mURI: string = 'mongodb+srv://googleClousVPS:huevos2810@cluster0.pvgoq.mongodb.net/flashcard?retryWrites=true&w=majority';

connect(mURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));
