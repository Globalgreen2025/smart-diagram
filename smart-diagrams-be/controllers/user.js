const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { generateToken } = require("../auth/jwt");

// Function to exchange authorization code for an access token from LinkedIn
const getAccessToken = async (code) => {
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: "https://smart-diagram.onrender.com/api/linkedin/callback",
    });

    // Sending a POST request to LinkedIn OAuth endpoint
    const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
    });

    // If the request fails, throw an error
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    // Return the access token response as JSON
    return await response.json();
};

// Function to fetch user data from LinkedIn using the access token
const getUserData = async (accessToken) => {
    const response = await fetch("https://api.linkedin.com/v2/userinfo", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    // If fetching user data fails, throw an error
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    // Return the user data as JSON
    return await response.json();
};

// LinkedIn OAuth callback function
const linkedInCallback = async (req, res) => {
    try {
        const { code } = req.query;
        
        if (!code) {
            return res.status(400).json({
                success: false,
                error: "No authorization code provided",
            });
        }

        const accessToken = await getAccessToken(code);
        const userData = await getUserData(accessToken.access_token);
        
        if (!userData) {
            return res.status(500).json({
                success: false,
                error: "Unable to fetch user data",
            });
        }

        let user = await User.findOne({ email: userData.email });
        
        if (!user) {
            user = new User({
                name: userData.name,
                email: userData.email,
                avatar: userData?.picture,
            });
            await user.save();
        }

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
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Return JSON response (not redirect)
        res.status(200).json({
            success: true,
            token, // Also return token for frontend to store in sessionStorage
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
        res.redirect('https://smart-diagram-three.vercel.app/dashboard');
        
    } catch (error) {
        console.error('Callback error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// Function to get user data from the stored JWT token
const getUser = async (req, res) => {
    const token = req.cookies.token; // Retrieve token from cookies

    // If no token is found, return a 403 (Forbidden) response
    if (!token) {
        return res.status(403).json({
            success: false,
            message: "No token provided",
        });
    }

    try {
        // Verify the JWT token
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // Return the user details
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        // Handle invalid token errors
        res.status(403).json({
            success: false,
            message: "Invalid token",
        });
    }
};

// Export the functions for use in other parts of the application
module.exports = {
    linkedInCallback,
    getUser,
};
