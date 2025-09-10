import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface WeekPickerProps {
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	onChange?: (value: string) => void;
	value?: string;
}

const WeekPicker = ({ className, disabled, placeholder, onChange, value, ...props }: WeekPickerProps) => {
	// ISO 8601 기준 주차 계산
	const getWeekNumber = (date: Date) => {
		const target = new Date(date.valueOf());
		const dayNr = (date.getDay() + 6) % 7;
		target.setDate(target.getDate() - dayNr + 3);
		const firstThursday = target.valueOf();
		target.setMonth(0, 1);
		if (target.getDay() !== 4) {
			target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
		}
		return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
	};

	// 현재 날짜 기준으로 초기값 설정
	const getCurrentWeekInfo = () => {
		const now = new Date();
		const year = now.getFullYear();
		const week = getWeekNumber(now);
		return { year, week };
	};

	const { year: currentYear, week: currentWeek } = getCurrentWeekInfo();
	const [year, setYear] = useState<number>(currentYear);
	const [week, setWeek] = useState<number>(currentWeek);
	const [yearInput, setYearInput] = useState<string>(currentYear.toString());

	// 월요일 날짜 계산
	const getMondayOfWeek = (selectedYear: number, selectedWeek: number) => {
		// 해당 년도의 첫 번째 목요일 찾기 (ISO 8601 기준)
		const jan4 = new Date(selectedYear, 0, 4);
		const firstThursday = new Date(jan4);
		const dayOfWeek = jan4.getDay();
		const daysToThursday = dayOfWeek === 0 ? 4 : 4 - dayOfWeek;
		firstThursday.setDate(jan4.getDate() + daysToThursday);

		// 첫 번째 주의 월요일
		const firstMonday = new Date(firstThursday);
		firstMonday.setDate(firstThursday.getDate() - 3);

		// 선택된 주차의 월요일 계산
		const mondayOfWeek = new Date(firstMonday);
		mondayOfWeek.setDate(firstMonday.getDate() + (selectedWeek - 1) * 7);

		return mondayOfWeek;
	};

	// 선택된 년도에 따른 주차 범위 계산
	const getWeeksInYear = (selectedYear: number) => {
		// 12월 31일의 주차를 계산하여 해당 년도의 마지막 주차 확인
		const lastDay = new Date(selectedYear, 11, 31);
		const lastWeek = getWeekNumber(lastDay);

		// 12월 31일이 다음 해 1주차에 속할 경우 52주로 설정
		return lastWeek === 1 ? 52 : lastWeek;
	};

	// 표시할 날짜 값 생성
	const mondayDate = year && week ? getMondayOfWeek(year, week) : null;
	const dateValue =
		year && week && mondayDate
			? `${year}년 ${week}주 (${mondayDate.getMonth() + 1}/${mondayDate.getDate()})`
			: (placeholder ?? '날짜 선택');

	const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setYearInput(inputValue);

		const newYear = parseInt(inputValue);
		if (!isNaN(newYear) && newYear > 0) {
			setYear(newYear);
			// 년도가 변경되면 주차 초기화하지 않고 유지
		}
	};

	const handleWeekChange = (selectedWeek: string) => {
		const newWeek = parseInt(selectedWeek);
		setWeek(newWeek);

		if (year && onChange) {
			onChange(`${year}-${newWeek}`);
		}
	};

	// 초기값 설정 및 외부 value 동기화
	useEffect(() => {
		if (value) {
			const [yearStr, weekStr] = value.split('-');
			if (yearStr && weekStr) {
				const parsedYear = parseInt(yearStr);
				const parsedWeek = parseInt(weekStr);
				setYear(parsedYear);
				setWeek(parsedWeek);
				setYearInput(parsedYear.toString());
			}
		} else if (!value && onChange) {
			// 초기값이 없으면 현재 날짜 기준으로 설정
			onChange(`${currentYear}-${currentWeek}`);
		}
	}, [value, onChange, currentYear, currentWeek]);

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

						{/* 주차 선택 */}
						<div className="flex flex-col gap-4">
							<label className="text-sm font-medium">주차</label>
							<Select value={week?.toString()} onValueChange={handleWeekChange} disabled={!year}>
								<SelectTrigger className="min-h-40 min-w-120">
									<SelectValue placeholder={!year ? '년도를 먼저 입력하세요' : '주차'} />
								</SelectTrigger>
								<SelectContent>
									{year &&
										Array.from({ length: getWeeksInYear(year) }, (_, index) => {
											const weekNum = index + 1;
											const mondayOfWeek = getMondayOfWeek(year, weekNum);
											return (
												<SelectItem key={weekNum} value={weekNum.toString()}>
													{weekNum}주차 ({mondayOfWeek.getMonth() + 1}/{mondayOfWeek.getDate()})
												</SelectItem>
											);
										})}
								</SelectContent>
							</Select>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default WeekPicker;
