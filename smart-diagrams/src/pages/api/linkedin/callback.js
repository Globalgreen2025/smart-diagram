// export default async function handler(req, res) {
//   console.log('LinkedIn callback initiated');
  
//   try {
//     const { code } = req.query;
//     console.log('Received code from LinkedIn:', code);

//     if (!code) {
//       console.error('No authorization code received');
//       return res.redirect('/login?error=no_code');
//     }

//     const backendUrl = `https://smart-diagram.onrender.com/api/linkedin/callback?code=${code}`;
//     console.log('Forwarding to backend URL:', backendUrl);

//     const backendResponse = await fetch(backendUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include' // Important for cookies
//     });

//     console.log('Backend response status:', backendResponse.status);

//     if (!backendResponse.ok) {
//       const errorText = await backendResponse.text();
//       console.error('Backend error:', errorText);
//       throw new Error(`Backend responded with ${backendResponse.status}`);
//     }

//     const responseData = await backendResponse.json();
//     const { token, user } = responseData;
    
//     console.log('Received response from backend:', responseData);

//     if (!token) {
//       throw new Error('No token received from backend');
//     }

//     // Store token in sessionStorage as fallback
//     // The HTTP-only cookie is already set by the backend response
    
//     // Redirect to dashboard
//     return res.redirect('https://smart-diagram-three.vercel.app/dashboard');
    
//   } catch (error) {
//     console.error('Full callback error:', error);
//     return res.redirect('/login?error=auth_failed');
//   }
// }
export default async function handler(req, res) {
  console.log('LinkedIn callback initiated');
  
  try {
    const { code } = req.query;
    console.log('Received code from LinkedIn:', code);

    if (!code) {
      console.error('No authorization code received');
      return res.redirect('/login?error=no_code');
    }

    // Send code to backend for processing
    const backendResponse = await fetch('https://smart-diagram.onrender.com/api/linkedin/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
      credentials: 'include'
    });

    console.log('Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      console.error('Backend error:', errorData);
      throw new Error(`Backend responded with ${backendResponse.status}`);
    }

    const responseData = await backendResponse.json();
    const { token } = responseData;
    
    console.log('Received response from backend:', responseData);

    if (!token) {
      throw new Error('No token received from backend');
    }

    // Store token in sessionStorage
    sessionStorage.setItem('token', token);
    
    // Redirect to dashboard
    return res.redirect('https://smart-diagram-three.vercel.app/dashboard');
    
  } catch (error) {
    console.error('Full callback error:', error);
    return res.redirect('/login?error=auth_failed');
  }
}