import { format } from 'date-fns';

export function fDateTimeSuffix(date) {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss ');
}