document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    let fileId = params.get('file_id'); // Capture 'file_id' from URL parameters
    let redirectUri = params.get('redirect_uri'); // Capture 'redirect_uri' from URL parameters

    // Display URL parameters, excluding 'redirect_uri'
    params.forEach((value, key) => {
        if (key !== 'redirect_uri') {
        createParameterElement(key, value);
        }

        if (key === 'auth_code') {
            // Initiate token exchange if 'auth_code' is present
            exchangeAuthCodeForToken(value)
                .then(token => {
                    createParameterElement("access_token", token);
                    sessionStorage.setItem('accessToken', token); // Store token for future use
                })
                .catch(error => {
                    console.error("Error exchanging auth code for token: ", error);
                });
        }
    });

    // Attach event listener to the rename button
    document.getElementById('renameFileBtn').addEventListener('click', function() {
        const newName = document.getElementById('newFileName').value;
        const fileExtension = params.get('file_extension'); // Assuming 'file_extension' is passed as a URL parameter
        const fullName = `${newName}.${fileExtension}`; // Construct full file name with extension
        const accessToken = sessionStorage.getItem('accessToken'); // Retrieve the access token from sessionStorage
    
        if (newName && fileId && accessToken) {
            renameFile(accessToken, fileId, fullName)
                .then(() => {
                    if (redirectUri) {
                        // Construct the redirect URI with the token and success message
                        const redirectUrl = `${redirectUri}${accessToken}&status=success&message=Your%20action%20was%20successful%2E`;
                        window.opener.location.href = redirectUrl;
                    } else {
                        createParameterElement("Message", "Success. Please close and reload the Box window.");
                    }
                    //remove token from session
                    sessionStorage.removeItem('accessToken');
                })
                .catch(error => {
                    //remove token from session
                    sessionStorage.removeItem('accessToken');
                    console.error("Error renaming file: ", error);
                    // Construct the redirect URI with the token and error message
                    const redirectUrl = `${redirectUri}${accessToken}&status=failure&message=Your%20action%20was%20unsuccessful%2E`;
                    window.location.href = redirectUrl;
                });
        }
    });    
});

function createParameterElement(key, value) {
    const parametersContainer = document.getElementById('parameters'); // Ensure this element exists in your HTML
    const paramElement = document.createElement("div");
    paramElement.classList.add("parameter");

    const keyElement = document.createElement("span");
    keyElement.classList.add("parameter-key");
    keyElement.textContent = `${key}: `;

    const valueElement = document.createElement("span");
    valueElement.classList.add("parameter-value");
    valueElement.textContent = value;

    paramElement.appendChild(keyElement);
    paramElement.appendChild(valueElement);
    parametersContainer.appendChild(paramElement);
}

function exchangeAuthCodeForToken(authCode) {
    return fetch(`/api/exchange?auth_code=${authCode}`)
        .then(response => response.json())
        .then(data => {
            if (!data.token) {
                throw new Error('Token not received from exchange endpoint');
            }
            return data.token;
        })
        .catch(error => {
            throw new Error(`Failed to exchange auth code for token: ${error}`);
        });
}

function renameFile(token, fileId, newName) {
    return fetch('/api/renameFile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
            fileId: fileId,
            newName: newName
        })
    }).then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                const errorMessage = `Box Error - Status: ${errorData.status}, Code: ${errorData.code}, Message: ${errorData.message}`;
                console.error(errorMessage);
                throw new Error(errorMessage);
            });
        }
        return response.json();
    });
}
