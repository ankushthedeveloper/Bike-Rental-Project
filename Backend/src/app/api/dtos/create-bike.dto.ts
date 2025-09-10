export class CreateBikeDto {
  brand: string;
  model: string;
  year: number;
  price: number;
  distanceTraveled: number;
}

export class CreateBikeServiceDto {
  createBikeDto: CreateBikeDto;
  images: string[];
}
