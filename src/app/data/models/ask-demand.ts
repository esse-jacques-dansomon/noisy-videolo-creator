export interface AskDemand {
  sender:                   string;
  receiver:                 string;
  message:                  string;
  delivery_email:           string;
  creator_occasion_type_id: number;
  options:                  number[];
}

export interface PaymentUrl{
  url : string;
}
