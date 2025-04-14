import { apiInstance } from "./apiInstance";

export interface ShipResponse {
  success: boolean;
  timestamp: string;
  data: {
    shipId: number;
    shipName: string;
    shipNumber: string;
    departurePort: string;
    restroomType: string;
    loungeArea: boolean;
    kitchenFacility: boolean;
    fishingChair: boolean;
    passengerInsurance: boolean;
    fishingGearRental: boolean;
    mealProvided: boolean;
    parkingAvailable: boolean;
  }[];
}

export interface RegisterShipResponse {
  subject: string;
  content: string;
  price: number;
  location: string;
  startTime: string;
  endTime: string;
  maxGuestCount: number;
  shipId: number;
  fileIdList: number[];
  fishIdList: number[];
  unavailableDates?: string[];
}

export interface RegisterShipRequest {
  success: boolean;
  timestamp: string;
}

export const getShip = async () => {
  try {
    const response = await apiInstance.get<ShipResponse>("/ship");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerShip = async (ship: RegisterShipResponse) => {
  try {
    const response = await apiInstance.post("/ship-fishing-posts", ship);
    return response.data;
  } catch (error) {
    throw error;
  }
};
