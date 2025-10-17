import { ExternalLink, ChevronLeft, ChevronRight, Loader2, Download } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetFormResponseExcel, useGetFormResponseList } from '@/apis/form';
import DatePicker from '@/components/common/DatePicker';
import excelExport from '@/utils/excelExport';

import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const PAGE_SIZE_OPTIONS = [
	{ value: '10', label: '10개씩 보기' },
	{ value: '20', label: '20개씩 보기' },
	{ value: '50', label: '50개씩 보기' },
	{ value: '100', label: '100개씩 보기' },
];

const FormResponsePage = () => {
	const getSatisfactionColor = (satisfaction: string) => {
		const baseClasses = 'text-white font-medium';
		switch (satisfaction) {
			case '매우만족':
				return `${baseClasses} bg-emerald-500`; // 녹색
			case '만족':
				return `${baseClasses} bg-lime-500`; // 연두
			case '보통':
				return `${baseClasses} bg-amber-500`; // 노랑
			case '불만족':
				return `${baseClasses} bg-orange-500`; // 주황
			case '매우불만족':
				return `${baseClasses} bg-red-500`; // 빨강
			default:
				return `${baseClasses} bg-gray-500`; // 기본값
		}
	};

	const [searchParams, setSearchParams] = useSearchParams();

	// 날짜 검색 상태
	const [startDate, setStartDate] = useState<string>(searchParams.get('startDate') || '');
	const [endDate, setEndDate] = useState<string>(searchParams.get('endDate') || '');

	// 페이지네이션 상태
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<string>('10');

	const { data: formResponseList, isLoading } = useGetFormResponseList({
		page: currentPage,
		size: parseInt(pageSize),
		startDate: startDate,
		endDate: endDate,
	});

	const { refetch: refetchExcel, isLoading: isLoadingExcel } = useGetFormResponseExcel({
		startDate: startDate,
		endDate: endDate,
	});

	const handleMoveFormTemplate = () => {
		window.open(window.location.origin + '/form-template', '_blank');
	};

	const handlePageSizeChange = (newSize: string) => {
		setPageSize(newSize);
		setCurrentPage(1); // 페이지 사이즈 변경 시 첫 페이지로 이동
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	// 페이지네이션 계산
	const totalPages = formResponseList ? Math.ceil(formResponseList.count / parseInt(pageSize)) : 0;
	const startIndex = (currentPage - 1) * parseInt(pageSize) + 1;
	const endIndex = Math.min(currentPage * parseInt(pageSize), formResponseList?.count || 0);

	// 페이지 번호 생성 (현재 페이지 기준으로 5개 페이지까지 표시)
	const getPageNumbers = () => {
		const maxVisiblePages = 5;
		const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	};

	const handleExcelExport = async () => {
		const data = await refetchExcel();

		const result = await excelExport({
			name: '만족도 조사',
			data:
				data?.data?.list.map((item) => ({
					surveyId: item.surveyId,
					createdAt: item.createdAt,
					phone: item.phone,
					overallSat: item.overallSat,
					answerAccuracy: item.answerAccuracy,
					previousContact: item.previousContact,
					freeComment: item.freeComment,
				})) || [],
			headers: ['ID', '접수일', '전화번호', '상담 만족도', '대응 만족도', '이전 문의 여부', '내용'],
			needNumber: false,
			columnTypes: [
				{ key: 'surveyId', type: 'string' },
				{ key: 'createdAt', type: 'string' },
				{ key: 'phone', type: 'string' },
				{ key: 'overallSat', type: 'string' },
				{ key: 'answerAccuracy', type: 'string' },
				{ key: 'previousContact', type: 'string' },
				{ key: 'freeComment', type: 'string' },
			],
		});

		if (!result) {
			alert('엑셀 Export가 실패했습니다.');
		}
	};

	return (
		<div className="space-y-24 p-24">
			<div className="flex justify-between">
				<h1 className="pl-32 text-4xl font-semibold whitespace-nowrap md:pl-0">응답 관리</h1>
				<div className="flex gap-8">
					<Button variant="outline" size="sm" onClick={handleMoveFormTemplate}>
						<ExternalLink className="mr-8 h-16 w-16" />
						상담 신청서로 이동
					</Button>
					<Button variant="outline" size="sm" onClick={handleExcelExport} disabled={isLoadingExcel}>
						<Download className="mr-8 h-16 w-16" />
						엑셀 Export
					</Button>
				</div>
			</div>

			{/* 날짜 검색 필터 */}
			<Card>
				<CardContent className="p-16">
					<div className="flex items-center gap-16">
						<div className="flex items-center gap-8">
							<span className="text-xl font-medium whitespace-nowrap">검색 기간:</span>
							<DatePicker
								value={startDate}
								onChange={(date) => {
									setStartDate(date);
									setSearchParams({ startDate: date, endDate: endDate });
									setCurrentPage(1);
								}}
								placeholder="시작일"
								maxDate={endDate ? new Date(endDate) : undefined}
							/>
							<span className="text-xl">~</span>
							<DatePicker
								value={endDate}
								onChange={(date) => {
									setEndDate(date);
									setSearchParams({ startDate: startDate, endDate: date });
									setCurrentPage(1);
								}}
								placeholder="종료일"
								minDate={startDate ? new Date(startDate) : undefined}
							/>
						</div>
						{/* <Button onClick={handleSearch} size="sm">
							<Search className="mr-8 h-16 w-16" />
							검색
						</Button> */}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>응답 목록</CardTitle>
						<div className="flex items-center gap-16">
							{/* 총 항목 수 표시 */}
							<span className="text-muted-foreground text-xl">총 {formResponseList?.count || 0}개의 응답</span>
							{/* 페이지 사이즈 선택 */}
							<Select value={pageSize} onValueChange={handlePageSizeChange}>
								<SelectTrigger className="w-140">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{PAGE_SIZE_OPTIONS.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>접수일</TableHead>
								<TableHead>전화번호</TableHead>
								<TableHead>상담 만족도</TableHead>
								<TableHead>대응 만족도</TableHead>
								<TableHead>이전 문의 여부</TableHead>
								<TableHead>내용</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell colSpan={7} className="py-32" rowSpan={7}>
										<div className="flex justify-center">
											<Loader2 className="size-28 animate-spin" />
										</div>
									</TableCell>
								</TableRow>
							) : formResponseList?.list && formResponseList.list.length > 0 ? (
								formResponseList.list.map((response) => (
									<TableRow key={response.surveyId}>
										<TableCell className="font-mono text-xl">{response.surveyId}</TableCell>
										<TableCell className="text-xl">{response.createdAt}</TableCell>
										<TableCell>
											<div className="font-medium">{response.phone}</div>
										</TableCell>
										<TableCell>
											<Badge className={getSatisfactionColor(response.overallSat)}>{response.overallSat}</Badge>
										</TableCell>
										<TableCell>
											<Badge className={getSatisfactionColor(response.answerAccuracy)}>{response.answerAccuracy}</Badge>
										</TableCell>
										<TableCell className="max-w-xs truncate" title={response.previousContact}>
											{response.previousContact || '-'}
										</TableCell>
										<TableCell className="max-w-xs truncate" title={response.freeComment}>
											{response.freeComment || '-'}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={7} className="py-32 text-center">
										<div className="text-muted-foreground">검색 조건에 맞는 응답이 없습니다.</div>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>

					{/* 페이지네이션 */}
					<div className="mt-16 flex items-center justify-between">
						<div className="text-muted-foreground text-xl">
							{startIndex}-{endIndex} / {formResponseList?.count || 0}개 표시
						</div>

						<div className="flex items-center gap-8">
							{/* 이전 페이지 버튼 */}
							<Button
								variant="outline"
								size="sm"
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
							>
								<ChevronLeft className="h-16 w-16" />
								이전
							</Button>

							{/* 페이지 번호 버튼들 */}
							<div className="flex gap-4">
								{getPageNumbers().map((pageNumber) => (
									<Button
										key={pageNumber}
										variant={currentPage === pageNumber ? 'default' : 'outline'}
										size="sm"
										onClick={() => handlePageChange(pageNumber)}
										className="min-w-32"
									>
										{pageNumber}
									</Button>
								))}
							</div>

							{/* 다음 페이지 버튼 */}
							<Button
								variant="outline"
								size="sm"
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
							>
								다음
								<ChevronRight className="h-16 w-16" />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default FormResponsePage;
