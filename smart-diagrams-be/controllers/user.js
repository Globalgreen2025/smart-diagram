// const User = require("../models/user");
// const jwt = require("jsonwebtoken");
// const fetch = require("node-fetch");
// const { generateToken } = require("../auth/jwt");

// // Function to exchange authorization code for an access token from LinkedIn
// // const getAccessToken = async (code) => {
// //     const body = new URLSearchParams({
// //         grant_type: "authorization_code",
// //         code: code,
// //         client_id: process.env.LINKEDIN_CLIENT_ID,
// //         client_secret: process.env.LINKEDIN_CLIENT_SECRET,
// //         redirect_uri: "https://smart-diagram.onrender.com/api/linkedin/callback",
// //     });

// //     // Sending a POST request to LinkedIn OAuth endpoint
// //     const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
// //         method: "POST",
// //         headers: {
// //             "Content-type": "application/x-www-form-urlencoded",
// //         },
// //         body: body.toString(),
// //     });

// //     // If the request fails, throw an error
// //     if (!response.ok) {
// //         throw new Error(response.statusText);
// //     }

// //     // Return the access token response as JSON
// //     return await response.json();
// // };

// const getAccessToken = async (code) => {
//     const body = new URLSearchParams({
//         grant_type: "authorization_code",
//         code: code,
//         client_id: process.env.LINKEDIN_CLIENT_ID,
//         client_secret: process.env.LINKEDIN_CLIENT_SECRET,
//         redirect_uri: "https://smart-diagram-three.vercel.app/api/linkedin/callback", // Must match frontend
//     });

//     const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: body.toString(),
//     });

//     if (!response.ok) {
//         const errorText = await response.text();
//         console.error('LinkedIn token error:', errorText);
//         throw new Error(`LinkedIn token request failed: ${response.status}`);
//     }

//     return await response.json();
// };

// const linkedInCallback = async (req, res) => {
//     try {
//         const { code } = req.body; // Now getting code from body
        
//         if (!code) {
//             return res.status(400).json({
//                 success: false,
//                 error: "No authorization code provided",
//             });
//         }

//         console.log('Processing code:', code);
        
//         const accessTokenData = await getAccessToken(code);
        
//         if (!accessTokenData.access_token) {
//             return res.status(400).json({
//                 success: false,
//                 error: "No access token received from LinkedIn",
//             });
//         }

//         const userData = await getUserData(accessTokenData.access_token);
        
//         if (!userData || !userData.email) {
//             return res.status(500).json({
//                 success: false,
//                 error: "Unable to fetch user data from LinkedIn",
//             });
//         }

//         let user = await User.findOne({ email: userData.email });

//         if (!user) {
//             user = new User({
//                 name: userData.name,
//                 email: userData.email,
//                 avatar: userData?.picture,
//             });
//             await user.save();
//         }

//         const token = generateToken({ 
//             id: user._id,
//             name: user.name, 
//             email: user.email, 
//             avatar: user.avatar 
//         });

//         // Return token in response instead of redirecting
//         res.status(200).json({
//             success: true,
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 avatar: user.avatar
//             }
//         });

//     } catch (error) {
//         console.error('LinkedIn callback error:', error);
//         res.status(500).json({
//             success: false,
//             error: error.message || "Internal server error",
//         });
//     }
// };

// // Function to fetch user data from LinkedIn using the access token
// const getUserData = async (accessToken) => {
//     const response = await fetch("https://api.linkedin.com/v2/userinfo", {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });

//     // If fetching user data fails, throw an error
//     if (!response.ok) {
//         throw new Error(response.statusText);
//     }

//     // Return the user data as JSON
//     return await response.json();
// };

// // LinkedIn OAuth callback function
// // const linkedInCallback = async (req, res) => {
// //     try {
// //         const { code } = req.query; // Extract authorization code from query parameters
// //         const accessToken = await getAccessToken(code); // Get access token using the code

// //         // Fetch user data from LinkedIn
// //         const userData = await getUserData(accessToken.access_token);
// //         if (!userData) {
// //             return res.status(500).json({
// //                 success: false,
// //                 error: "Unable to fetch user data",
// //             });
// //         }

// //         // Check if the user already exists in the database
// //         let user = await User.findOne({ email: userData.email });

// //         // If user does not exist, create a new user
// //         if (!user) {
// //             user = new User({
// //                 name: userData.name,
// //                 email: userData.email,
// //                 avatar: userData?.picture, // Optional chaining to prevent errors if picture is undefined
// //             });
// //             await user.save(); // Save the new user to the database
// //         }

// //         // Generate a JWT token for the authenticated user
// //         const token = generateToken({ name: user.name, email: user.email, avatar: user.avatar });

// //         // Set the token as an HTTP-only cookie
// //         res.cookie("token", token, {
// //             httpOnly: false, // Should ideally be true for better security
// //             secure: true, // Ensure secure transmission over HTTPS
// //             sameSite: "None", // Allow cross-site requests
// //         });

// //         // Redirect the user to the frontend dashboard with the token in the URL
// //         res.redirect(`https://smart-diagram-three.vercel.app/dashboard?token=${token}`);
// //     } catch (error) {
// //         // Handle any errors and send a response
// //         res.status(500).json({
// //             success: false,
// //             error: error.message,
// //         });
// //     }
// // };

// // Function to get user data from the stored JWT token
// const getUser = async (req, res) => {
//     const token = req.cookies.token; // Retrieve token from cookies

//     // If no token is found, return a 403 (Forbidden) response
//     if (!token) {
//         return res.status(403).json({
//             success: false,
//             message: "No token provided",
//         });
//     }

//     try {
//         // Verify the JWT token
//         const user = jwt.verify(token, process.env.JWT_SECRET);

//         // Return the user details
//         res.status(200).json({
//             success: true,
//             user,
//         });
//     } catch (error) {
//         // Handle invalid token errors
//         res.status(403).json({
//             success: false,
//             message: "Invalid token",
//         });
//     }
// };

// // Export the functions for use in other parts of the application
// module.exports = {
//     linkedInCallback,
//     getUser,
// };
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { generateToken } = require("../auth/jwt");

const getAccessToken = async (code) => {
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: "https://smart-diagram.onrender.com/api/linkedin/callback", // Must match LinkedIn app config
    });

    const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('LinkedIn token error:', errorText);
        throw new Error(`LinkedIn token request failed: ${response.status}`);
    }

    return await response.json();
};

const getUserData = async (accessToken) => {
    const response = await fetch("https://api.linkedin.com/v2/userinfo", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('LinkedIn user data error:', errorText);
        throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    return await response.json();
};

const linkedInCallback = async (req, res) => {
    try {
        const { code } = req.query; // Get code from query params
        
        if (!code) {
            return res.status(400).json({
                success: false,
                error: "No authorization code provided",
            });
        }

        console.log('Processing LinkedIn code:', code);
        
        // Exchange code for access token
        const accessTokenData = await getAccessToken(code);
        
        if (!accessTokenData.access_token) {
            return res.status(400).json({
                success: false,
                error: "No access token received from LinkedIn",
            });
        }

        // Get user data from LinkedIn
        const userData = await getUserData(accessTokenData.access_token);
        
        if (!userData || !userData.email) {
            return res.status(500).json({
                success: false,
                error: "Unable to fetch user data from LinkedIn",
            });
        }

        // Find or create user
        let user = await User.findOne({ email: userData.email });

        if (!user) {
            user = new User({
                name: userData.name,
                email: userData.email,
                avatar: userData?.picture,
            });
            await user.save();
        }

        // Generate JWT token
        const token = generateToken({ 
            id: user._id,
            name: user.name, 
            email: user.email, 
            avatar: user.avatar 
        });

        // Set HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Redirect to frontend with token in URL (for fallback)
        res.redirect(`https://smart-diagram-three.vercel.app/dashboard?token=${token}`);

    } catch (error) {
        console.error('LinkedIn callback error:', error);
        // Redirect to login page with error
        res.redirect('https://smart-diagram-three.vercel.app/login?error=auth_failed');
    }
};

const getUser = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "No token provided",
        });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            message: "Invalid token",
        });
    }
};

module.exports = {
    linkedInCallback,
    getUser,
};