import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Define types for form data
interface FormData {
  email: string;
  username: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body as FormData;

    try {
      // TODO: Add your Django backend URL here
      const response = await axios.post('http://your-django-backend-url/api/signup', {
        email,
        username,
        password,
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        res.status(axiosError.response.status).json(axiosError.response.data);
      } else {
        res.status(500).json({ error: 'Server Error' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
