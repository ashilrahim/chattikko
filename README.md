
## Real-Time Messaging App

A real-time messaging application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO. This app allows users to sign up, log in, and communicate in real time with others in private chats.

### Features:

- Authentication: Secure user signup and login using JWT (JSON Web Token).

- Real-Time Messaging: Instant communication powered by Socket.IO.

- User Management: Users can view and update their profiles.

- Responsive Design: Fully responsive UI for seamless use across devices.

- Persistent Data: Chat history stored in MongoDB.

## Tech Stack

### Frontend

- React.js

- Tailwind CSS (for styling)

- Axios (for API requests)

- Socket.IO Client

### Backend

- Node.js

- Express.js

- Socket.IO

- MongoDB (with Mongoose for database management)

- bcrypt.js (for password hashing)

- JWT (for authentication)

- dotenv (for environment variable management)

### User Authentication:

- Users sign up or log in.

- Authentication is handled using JWT.

- Real-Time Communication:

- Upon login, users are connected to the Socket.IO server.

- Messages are transmitted in real time between users.

### Data Storage:

- User and message data are stored in MongoDB.

- Chats are persisted and available even after a page refresh.
## Getting Started
### To run this project locally, follow these steps:

#### 1.Clone the Repository

```
  git clone <repository-url>t
  cd Chattikko
```
#### 2.Install Dependencies
For the server:
```
 cd backend
 npm install 
```
For the frontend:
```
 cd frontend
 npm install
```
#### 3.Run the Application

Start the server:

```
 cd backend
 npm run dev
```

Start the client:
```
 cd frontend
 npm run dev
```

####  5.Access the Application Open your browser and go to http://localhost:5173 to view your blog website.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`=5000

`MONGO_URI`=<your-mongodb-uri>

`JWT_SECRET`=<your-jwt-secret>

`CLOUDINARY_NAME` = <your-CLOUDINARY_NAME>

`CLOUDINARY_API_KEY` = <your-CLOUDINARY_API_KEY>

`CLOUDINARY_API_SECRET` = <your-CLOUDINARY_API_SECRET>

`NODE_ENV` = development
