// import mongoose from 'mongoose';

// const connection = {};

// async function dbConnect() {
//   if (connection.isConnected) {
//     return;
//   }

//   try {
//     const db = await mongoose.connect(process.env.MONGO_URI);
//     connection.isConnected = db.connections[0].readyState;
//     console.log('✅ MongoDB connected');
//   } catch (error) {
//     console.error('❌ DB connection failed:', error.message);
//     process.exit(1);
//   }
// }

// export default dbConnect;