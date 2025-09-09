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

    const backendUrl = `https://smart-diagram.onrender.com/api/linkedin/callback?code=${code}`;
    console.log('Forwarding to backend URL:', backendUrl);

    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('Backend error:', errorText);
      throw new Error(`Backend responded with ${backendResponse.status}`);
    }

    const responseData = await backendResponse.json();
    const { token } = responseData;
    
    console.log('Received token from backend');

    // Set both HTTP-only cookie AND store in sessionStorage for frontend access
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`);
    
    // Redirect to dashboard with token in URL as fallback
    return res.redirect(`https://smart-diagram-three.vercel.app/dashboard?token=${token}`);
    
  } catch (error) {
    console.error('Full callback error:', error);
    return res.redirect('/login?error=auth_failed');
  }
}