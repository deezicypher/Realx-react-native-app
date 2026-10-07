
export enum PropertyType{
    HOUSE = "House",
    TOWN_HOUSE = "Town House",
    CONDO = "Condo",
    DUPLEX = "Duplex",
    STUDIO = "Studio",
    VILLA = "Villa",
    APARTMENT = "Apartment",
    OTHER = "Other"
}


export enum FacilitiesType {
    LAUNDRY = "Laundry",
    PARKING = "Parking",
    GYM = "Gym",
    WIFI = "Wifi",
    PET_FRIENDLY = "Pet Friendly"
}

export type Review = {
    id:string;
    name:string;
    avatar:string;
    rating:number;
    review:string;
    createdAt:Date;
    updatedAt:Date;
}

export type PropertyRecord = {
  id: string;

  name: string;

  type: PropertyType;

  description: string;

  address: string;

  price: number;

  area: number;

  bedrooms: number;

  bathrooms: number;

  facilities: FacilitiesType[];

  image: string;

  galleries: string[];

  geolocation: string;

  rating: number;

  reviews: Review[];

  createdAt: Date;

  updatedAt: Date;
};