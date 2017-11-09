import Fetchable from './fetchable';

export default class Report extends Fetchable {
  private static _instance: Report;

  constructor() {
    super();

    if (!Report._instance) {
      Report._instance = new Report();
      return this;
    }
  }

  dashboard() {
    const body = new URLSearchParams();

    return super.get(`/api/v1/reports/dashboard?${body}`)
      .then((json: any) => json.result);
  }

  salesByProduct(groupBy: string, productId: string): Promise<object> {
    const body = new URLSearchParams();
    body.set('groupBy', groupBy);
    body.set('productId', productId);

    return super.get(`/api/v1/reports/salesByProduct?${body}`)
      .then((json: any) => json.report);
  }

  salesByTotal(groupBy: string) {
    const body = new URLSearchParams();
    body.set('groupBy', groupBy);

    return super.get(`/api/v1/reports/salesByTotal?${body}`)
      .then((json: any) => json.report);
  }

  salesByUser(userId: number) {
    return super.get(`/api/v1/reports/scalar/salesByUser?userId=${userId}`)
      .then((json: any) => json.report);
  }

  revenueByUser(userId: number) {
    return super.get(`/api/v1/reports/scalar/revenueByUser?userId=${userId}`)
      .then((json: any) => json.result);
  }

  listingsByUser(userId: number) {
    return super.get(`/api/v1/reports/scalar/listingsByUser?userId=${userId}`)
      .then((json: any) => json.result);
  }

  salesByVendor(groupBy: string, vendorId: string) {
    const body = new URLSearchParams();
    body.set('groupBy', groupBy);
    body.set('vendorId', vendorId);

    return super.get(`/api/v1/reports/salesByVendor?${body}`)
      .then((json: any) => json.result);
  }

  inventoryShippedByUser(userId: number) {
    return super.get(`/api/v1/reports/scalar/shippedByUser?userId=${userId}`)
      .then((json: any) => json.result);
  }

  inventoryReceivedByUser(userId: number) {
    return super.get(`/api/v1/reports/scalar/receivedByUser?userId=${userId}`)
      .then((json: any) => json.result);
  }
}
