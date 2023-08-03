import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Define types for form data
interface FormData {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body as FormData;

    try {
      // TODO: Replace this with your actual Django backend URL and endpoint for user login
      const response = await axios.post('http://your-django-backend-url/api/login', {
        email,
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
