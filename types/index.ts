export const ELECTRICITY_RATE = 8; // ₹8 per unit
export const FIXED_CHARGE = 250; // ₹250 fixed charge

export interface FloorReading {
  id: string;
  name: string;
  reading: number;
}

export interface BillCalculation {
  floorId: string;
  floorName: string;
  reading: number;
  billAmount: number;
  remainingBill: number;
}
