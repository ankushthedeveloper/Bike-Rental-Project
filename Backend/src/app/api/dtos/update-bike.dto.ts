export class UpdateBikeDto {
  brand?: string;
  model?: string;
  year?: number | '';
  distanceTraveled?: number | '';
  rentPerDay?: number | '';
  noOfBikes?: number | '';
  images?: string[];
}
