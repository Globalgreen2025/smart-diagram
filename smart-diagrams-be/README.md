//Backend Environment Varibles in fie=le .env

DB_CONNECTION_STRING=
JWT_SECRET_KEY=mysecret
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
MISTRAL_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
PORT=8080
WHISPER_API_URL=https://api-inference.huggingface.co/models/openai/whisper-large-v3-turbo

# Add local or server frontend application url
#FRONTEND_BASE_URL=https://mermaid-fe-lilac.vercel.app
FRONTEND_BASE_URL=http://localhost:3000

#Please add postfix (/api/linkedin/callback) after endpoint
REDIRECT_URL=http://localhost:8080/api/linkedin/callback
#REDIRECT_URL=https://mermaid-16xw.onrender.com/api/linkedin/callback
