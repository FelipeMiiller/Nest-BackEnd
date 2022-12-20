import { User } from 'firebase/auth';

export interface AuthRespDto {
  data?: UserData;
  error?: string;
}

interface UserData {
  user: User;
}
