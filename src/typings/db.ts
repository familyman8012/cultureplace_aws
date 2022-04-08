export interface IProductOrigin {
  curriculum: ICurriculum[];
  _id: string;
  title: string;
  desc: string;
  todo: string;
  people: string;
  peopleshow: boolean;
  imgurl: string;
  location: string;
  meetingcycle: string;
  meetday: string;
  firstmeet: Date;
  body: string;
  genre: string;
  comment: string[];
  price: number;
  saleprice: number;
  quanity: number;
  islive: boolean;
  isvod?: boolean;
  joinMembr: string[];
  favoriteduser: string[];
  review: string[];
}

export interface IProduct extends IProductOrigin {
  creator: {
    name: string;
    email: string;
    phone: number;
  };
}

export interface IProductType2 extends IProductOrigin {
  creator: string;
}

export interface ICurriculum {
  _id: string;
  title: string;
  lessons: ILesson[];
}

export interface ILesson {
  _id: string;
  title: string;
  content: string;
  mediaId: string;
  mediaTime?: number;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductList {
  products: IProduct[];
  productsCount: number;
}

export interface IinfinityProduct {
  pageParams: number[];
  pages: [
    {
      products: IProduct[];
      nextPage: number;
      isLast: boolean;
    }
  ];
}

export interface INotice {
  _id: string;
  category?: string;
  title: string;
  body?: string;
  imgurl?: string;
  summary: string;
  updatedAt: string;
}

export interface IBoard {
  _id: string;
  productId: string;
  parentId: string;
  noticecheck?: boolean;
  title: string;
  body?: string;
  userid: string;
  nickname: string;
  readcount: number;
  commentcount: number;
  createdAt: Date;
}

export interface IBoardList {
  board: IBoard[];
  noticeboard: IBoard[];
  boardCount: number;
}
export interface IMainVis {
  _id: string;
  pclocation: string;
  molocation: string;
  alt: string;
}

export interface ISSR {
  SsrData: {
    products: IProduct[];
    blogData: INotice[];
    noticeData: INotice[];
  };
}

export interface Iinfinity {
  products: IProduct[];
  nextPage: number;
  isLast: boolean;
}

export interface IReview {
  _id: string;
  content: string;
  username: string;
  userid: string;
  product: IProduct;
  title: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IReviewEdit {
  title: string;
  content: string;
  username: string;
  userid: string | undefined;
  product: string;
}

export interface IUser {
  email: string;
  name: string;
  nickname?: string;
  userpwd: string;
  phone: string;
  agegroup: string;
  gender: string;
}

export interface IPayment {
  data: {
    cancelled_price: number;
    cancelled_tax_free: number;
    item_name: string;
    method: string;
    method_name: string;
    name: string;
    order_id: string;
    payment_data: {
      card_auth_no: string;
      card_code: string;
      card_name: string;
      card_no: string;
      card_quota: string;
      g: number;
      n: string;
      o_id: string;
      p: number;
      p_at: Date;
      pg: string;
      pg_a: string;
      pm: string;
      pm_a: string;
      receipt_id: string;
      s: number;
      tid: string;
    };
    pg: string;
    pg_name: string;
    price: number;
    purchased_at: Date;
    receipt_id: string;
    receipt_url: string;
    remain_price: number;
    remain_tax_free: number;
    requested_at: Date;
    status: number;
    status_en: string;
    status_ko: string;
    tax_free: number;
    unit: string;
  };
  userid: string;
}

export interface ICulutreInfo {
  data: {
    elements: {
      elements: {
        elements: {
          type: string;
          name: string;
          elements: [{ type: string; text: string }];
        }[];
      }[];
    }[];
  };
}

// export interface IReviewModal extends IReviewEdit {
//   state: string;
// }

// interface StringOnly {
//   [key: string]: string
// }

export interface IinfinityData {}
