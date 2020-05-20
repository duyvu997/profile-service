import { APIGatewayProxyEvent } from "aws-lambda";
import * as querystring from "querystring";


export const defaultPageIndex: number = 0;
export const defaultPageSize: number = 10;
export const defaultFilter: object = {};


export interface IPagingModelOption {
  pageIndex: number;
  pageSize: number;
  filter: {};
}

export function getPaginationParams(
  event: APIGatewayProxyEvent,
): IPagingModelOption {

  const { page = defaultPageIndex, size = defaultPageSize, filter } = event.queryStringParameters || {};
  // FILTER
  const filterObject = filter
    ? JSON.parse(JSON.stringify(querystring.parse(filter.slice(1, -1).replace(/,/g, "&"))))
    : defaultFilter;

  return {
    pageIndex: Number(page ? page : defaultPageIndex),
    pageSize: Number(size ? size : defaultPageSize),
    filter: filterObject
  };
}