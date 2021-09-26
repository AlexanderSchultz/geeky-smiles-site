import { format, parseISO } from 'date-fns';
import React from 'react';

interface DateProps {
  dateString: string;
}

const Date = ({ dateString }: DateProps) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};
export default Date;
