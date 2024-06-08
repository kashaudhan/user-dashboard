interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  teams: string[];
  avatar?: string;
  initials?: string;
}
