const dev = process.env.NODE_ENV !== 'production'

console.log('DeV: ', dev);

export const server = dev ? 'http://localhost:3000' : 'http://localhost:3000'

// https://javascript-arcade.netlify.app
