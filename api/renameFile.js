const axios = require('axios');

module.exports = async (req, res) => {
    const { token, fileId, newName } = req.body;

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const data = {
        name: newName
    };

    try {
        const response = await axios.put(`https://api.box.com/2.0/files/${fileId}`, data, config);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error renaming file:', error.response ? error.response.data : error.message);

        // Box-specific error handling
        if (error.response && error.response.data) {
            const boxError = error.response.data;
            res.status(error.response.status).json({
                status: boxError.status,
                code: boxError.code,
                message: boxError.message,
                help_url: boxError.help_url  // Box sometimes provides a URL for more info
            });
        } else {
            res.status(500).json({ message: "Server error" });
        }
    }
};
