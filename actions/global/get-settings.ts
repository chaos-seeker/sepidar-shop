"use server";

import { fetcher } from "@/utils/fetcher";

interface IResponse {
  id: number;
  options: {
    sliders?: Array<{
      title: string;
      address: string;
      category: string;
      img: string;
      status: string;
    }>;
    store: {
      contact: {
        storeAddress1: string;
        storeAddress2: string;
        orderNumber1: string;
        orderNumber2: string;
        supportNumber1: string;
        supportNumber2: string;
      };
      rules: {
        description_meta: string;
        keyword_meta: string;
        description: string;
      };
      about_page: {
        title_top: string;
        title_middle: string;
        description: string;
      };
      main_page: {
        title: string;
        description: string;
        phone: string;
        address: string;
        enstagram: string | null;
        linkdin: string | null;
        telegram: string | null;
        whatsapp: string | null;
      };
      store_online: {
        description: string;
        title: string;
      };
    };
    bannerTop?: Array<{
      priority: number;
      status: string;
      images: string;
      link: string | null;
      title: string;
    }>;
    bannerMiddle?: Array<{
      priority: number;
      status: string;
      images: string;
      link: string | null;
      title: string;
    }>;
    bannerDown?: Array<{
      priority: number;
      status: string;
      images: string;
      link: string | null;
      title: string;
    }>;
    seo: {
      ogImage: any;
      ogTitle: any;
      metaTags: any;
      metaTitle: any;
      canonicalUrl: any;
      ogDescription: any;
      twitterHandle: any;
      metaDescription: any;
      twitterCardType: any;
    };
    logo: string;
    fav_icon?: string;
    useAi: boolean;
    useOtp: boolean;
    currency: string;
    siteLink: string;
    smsEvent: {
      admin: {
        refundOrder: boolean;
        paymentOrder: boolean;
        statusChangeOrder: boolean;
      };
      vendor: {
        refundOrder: boolean;
        paymentOrder: boolean;
        statusChangeOrder: boolean;
      };
      customer: {
        refundOrder: boolean;
        paymentOrder: boolean;
        statusChangeOrder: boolean;
      };
    };
    taxClass: number;
    siteTitle: string;
    emailEvent: {
      admin: {
        refundOrder: boolean;
        paymentOrder: boolean;
        statusChangeOrder: boolean;
      };
      vendor: {
        refundOrder: boolean;
        createReview: boolean;
        paymentOrder: boolean;
        createQuestion: boolean;
        statusChangeOrder: boolean;
      };
      customer: {
        refundOrder: boolean;
        paymentOrder: boolean;
        answerQuestion: boolean;
        statusChangeOrder: boolean;
      };
    };
    promoPopup: {
      image: {
        id: number;
        original: string;
        file_name: string;
        thumbnail: string;
      };
      title: string;
      popUpDelay: number;
      description: string;
      popUpNotShow: {
        title: string;
        popUpExpiredIn: number;
      };
      isPopUpNotShow: boolean;
      popUpExpiredIn: number;
    };
    maintenance: {
      image: {
        id: number;
        original: string;
        file_name: string;
        thumbnail: string;
      };
      start: string;
      title: string;
      until: string;
      description: string;
      aboutUsTitle: string;
      overlayColor: string;
      buttonTitleOne: string;
      buttonTitleTwo: string;
      contactUsTitle: string;
      isOverlayColor: boolean;
      newsLetterTitle: string;
      overlayColorRange: string;
      aboutUsDescription: string;
      newsLetterDescription: string;
    };
    server_info: {
      memory_limit: string;
      post_max_size: number;
      max_input_time: string;
      max_execution_time: string;
      upload_max_filesize: number;
    };
    app_settings: {
      trust: boolean;
      last_checking_time: string;
    };
    collapseLogo: {
      id: number;
      original: string;
      file_name: string;
      thumbnail: string;
    };
    deliveryTime: Array<{
      title: string;
      description: string;
    }>;
    externalLink: string;
    externalText: string;
    freeShipping: boolean;
    isPromoPopUp: boolean;
    reviewSystem: {
      name: string;
      value: string;
    };
    signupPoints: number;
    siteSubtitle: string;
    useGoogleMap: boolean;
    copyrightText: string;
    enableCoupons: boolean;
    guestCheckout: boolean;
    shippingClass: number;
    StripeCardOnly: boolean;
    contactDetails: {
      contact: string;
      socials: {
        instagram: string;
        linkedin: string;
        telegram: string;
        whatsapp: string;
      };
      website: string;
      location: {
        zip: any;
        city: any;
        state: string;
        country: string;
        street_address: any;
        formattedAddress: string;
      };
      emailAddress: string;
    };
    paymentGateway: Array<{
      name: string;
      value: string;
    }>;
    currencyOptions: {
      formation: string;
      fractions: number;
    };
    isProductReview: boolean;
    maxShopDistance: number;
    pushNotification: {
      all: {
        order: boolean;
        message: boolean;
        storeNotice: boolean;
      };
    };
    useEnableGateway: boolean;
    enableReviewPopup: boolean;
    useCashOnDelivery: string;
    freeShippingAmount: any;
    isUnderMaintenance: boolean;
    minimumOrderAmount: number;
    useMustVerifyEmail: boolean;
    maximumQuestionLimit: number;
    currencyToWalletRatio: number;
    enableEmailForDigitalProduct: boolean;
  };
  language: string;
  created_at: string;
  updated_at: string;
  customer_level_type: string;
  customer_leveling_type: string;
  maintenance: {
    start: string;
    until: string;
  };
}

interface IParams {
  query: {
    language: string;
  }
}

export async function getSettings(params: IParams): Promise<IResponse> {
  const res = await fetcher<IResponse>({
    endpoint: "/settings",
    method: "get",
    contentType: "json",
    query: params.query,
  });
  return res.data;
}


