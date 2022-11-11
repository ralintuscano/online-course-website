

```bash
npm install

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community
```

Start the database
```bash
brew services start mongodb-community
```

#### for Development

Start the client
```bash
npm run start:client
```

Start the server
```bash
npm run start:server
```

#### for Production

```bash
npm run build
npm start:server
```

#### Other Commands

```bash
npm start
npm test
npm run lint
npm run lint:fix
npm run test:verbose
npm run test:coverage
npm run test:watch-client
npm run test:watch-server
```

## Code Structure

```
- client
  - api
  - assets
    - images
    - icons
  - components
    - atoms
    - molecules
    - organisms
    - pages
    - environment
  - hooks
  - store
    - actions
    - reducers
    - thunks
    - tests
  - styles
  - utils
- server
  - config
  - database
  - routes
- scripts
```

Component Heirarchy:

Environment > Pages > Organisms > Molecules > Atoms

