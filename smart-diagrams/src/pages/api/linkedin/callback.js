// pages/api/linkedin/callback.js
export default async function handler(req, res) {
  console.log('LinkedIn callback initiated');
  
  try {
    const { code } = req.query;
    console.log('Received code from LinkedIn:', code);

    if (!code) {
      console.error('No authorization code received');
      return res.redirect('/login?error=no_code');
    }

    // Forward to your Express backend
    const backendUrl = `https://smart-diagram.onrender.com/api/linkedin/callback?code=${code}`;
    console.log('Forwarding to backend URL:', backendUrl);

    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('Backend error:', errorText);
      throw new Error(`Backend responded with ${backendResponse.status}`);
    }

    const responseData = await backendResponse.json();
    const { token, redirectTo } = responseData;
    
    console.log('Received token from backend');

    // Store token and redirect
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax`);
    const url = "https://smart-diagram-three.vercel.app"
    
    // Redirect to frontend with token
    return res.redirect(`${url}${redirectTo}?token=${token}`);
    
  } catch (error) {
    console.error('Full callback error:', error);
    return res.redirect('/login?error=auth_failed');
  }
}

