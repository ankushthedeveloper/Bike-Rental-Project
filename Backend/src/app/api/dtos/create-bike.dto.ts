export class CreateBikeDto {
  brand: string;
  model: string;
  year: number;
  distanceTraveled: number;
  rentPerDay: number;
  noOfBikes: number;
}

export class CreateBikeServiceDto {
  createBikeDto: CreateBikeDto;
  images: string[];
}
