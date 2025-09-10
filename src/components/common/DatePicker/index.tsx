import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { formatDateToYYYYMMDD } from '@/utils/dateFormat';

interface DatePickerProps {
	className?: string;
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
	/**
	 * 날짜 제한
	 * 오늘 이전 날짜는 선택 불가능
	 */
	dateDisabledTime?: Date;
}

const DatePicker = ({
	className,
	onChange,
	placeholder,
	value,
	disabled,
	dateDisabledTime,
	...props
}: DatePickerProps) => {
	// 오늘 날짜를 초기값으로 설정
	const today = new Date();
	const [date, setDate] = useState<Date | undefined>(today);
	const dateValue = date ? formatDateToYYYYMMDD(date) : (placeholder ?? '날짜 선택');

	const handleChangeDate = (changeDate: Date | undefined) => {
		if (!changeDate) return;

		setDate(changeDate);

		if (!onChange) return;
		onChange(formatDateToYYYYMMDD(changeDate ?? ''));
	};

	// 초기값 설정 및 외부 value 동기화
	useEffect(() => {
		if (value) {
			setDate(new Date(value));
		} else if (!value && onChange) {
			// 초기값이 없으면 오늘 날짜로 설정
			onChange(formatDateToYYYYMMDD(today));
		}
	}, [value, onChange]);

	return (
		<div className={cn('grid gap-2', className)} {...props}>
			<Popover modal={true}>
				<PopoverTrigger asChild onClick={(e) => disabled && e.preventDefault()}>
					<div
						className={cn(
							'flex h-40 items-center gap-8 bg-white px-12 py-1 whitespace-nowrap',
							'border-input rounded-md border text-xl',
							'data-[state=open]:border-primary-100 data-[state=open]:ring-ring/50 cursor-pointer data-[state=open]:ring-[1px]',
							disabled && 'opacity-50'
						)}
					>
						<CalendarIcon className="size-16" /> {dateValue}
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						locale={ko}
						mode="single"
						defaultMonth={date}
						selected={date}
						onSelect={handleChangeDate}
						disabled={[{ from: new Date(1950, 1, 1), to: dateDisabledTime }]}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DatePicker;
