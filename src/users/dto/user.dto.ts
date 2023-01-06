export class UserDto {
  _id?: string;
  uidAuth?: string;
  name: string;
  email: string;
  status: boolean;
  token?: string;
  expire?: Date;
}
