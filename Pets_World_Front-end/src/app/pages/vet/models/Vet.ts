export interface Vet {
  _id: string;
  cost: number;
  description: string;
  experience: number;
  licence: string;
  numberOfReviews: number;
  totalOfReviews: number;
  user_id: UserDetails;
  userImage: string;
}

export interface UserDetails {
  email: string;
  firstName: string;
  gender: string;
  image: string;
  lastName: string;
  phone: string;
  role: string;
}
