import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface MonthPickerProps {
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	onChange?: (value: string) => void;
	value?: string;
}

const MonthPicker = ({ className, disabled, placeholder, onChange, value, ...props }: MonthPickerProps) => {
	// 현재 날짜 기준으로 초기값 설정
	const getCurrentMonthInfo = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1; // 0부터 시작하므로 +1
		return { year, month };
	};

	const { year: currentYear, month: currentMonth } = getCurrentMonthInfo();
	const [year, setYear] = useState<number>(currentYear);
	const [month, setMonth] = useState<number>(currentMonth);
	const [yearInput, setYearInput] = useState<string>(currentYear.toString());

	// 월 이름 배열
	const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

	// 선택된 년도/월의 1일 날짜 생성
	const getFirstDayOfMonth = (selectedYear: number, selectedMonth: number) => {
		return new Date(selectedYear, selectedMonth - 1, 1);
	};

	// 날짜를 YYYY-MM-DD 형식으로 포맷
	const formatDate = (date: Date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	// 표시할 날짜 값 생성
	const dateValue = year && month ? `${year}년 ${month}월` : (placeholder ?? '날짜 선택');

	const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setYearInput(inputValue);

		const newYear = parseInt(inputValue);
		if (!isNaN(newYear) && newYear > 0) {
			setYear(newYear);

			// 년도와 월이 모두 선택되었으면 onChange 호출
			if (month && onChange) {
				const firstDay = getFirstDayOfMonth(newYear, month);
				onChange(formatDate(firstDay));
			}
		}
	};

	const handleMonthChange = (selectedMonth: string) => {
		const newMonth = parseInt(selectedMonth);
		setMonth(newMonth);

		if (year && onChange) {
			const firstDay = getFirstDayOfMonth(year, newMonth);
			onChange(formatDate(firstDay));
		}
	};

	// 초기값 설정 및 외부 value 동기화
	useEffect(() => {
		if (value) {
			const date = new Date(value);
			const parsedYear = date.getFullYear();
			const parsedMonth = date.getMonth() + 1;
			setYear(parsedYear);
			setMonth(parsedMonth);
			setYearInput(parsedYear.toString());
		} else if (!value && onChange) {
			// 초기값이 없으면 현재 날짜 기준으로 설정
			const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
			onChange(formatDate(firstDay));
		}
	}, [value, onChange, currentYear, currentMonth]);

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
				<PopoverContent className="w-auto p-8" align="start">
					<div className="flex gap-16 bg-white">
						{/* 년도 입력 */}
						<div className="flex flex-col gap-4">
							<label className="text-sm font-medium">년도</label>
							<Input
								type="number"
								value={yearInput}
								onChange={handleYearInputChange}
								placeholder="년도 입력"
								className="min-h-40 min-w-120"
								min={1}
							/>
						</div>

						{/* 월 선택 */}
						<div className="flex flex-col gap-4">
							<label className="text-sm font-medium">월</label>
							<Select value={month?.toString()} onValueChange={handleMonthChange} disabled={!year}>
								<SelectTrigger className="min-h-40 min-w-120">
									<SelectValue placeholder={!year ? '년도를 먼저 입력하세요' : '월'} />
								</SelectTrigger>
								<SelectContent>
									{monthNames.map((monthName, index) => (
										<SelectItem key={index + 1} value={(index + 1).toString()}>
											{monthName}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default MonthPicker;
