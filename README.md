# bonfire

Discord clone project

## Features

- Real-time text chatting
- Direct messaging
- Voice chat and channels
- Discord "Servers" including
  - settings
  - channels
  - users
  - roles (and admins)
  - invite links
- Personal profile and settings
- Similar UI

## Development

- React used to make frontend
- ExpressJS used to make REST API
- PostgreSQL database hosted on Neon.tech used to store data
- JWT used to generate and verify secure web token for session management and API authentication
- Passport.js handles authentication flow, with bcrypt used to hash user passwords
- socket.io used to make WebSockets (for Real-time chatting)
- Agora used to handle voice chat
