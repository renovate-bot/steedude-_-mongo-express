/* eslint-disable no-undef */
db.createUser({
    user: 'admin',
    pwd: 'asdf',
    roles: [
      {
        role: 'readWrite',
        db: 'devDatabase'
      }
    ]
})