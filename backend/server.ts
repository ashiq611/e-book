import app from './src/app';
import { config } from './src/config/config';
import connectDB from './src/config/db';

const server = async () => {
   
  // connect to db
  await connectDB();
  
  // start server
  const port = config.port || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

server();