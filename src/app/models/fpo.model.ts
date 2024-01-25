interface POItem {
    item: number;
    poNo: string;
    prNo: string;
    poPath: string;
    prPath: string;
    jobNo: string;
  }
  
  export interface FPOModel {
    docDate: Date;
    statusId: number;
    arrived: Date;
    fpoNo: string;
    pOlist: POItem[];
    buyerId: number;
    supplierId: number;
    paymentTerm: string;
    deliveryTermId: number;
    remarks: string;
  }