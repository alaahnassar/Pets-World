export interface Keeper {
  _id: string;
  cost: number;
  description: string;
  experience: number;
  licence: string;
  numberOfReviews: number;
  totalOfReviews: number;
  owner_id: UserDetails;
  userImage: string;
}

export interface UserDetails {
  isKeeper: boolean;
  user_id: any;
  // gender: string;
  // image: string;
  // lastName: string;
  // phone: string;
  // role: string;
}
