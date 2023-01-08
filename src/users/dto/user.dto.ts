export class UserDto {
  _id?: string;
  uidAuth?: string;
  name: string;
  email: string;
  token?: string;
  expire?: Date;
}
