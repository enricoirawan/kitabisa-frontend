import {
  format,
  differenceInDays,
  parseISO,
  formatDistanceToNow,
} from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "react-toastify";

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatRupiahInput(angka: string): string {
  return angka
    .replace(/\D/g, "") // Hapus semua karakter kecuali angka
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Tambahkan titik sebagai pemisah ribuan
}

function formatDateForView(date: string | Date): string {
  return format(date, "dd MMM yyyy", { locale: id });
}

function getRemainDaysFrom(date: string): number {
  return differenceInDays(parseISO(date), new Date());
}

function getDistanceToNowFrom(date: string): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: id });
}

function formatDateForAPI(date: string | Date): string {
  return format(date, "yyyy-MM-dd");
}

function showSuccessToast(message: string) {
  toast.success(message, { position: "bottom-right" });
}

function showErrorToast(message: string) {
  toast.error(message, { position: "bottom-right" });
}

export {
  formatRupiah,
  formatRupiahInput,
  formatDateForAPI,
  formatDateForView,
  getRemainDaysFrom,
  getDistanceToNowFrom,
  showSuccessToast,
  showErrorToast,
};
