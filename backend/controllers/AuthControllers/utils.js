// utils.js
const generateUniqueUserId = () => {
    // Implement your logic to generate a unique user_id here
    // For simplicity, let's assume you have a counter and format it as UNxxx
    return `UN${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
};

module.exports = {
    generateUniqueUserId
};
