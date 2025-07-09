export interface ParamsProps {
  params: { slug: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface ResponseError {
  success: boolean;
  message: string;
  errorSource: [
    {
      path: string;
      message: string;
    },
  ];
}
