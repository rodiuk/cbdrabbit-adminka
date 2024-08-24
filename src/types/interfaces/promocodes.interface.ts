export interface ICreatePromoCode {
  code: string;
  iasActive: boolean;
  percentDiscount?: number | null;
  newPrice?: number | null;
}

export interface IUpdatePromoCode {
  code?: string | null;
  iasActive?: boolean | null;
  percentDiscount?: number | null;
  newPrice?: number | null;
}
