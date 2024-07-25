// netlify/functions/speedtest.js
exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ download_speed: 50, upload_speed: 20, ping: 10 }),
    };
};
  