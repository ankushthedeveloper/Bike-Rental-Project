export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  age: number;
  city: string;
  country: string;
  AuthToken?: string | null;
}
