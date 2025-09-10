import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { formatDateToYYYYMMDD } from '@/utils/dateFormat';

interface WeekPickerProps {
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	onChange?: (value: string) => void;
	value?: string;
}

const WeekPicker = ({ className, disabled, placeholder, onChange, value, ...props }: WeekPickerProps) => {
	// 해당 연도 기준 주차 계산
	const getWeekNumber = (date: Date) => {
		const year = date.getFullYear();
		const jan1 = new Date(year, 0, 1);

		// 1월 1일이 속한 주의 월요일 찾기
		const dayOfWeek = jan1.getDay();
		let firstMonday = new Date(jan1);

		if (dayOfWeek === 0) {
			firstMonday.setDate(jan1.getDate() + 1);
		} else if (dayOfWeek === 1) {
			firstMonday = new Date(jan1);
		} else {
			firstMonday.setDate(jan1.getDate() - (dayOfWeek - 1));
		}

		// 첫 번째 월요일이 이전 연도면 1월 1일을 첫 주로 설정
		if (firstMonday.getFullYear() < year) {
			firstMonday = new Date(year, 0, 1);
		}

		// 날짜와 첫 번째 월요일 사이의 차이 계산
		const diffTime = date.getTime() - firstMonday.getTime();
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		return Math.floor(diffDays / 7) + 1;
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

	// 월요일 날짜 계산 (해당 연도 기준)
	const getMondayOfWeek = (selectedYear: number, selectedWeek: number) => {
		// 1주차는 해당 연도의 1월 1일이 속한 주로 정의
		const jan1 = new Date(selectedYear, 0, 1); // 1월 1일

		// 1월 1일이 무슨 요일인지 확인 (0: 일요일, 1: 월요일, ..., 6: 토요일)
		const dayOfWeek = jan1.getDay();

		// 1월 1일이 속한 주의 월요일 찾기
		let firstMonday = new Date(jan1);
		if (dayOfWeek === 0) {
			// 일요일이면 다음날(월요일)로
			firstMonday.setDate(jan1.getDate() + 1);
		} else if (dayOfWeek === 1) {
			// 이미 월요일이면 그대로
			firstMonday = new Date(jan1);
		} else {
			// 화요일~토요일이면 그 주의 월요일로 (이전 날짜)
			firstMonday.setDate(jan1.getDate() - (dayOfWeek - 1));
		}

		// 선택된 주차의 월요일 계산
		const mondayOfWeek = new Date(firstMonday);

		mondayOfWeek.setDate(firstMonday.getDate() + (selectedWeek - 1) * 7);

		// 만약 계산된 월요일이 해당 연도보다 이전이면, 1월 1일 반환
		if (mondayOfWeek.getFullYear() < selectedYear) {
			return new Date(selectedYear, 0, 1);
		}

		return mondayOfWeek;
	};

	// 선택된 년도에 따른 주차 범위 계산
	const getWeeksInYear = (selectedYear: number) => {
		// 12월 31일의 주차 계산
		const lastDay = new Date(selectedYear, 11, 31);
		return getWeekNumber(lastDay);
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

			// 년도와 주차가 모두 선택되었으면 onChange 호출
			if (week && onChange) {
				const mondayDate = getMondayOfWeek(newYear, week);
				onChange(formatDateToYYYYMMDD(mondayDate));
			}
		}
	};

	const handleWeekChange = (selectedWeek: string) => {
		const newWeek = parseInt(selectedWeek);
		setWeek(newWeek);

		console.log(year, newWeek);

		if (year && onChange) {
			const mondayDate = getMondayOfWeek(year, newWeek);
			onChange(formatDateToYYYYMMDD(mondayDate));
		}
	};

	// 날짜 문자열에서 년도와 주차 추출
	const getYearWeekFromDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const week = getWeekNumber(date) + 1;
		return { year, week };
	};

	// 초기값 설정 및 외부 value 동기화
	useEffect(() => {
		if (value) {
			// YYYY-MM-DD 형식의 날짜 문자열에서 년도와 주차 추출

			try {
				const { year: parsedYear, week: parsedWeek } = getYearWeekFromDate(value);
				setYear(parsedYear);
				setWeek(parsedWeek);
				setYearInput(parsedYear.toString());
			} catch (error) {
				console.error('Invalid date format:', value);
			}
		} else if (!value && onChange) {
			// 초기값이 없으면 현재 날짜 기준으로 설정
			const mondayDate = getMondayOfWeek(currentYear, currentWeek);
			onChange(formatDateToYYYYMMDD(mondayDate));
		}
	}, []);

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
