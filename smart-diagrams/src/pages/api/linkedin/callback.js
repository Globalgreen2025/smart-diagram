// // // // pages/api/linkedin/callback.js
// // // export default async function handler(req, res) {
// // //   console.log('LinkedIn callback initiated');
  
// // //   try {
// // //     const { code } = req.query;
// // //     console.log('Received code from LinkedIn:', code);

// // //     if (!code) {
// // //       console.error('No authorization code received');
// // //       return res.redirect('/login?error=no_code');
// // //     }

// // //     // Forward to your Express backend
// // //     const backendUrl = `https://smart-diagrams-be.onrender.com/api/linkedin/callback?code=${code}`;
// // //     console.log('Forwarding to backend URL:', backendUrl);

// // //     const backendResponse = await fetch(backendUrl, {
// // //       method: 'GET',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //       },
// // //     });

// // //     console.log('Backend response status:', backendResponse.status);

// // //     if (!backendResponse.ok) {
// // //       const errorText = await backendResponse.text();
// // //       console.error('Backend error:', errorText);
// // //       throw new Error(`Backend responded with ${backendResponse.status}`);
// // //     }

// // //     const responseData = await backendResponse.json();
// // //     const { token, redirectTo } = responseData;
    
// // //     console.log('Received token from backend');

// // //     // Store token and redirect
// // //     res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax`);
// // //     const url = "https://smart-diagram.vercel.app"
    
// // //     // Redirect to frontend with token
// // //     return res.redirect(`${url}${redirectTo}?token=${token}`);
    
// // //   } catch (error) {
// // //     console.error('Full callback error:', error);
// // //     return res.redirect('/login?error=auth_failed');
// // //   }
// // // }
// // // pages/api/linkedin/callback.js
// // export default async function handler(req, res) {
// //   console.log('=== LINKEDIN CALLBACK STARTED ===');
// //   console.log('Query parameters:', req.query);

// //   try {
// //     const { code, error, error_description } = req.query;
    
// //     if (error) {
// //       console.error('LinkedIn returned error:', error, error_description);
// //       return res.redirect('/?error=auth_failed&message=' + encodeURIComponent(error_description));
// //     }

// //     if (!code) {
// //       console.error('No authorization code received from LinkedIn');
// //       return res.redirect('/?error=no_code');
// //     }

// //     console.log('Received code from LinkedIn:', code);
// //     console.log('Calling backend with code...');

// //     // Call your Express backend with the code parameter
// //     const backendUrl = `https://smart-diagrams-be.onrender.com/api/linkedin/callback?code=${encodeURIComponent(code)}`;
// //     console.log('Backend URL:', backendUrl);

// //     const backendResponse = await fetch(backendUrl, {
// //       method: 'GET',
// //       headers: {
// //         'Accept': 'application/json',
// //         'Content-Type': 'application/json',
// //       },
// //     });

// //     console.log('Backend response status:', backendResponse.status);

// //     if (!backendResponse.ok) {
// //       const errorText = await backendResponse.text();
// //       console.error('Backend error response:', errorText);
// //       return res.redirect('/?error=backend_error&status=' + backendResponse.status);
// //     }

// //     const responseData = await backendResponse.json();
// //     console.log('Backend response data:', responseData);

// //     const { token } = responseData;
    
// //     if (!token) {
// //       console.error('No token received from backend');
// //       return res.redirect('/?error=no_token');
// //     }

// //     // Set HTTP-only cookie
// //     res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`);
    
// //     console.log('Redirecting to dashboard with token');
// //     return res.redirect('https://smart-diagrams.vercel.app/dashboard');
    
// //   } catch (error) {
// //     console.error('Unexpected error in callback:', error);
// //     return res.redirect('/?error=unexpected_error');
// //   }
// // }
// // pages/api/linkedin/callback.js

export default async function handler(req, res) {
  console.log('=== LINKEDIN CALLBACK STARTED ===');
  console.log('Full URL:', req.url);
  console.log('Query parameters:', req.query);
  console.log('Method:', req.method);

  try {
    const { code, error, error_description } = req.query;
    
    if (error) {
      console.error('LinkedIn returned error:', error, error_description);
      return res.redirect('/?error=auth_failed&message=' + encodeURIComponent(error_description || error));
    }

    if (!code) {
      console.error('No authorization code received from LinkedIn');
      console.error('Full query object:', req.query);
      return res.redirect('/?error=no_code');
    }

    console.log('Received code from LinkedIn:', code);
    console.log('Calling backend with code...');

    // Properly encode the code and call backend
    const backendUrl = `https://smart-diagrams-be.onrender.com/api/linkedin/callback?code=${encodeURIComponent(code)}`;
    console.log('Backend URL:', backendUrl);

    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('Backend error response:', errorText);
      return res.redirect('/?error=backend_error&status=' + backendResponse.status);
    }

    const responseData = await backendResponse.json();
    console.log('Backend response data:', responseData);

    const { token } = responseData;
    
    if (!token) {
      console.error('No token received from backend');
      return res.redirect('/?error=no_token');
    }

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`);
    
    console.log('Redirecting to dashboard with token');
    return res.redirect('https://smart-diagram-three.vercel.app/dashboard');
    
  } catch (error) {
    console.error('Unexpected error in callback:', error);
    return res.redirect('/?error=unexpected_error');
  }
}