export class DateHelper {
  static getTomorrowDate(): { day: number; month: number; year: number } {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const day = tomorrow.getDate();
    const month = tomorrow.getMonth();
    const year = tomorrow.getFullYear();

    return { day, month, year };
  }
}
