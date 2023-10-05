const errorCode = {
  // errorCode為1000的時候，通常都會有message，message為後端回傳的錯誤訊息
  1001: 'missing information',
  1002: 'password and confirmPassword are not the same',
  1003: 'Duplicate username',
  1004: 'Incorrect username or password',
  1005: 'missing token',
  1006: 'User does not exist',
  1007: 'Token is expired',
  1008: 'Unauthorized'
}

console.log(errorCode)