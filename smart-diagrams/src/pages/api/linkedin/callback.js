// pages/api/linkedin/callback.js
export default async function handler(req, res) {
  console.log('=== LINKEDIN CALLBACK STARTED ===');
  
  try {
    const { code, error } = req.query;
    
    if (error) {
      return res.redirect('/?error=auth_failed');
    }

    if (!code) {
      return res.redirect('/?error=no_code');
    }

    // Call your backend
    const backendUrl = `https://smart-diagram.onrender.com/api/linkedin/callback?code=${encodeURIComponent(code)}`;
    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!backendResponse.ok) {
      return res.redirect('/?error=backend_error');
    }

    const responseData = await backendResponse.json();
    const { token } = responseData;
    
    if (!token) {
      return res.redirect('/?error=no_token');
    }

    // Set HTTP-only cookie for automatic authentication
    res.setHeader('Set-Cookie', 
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Domain=.vercel.app`
    );
    
    // Also store token in sessionStorage as fallback
    const redirectHtml = `
      <html>
        <head>
          <script>
            sessionStorage.setItem('token', '${token}');
            window.location.href = 'https://smart-diagram-three.vercel.app/dashboard';
          </script>
        </head>
        <body>Redirecting...</body>
      </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    return res.send(redirectHtml);
    
  } catch (error) {
    console.error('Callback error:', error);
    return res.redirect('/?error=unexpected_error');
  }
}