//https://stackoverflow.com/a/67640323/4186708
const generateRandomString = (len, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
    return [...Array(len)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
} 

export { generateRandomString }