import { ja } from 'date-fns/locale';
import { parseISO, format } from "date-fns";
export const parse = (utc: string) => parseISO(utc);
export const fmt = (date: Date, fmt: string) => format(date, fmt, { locale: ja });
export const fmtDate = (date: string) => fmt(parse(date), "yyyy年MM月dd日")
export const fmtTime = (date: string) => fmt(parse(date), " HH:mm")
export const fmtDay = (date: string) => fmt(parse(date), "eee")
