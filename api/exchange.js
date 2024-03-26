// Import the 'axios' library
const axios = require('axios');
const querystring = require('querystring');

module.exports = async (req, res) => {
    const { auth_code } = req.query;

    // Define the URL for the Box OAuth2 token endpoint
    const authenticationUrl = "https://api.box.com/oauth2/token";

    // Prepare the data for the POST request
    const postData = querystring.stringify({
        grant_type: "authorization_code",
        code: auth_code,  // Use the 'auth_code' from the query parameter
        client_id: process.env.CLIENT_ID,  // Use the 'CLIENT_ID' environment variable
        client_secret: process.env.CLIENT_SECRET,  // Use the 'CLIENT_SECRET' environment variable
    });

    try {
        // Make a POST request using 'axios'
        let response = await axios.post(authenticationUrl, postData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // If the request is successful, respond with the obtained access token
        res.status(200).json({ token: response.data.access_token });
    } catch (error) {
        console.error('Error exchanging auth code for token:', error);

        // Respond with the error status and message if the request fails
        res.status(error.response ? error.response.status : 500).json({
            error: error.response ? error.response.data : "Server error",
        });
    }
};