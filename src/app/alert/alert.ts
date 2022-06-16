export class Alert {
  id: string;
  message: string;
  alertType: string;
  autoClose: boolean;
  fade: boolean;

  constructor(init?:Partial<Alert>) {
    Object.assign(this, init);
  }

}