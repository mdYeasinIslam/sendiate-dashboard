
export type VehicleRate = {
  id: string
  vehicleType: string
  baseFare: {
    min: number
    max: number
  }
  perKmRate: {
    min: number
    max: number
  }
}